
-- Drop the existing function that might still be causing issues
DROP FUNCTION IF EXISTS public.is_admin(uuid);

-- Create a new security definer function that avoids recursion
CREATE OR REPLACE FUNCTION public.check_admin_status(check_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS $$
DECLARE
  is_admin_user boolean := false;
BEGIN
  -- Direct query without going through RLS policies
  SELECT EXISTS (
    SELECT 1 FROM public.admin_profiles 
    WHERE user_id = check_user_id 
    AND role = 'admin'
  ) INTO is_admin_user;
  
  RETURN is_admin_user;
EXCEPTION
  WHEN OTHERS THEN
    RETURN false;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.check_admin_status(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_admin_status(uuid) TO anon;

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Admin users can view admin profiles" ON public.admin_profiles;
DROP POLICY IF EXISTS "Admin users can update their own profile" ON public.admin_profiles;
DROP POLICY IF EXISTS "Admins can manage all products" ON public.products;
DROP POLICY IF EXISTS "Anyone can view active products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage homepage content" ON public.homepage_content;
DROP POLICY IF EXISTS "Anyone can view active homepage content" ON public.homepage_content;

-- Create new policies for admin_profiles (without recursion)
CREATE POLICY "Allow admin profile access" 
  ON public.admin_profiles 
  FOR ALL
  USING (auth.uid() = user_id OR public.check_admin_status(auth.uid()));

-- Create new policies for products
CREATE POLICY "Public can view active products" 
  ON public.products 
  FOR SELECT 
  USING (active = true OR public.check_admin_status(auth.uid()));

CREATE POLICY "Admins can manage products" 
  ON public.products 
  FOR ALL 
  USING (public.check_admin_status(auth.uid()));

-- Create new policies for homepage_content
CREATE POLICY "Public can view active homepage content" 
  ON public.homepage_content 
  FOR SELECT 
  USING (active = true OR public.check_admin_status(auth.uid()));

CREATE POLICY "Admins can manage homepage content" 
  ON public.homepage_content 
  FOR ALL 
  USING (public.check_admin_status(auth.uid()));
