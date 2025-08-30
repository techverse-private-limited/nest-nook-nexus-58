
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonProps {
  product: {
    id: string;
    name: string;
    description: string | null;
    image_url: string | null;
    category: string | null;
  };
}

const ShareButton = ({ product }: ShareButtonProps) => {
  const { toast } = useToast();
  
  const productUrl = `${window.location.origin}/product/${product.id}`;
  
  // Create product-specific sharing data
  const productTitle = `${product.name} | Sumit Industries`;
  const productDescription = product.description || `Premium ${product.category || 'steel product'} from Sumit Industries - 15+ years of manufacturing excellence`;
  
  const shareData = {
    title: productTitle,
    text: productDescription,
    url: productUrl,
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log('Shared successfully');
      } catch (error) {
        console.log('Error sharing:', error);
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      toast({
        title: "Link copied!",
        description: "Product link has been copied to clipboard",
      });
    } catch (error) {
      console.error('Failed to copy link:', error);
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  return (
    <Button size="sm" variant="secondary" onClick={handleShare}>
      <Share2 className="h-4 w-4" />
    </Button>
  );
};

export default ShareButton;
