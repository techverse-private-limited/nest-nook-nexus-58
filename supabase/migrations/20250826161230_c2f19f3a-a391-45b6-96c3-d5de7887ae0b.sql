
-- Add animation control fields to products table
ALTER TABLE products 
ADD COLUMN show_in_slider boolean DEFAULT true,
ADD COLUMN slider_order integer DEFAULT 0;

-- Add index for better performance when querying slider products
CREATE INDEX idx_products_slider ON products(show_in_slider, slider_order) WHERE show_in_slider = true;

-- Update existing products to show in slider by default
UPDATE products SET show_in_slider = true, slider_order = 0 WHERE show_in_slider IS NULL;
