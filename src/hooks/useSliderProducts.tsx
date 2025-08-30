
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from './useProducts';

export const useSliderProducts = () => {
  return useQuery({
    queryKey: ['slider-products'],
    queryFn: async () => {
      console.log('Fetching slider products...');
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .eq('show_in_slider', true)
        .order('slider_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching slider products:', error);
        throw error;
      }
      
      console.log('Slider products fetched:', data);
      return data as Product[];
    },
  });
};
