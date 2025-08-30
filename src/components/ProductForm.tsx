
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useCreateProduct, useUpdateProduct, Product } from '@/hooks/useProducts';
import ImageUpload from './ImageUpload';

interface ProductFormProps {
  product?: Product;
  onCancel: () => void;
  onSuccess: () => void;
}

const ProductForm = ({ product, onCancel, onSuccess }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price?.toString() || '',
    category: product?.category || '',
    image_url: product?.image_url || '',
    secondary_image_url: product?.secondary_image_url || '',
    points: product?.points || '',
    active: product?.active ?? true,
    featured: product?.featured ?? false,
  });

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      description: formData.description || null,
      price: formData.price ? parseFloat(formData.price) : null,
      category: formData.category || null,
      image_url: formData.image_url || null,
      secondary_image_url: formData.secondary_image_url || null,
      points: formData.points || null,
      active: formData.active,
      featured: formData.featured,
      show_in_slider: product?.show_in_slider ?? true,
      slider_order: product?.slider_order ?? 0,
    };

    try {
      if (product) {
        await updateProduct.mutateAsync({ id: product.id, ...productData });
      } else {
        await createProduct.mutateAsync(productData);
      }
      onSuccess();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const isLoading = createProduct.isPending || updateProduct.isPending;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{product ? 'Edit Product' : 'Create New Product'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="points">Points</Label>
            <Textarea
              id="points"
              value={formData.points}
              onChange={(e) => setFormData({ ...formData, points: e.target.value })}
              rows={3}
              placeholder="Enter key points or features (separated by commas or new lines)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>

          <ImageUpload
            value={formData.image_url}
            onChange={(imageUrl) => setFormData({ ...formData, image_url: imageUrl })}
            label="Main Product Image"
            folder="products"
          />

          <ImageUpload
            value={formData.secondary_image_url}
            onChange={(imageUrl) => setFormData({ ...formData, secondary_image_url: imageUrl })}
            label="Secondary Product Image (for hover effect)"
            folder="products"
          />

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
              />
              <Label htmlFor="active">Active</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
              />
              <Label htmlFor="featured">Featured</Label>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
