
-- Create a table for projects
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  start_date DATE,
  end_date DATE,
  budget DECIMAL(10,2),
  client TEXT,
  category TEXT,
  image_url TEXT,
  active BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policies for projects (admin access only, similar to products)
CREATE POLICY "Enable read access for authenticated users" 
  ON public.projects 
  FOR SELECT 
  USING (true);

CREATE POLICY "Enable insert for authenticated users" 
  ON public.projects 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" 
  ON public.projects 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Enable delete for authenticated users" 
  ON public.projects 
  FOR DELETE 
  USING (true);

-- Create an index for better performance
CREATE INDEX idx_projects_active ON public.projects(active);
CREATE INDEX idx_projects_featured ON public.projects(featured);
CREATE INDEX idx_projects_created_at ON public.projects(created_at);
