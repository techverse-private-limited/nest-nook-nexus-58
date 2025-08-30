
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { uploadImage, validateImageFile, deleteImage } from '@/utils/imageUpload';
import { Upload, X, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  value?: string;
  onChange: (imageUrl: string) => void;
  label?: string;
  folder?: string;
}

const ImageUpload = ({ value, onChange, label = "Image", folder = "products" }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.isValid) {
      toast({
        title: "Invalid File",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    try {
      // Create preview URL immediately
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      
      // Upload the file to Supabase Storage
      const uploadedUrl = await uploadImage(file, folder);
      onChange(uploadedUrl);
      
      // Clean up the local preview URL
      URL.revokeObjectURL(preview);
      setPreviewUrl(uploadedUrl);
      
      toast({
        title: "Success",
        description: "Image uploaded successfully to Supabase Storage",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload image to Supabase Storage. Please try again.",
        variant: "destructive",
      });
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    if (value && value.includes('supabase')) {
      try {
        await deleteImage(value, folder);
        toast({
          title: "Success",
          description: "Image deleted from storage",
        });
      } catch (error) {
        console.error('Error deleting image:', error);
        toast({
          title: "Delete Failed",
          description: "Failed to delete image from storage",
          variant: "destructive",
        });
      }
    }
    
    setPreviewUrl(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {previewUrl ? (
        <div className="relative group">
          <div className="aspect-video w-full max-w-xs overflow-hidden rounded-lg border border-gray-200">
            <img 
              src={previewUrl} 
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => window.open(previewUrl, '_blank')}
            >
              <Eye className="h-3 w-3" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={handleRemove}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-600 mb-2">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-400">
            PNG, JPG, GIF up to 5MB (uploads to Supabase Storage)
          </p>
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={isUploading}
        className="hidden"
        id="image-upload"
      />
      
      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="w-full"
      >
        <Upload className="h-4 w-4 mr-2" />
        {isUploading ? 'Uploading to Storage...' : previewUrl ? 'Change Image' : 'Upload to Assets/Products'}
      </Button>
    </div>
  );
};

export default ImageUpload;
