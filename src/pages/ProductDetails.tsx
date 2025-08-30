import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, Shield, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import ShareButton from '@/components/ShareButton';
import SEOHead from '@/components/SEOHead';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: products, isLoading } = useProducts();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const product = products?.find(p => p.id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p>Loading product details...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h2>
              <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
              <Button onClick={() => navigate('/products')} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const features = product.points ? product.points.split(',').map(f => f.trim()) : [];

  // Create an array with only the first two product images
  const productImages = [
    product.image_url || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ...(product.secondary_image_url ? [product.secondary_image_url] : [])
  ].filter(Boolean).slice(0, 2);

  const handleWhatsAppContact = () => {
    const phoneNumber = "919442021149";
    const productName = product?.name || "Product";
    const productCategory = product?.category || "";
    const productDescription = product?.description || "";
    const productPoints = product?.points || "";
    const productUrl = `${window.location.origin}/product/${product?.id}`;
    
    // Create a comprehensive message with all product details and product link
    let message = `Hello! I'm interested in the ${productName}`;
    
    if (productCategory) {
      message += ` (${productCategory})`;
    }
    
    if (productDescription) {
      message += `.\n\nDescription: ${productDescription}`;
    }
    
    if (productPoints) {
      const points = productPoints.split(',').map(p => p.trim()).filter(p => p);
      if (points.length > 0) {
        message += `\n\nKey Features:\n${points.map(point => `• ${point}`).join('\n')}`;
      }
    }
    
    // Add product link to the message
    message += `\n\nProduct Link: ${productUrl}`;
    
    message += `\n\nPlease share pricing and availability details. Thank you!`;
    
    // Simple URL encoding
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    console.log('Opening WhatsApp with URL:', whatsappUrl);
    
    // Direct window.open approach
    const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    // Fallback if popup is blocked
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      // Try direct navigation as fallback
      window.location.href = whatsappUrl;
    }
  };

  // SEO data for social sharing
  const seoTitle = `${product.name} - Premium ${product.category || 'Steel Products'} | Sumith Industries`;
  const seoDescription = product.description || `High-quality ${product.category || 'steel products'} from Sumith Industries. 15+ years of manufacturing excellence.`;
  const seoImage = product.image_url || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
  const seoUrl = `${window.location.origin}/product/${product.id}`;

  return (
    <div className="min-h-screen">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        image={seoImage}
        url={seoUrl}
        type="product"
      />
      
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Side - Image Gallery */}
            <div className="lg:col-span-7">
              <div className="flex gap-4">
                {/* Thumbnail Images */}
                <div className="flex flex-col space-y-2">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-16 h-16 border-2 rounded-lg overflow-hidden transition-all ${
                        selectedImageIndex === index 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Main Image */}
                <div className="flex-1">
                  <div className="relative pb-8">
                    <img 
                      src={productImages[selectedImageIndex]} 
                      alt={product.name}
                      className="w-full aspect-square object-contain hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <ShareButton product={product} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Product Information */}
            <div className="lg:col-span-5 space-y-6">
              {/* Product Title and Badges */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  {product.category && (
                    <Badge variant="secondary" className="text-sm">
                      {product.category}
                    </Badge>
                  )}
                  {product.featured && (
                    <Badge className="bg-gold text-white">
                      Featured
                    </Badge>
                  )}
                </div>
                <h1 className="text-2xl lg:text-3xl font-playfair font-bold text-foreground mb-3">
                  {product.name}
                </h1>
                {product.description && (
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                )}
              </div>

              {/* Price Section */}
              <div className="border-t border-b border-border py-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-foreground">
                    Contact for Price
                  </span>
                  <Badge variant="outline" className="text-xs">
                    Custom Quote
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Prices may vary based on customization and bulk orders
                </p>
              </div>

              {/* Key Features */}
              {features.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <Shield className="h-5 w-5 text-gold" />
                      <span>Key Features</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {features.slice(0, 6).map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm">
                          <Star className="h-3 w-3 text-gold mt-1 flex-shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Quality Assurance */}
              <Card className="bg-secondary/50">
                <CardContent className="pt-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Shield className="h-5 w-5 text-gold" />
                    <h3 className="font-semibold text-foreground">Quality Assurance</h3>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Tata Steel certified products</li>
                    <li>• Corrosion resistant coating</li>
                    <li>• Earthquake resistant design</li>
                    <li>• 15+ years manufacturing experience</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Action Button */}
              <div className="space-y-3">
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={handleWhatsAppContact}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contact for Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Updated Professional Footer */}
      <footer className="relative bg-deep-brown text-white py-4 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Left side - Company Info */}
            <div className="text-left">
              <h3 className="text-lg font-bold mb-1 font-lato">
                Sumith<span className="text-gradient"> Industries</span>
              </h3>
              <div className="flex items-start mb-2">
                <img 
                  src="/lovable-uploads/a3da9fad-85f9-499d-913d-b93e819096ab.png" 
                  alt="QR Code" 
                  className="w-16 h-16 mr-4"
                />
                <div>
                  <p className="text-white/70 text-xs font-lato mb-2">
                    Scan the QR for location
                  </p>
                  <p className="text-white/80 text-sm font-lato">
                    Premium steel doors and windows solutions. 15+ years of excellence.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right side - Contact Info */}
            <div className="text-right">
              <h4 className="font-semibold mb-2 text-gradient font-lato">Contact</h4>
              <div className="space-y-1 text-white/80 text-sm">
                <p className="font-lato">
                  Venkateswarapuram(P.O), Alangulam Taluk<br />
                  Tenkasi Dist - 627 854<br />
                  Tamil Nadu, India
                </p>
                <p className="font-lato">Email: <a href="mailto:svssudar@gmail.com" className="text-gold hover:text-luxury-gold transition-colors">svssudar@gmail.com</a></p>
                <p className="font-lato">Phone: <a href="tel:+919442021149" className="text-gold hover:text-luxury-gold transition-colors">+91 94420 21149</a></p>
              </div>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="border-t border-white/20 mt-4 pt-4 text-center">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-white/60 text-sm">
              <p className="font-lato">&copy; 2025 Sumith Industries. All rights reserved.</p>
              <p className="font-lato">
                Powered by{' '}
                <a 
                  href="https://techverseinfotechprivatelimited.netlify.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gold hover:text-luxury-gold transition-colors underline"
                >
                  Techverse Infotech Private Limited
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetails;
