
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProducts, useUpdateProduct, useDeleteProduct, Product } from '@/hooks/useProducts';
import ProductForm from './ProductForm';
import { Pencil, Trash2, Plus, Eye, ArrowUpDown } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const ProductManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  
  const { data: products, isLoading, error } = useProducts();
  const deleteProduct = useDeleteProduct();
  const updateProduct = useUpdateProduct();

  const handleEdit = (product: Product) => {
    console.log('Editing product:', product);
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCreate = () => {
    console.log('Creating new product');
    setEditingProduct(undefined);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(undefined);
  };

  const handleDelete = async (id: string) => {
    console.log('Deleting product:', id);
    try {
      await deleteProduct.mutateAsync(id);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSliderToggle = async (product: Product, showInSlider: boolean) => {
    console.log('Updating slider visibility for product:', product.id, showInSlider);
    try {
      await updateProduct.mutateAsync({
        id: product.id,
        show_in_slider: showInSlider,
      });
    } catch (error) {
      console.error('Error updating slider visibility:', error);
    }
  };

  const handleSliderOrderChange = async (product: Product, order: number) => {
    console.log('Updating slider order for product:', product.id, order);
    try {
      await updateProduct.mutateAsync({
        id: product.id,
        slider_order: order,
      });
    } catch (error) {
      console.error('Error updating slider order:', error);
    }
  };

  if (showForm) {
    return (
      <ProductForm
        product={editingProduct}
        onCancel={handleFormClose}
        onSuccess={handleFormClose}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <Spinner variant="circle" size={32} className="mx-auto mb-4" />
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading products: {error.message}</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="mt-4"
          variant="outline"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="aspect-video overflow-hidden rounded-lg mb-3 group">
                  {product.image_url ? (
                    <div className="relative w-full h-full">
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                      />
                      {product.secondary_image_url && (
                        <img 
                          src={product.secondary_image_url} 
                          alt={`${product.name} - Secondary`}
                          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Eye className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-lg">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {product.description && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Description:</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                )}

                {product.points && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Points:</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.points}
                    </p>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  {product.price && (
                    <span className="font-semibold text-lg">₹{product.price}</span>
                  )}
                  {product.category && (
                    <Badge variant="outline">{product.category}</Badge>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Badge variant={product.active ? "default" : "secondary"}>
                    {product.active ? "Active" : "Inactive"}
                  </Badge>
                  {product.featured && (
                    <Badge variant="outline" className="text-gold border-gold">
                      Featured
                    </Badge>
                  )}
                </div>

                {/* Slider Animation Controls */}
                <div className="border-t pt-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`slider-${product.id}`} className="text-sm font-medium">
                      Show in Slider
                    </Label>
                    <Switch
                      id={`slider-${product.id}`}
                      checked={product.show_in_slider || false}
                      onCheckedChange={(checked) => handleSliderToggle(product, checked)}
                    />
                  </div>
                  
                  {product.show_in_slider && (
                    <div className="flex items-center space-x-2">
                      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor={`order-${product.id}`} className="text-sm">
                        Order:
                      </Label>
                      <Input
                        id={`order-${product.id}`}
                        type="number"
                        min="0"
                        value={product.slider_order || 0}
                        onChange={(e) => handleSliderOrderChange(product, parseInt(e.target.value) || 0)}
                        className="w-20 h-8"
                      />
                    </div>
                  )}
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(product)}
                  >
                    <Pencil className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Product</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{product.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No products found.</p>
          <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Product
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
