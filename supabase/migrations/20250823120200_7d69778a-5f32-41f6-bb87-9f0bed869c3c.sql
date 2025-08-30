
-- Create a security definer function to check admin status without recursion
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_profiles 
    WHERE admin_profiles.user_id = $1 
    AND role = 'admin'
  );
$$;

-- Drop existing policies that cause recursion
DROP POLICY IF EXISTS "Admin users can view admin profiles" ON public.admin_profiles;
DROP POLICY IF EXISTS "Admins can manage all products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage homepage content" ON public.homepage_content;

-- Recreate admin_profiles policies without recursion
CREATE POLICY "Admin users can view admin profiles" 
  ON public.admin_profiles 
  FOR SELECT 
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admin users can update their own profile" 
  ON public.admin_profiles 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Recreate products policies using the security definer function
CREATE POLICY "Anyone can view active products" 
  ON public.products 
  FOR SELECT 
  USING (active = true);

CREATE POLICY "Admins can manage all products" 
  ON public.products 
  FOR ALL 
  USING (public.is_admin(auth.uid()));

-- Recreate homepage_content policies using the security definer function
CREATE POLICY "Anyone can view active homepage content" 
  ON public.homepage_content 
  FOR SELECT 
  USING (active = true);

CREATE POLICY "Admins can manage homepage content" 
  ON public.homepage_content 
  FOR ALL 
  USING (public.is_admin(auth.uid()));
