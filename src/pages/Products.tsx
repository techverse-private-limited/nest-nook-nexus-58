import Navigation from '@/components/Navigation';
import ProductCard from '@/components/ProductCard';
import ProductManagement from '@/components/ProductManagement';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Home, Building2, Wrench } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import SEOHead from '@/components/SEOHead';

const Products = () => {
  const {
    data: products,
    isLoading
  } = useProducts();
  const {
    isAdmin
  } = useAuth();
  const [showManagement, setShowManagement] = useState(false);

  // Map database products to ProductCard format
  const productCategories = products?.map(product => ({
    id: product.id,
    icon: product.category === 'Security' ? Lock : product.category === 'Residential' ? Home : Building2,
    title: product.name,
    description: product.description || '',
    features: product.points ? product.points.split(',').map(f => f.trim()).slice(0, 4) : (product.description ? product.description.split(',').map(f => f.trim()).slice(0, 4) : []),
    image: product.image_url || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    secondaryImage: product.secondary_image_url
  })) || [];

  if (showManagement && isAdmin) {
    return <div className="min-h-screen">
        <SEOHead 
          title="Our Products - Sumith Industries" 
          description="Premium steel doors and windows"
          type="website"
        />
        <Navigation />
        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <Button variant="outline" onClick={() => setShowManagement(false)}>
                ← Back to Products
              </Button>
            </div>
            <ProductManagement />
          </div>
        </div>
      </div>;
  }

  return <div className="min-h-screen">
      <SEOHead 
        title="Our Products - Sumith Industries" 
        description="Premium steel doors and windows"
        type="website"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
              Our <span className="text-gradient">Products</span>
            </h1>
            {isAdmin && <div className="mb-6">
                <Button onClick={() => setShowManagement(true)} className="bg-primary hover:bg-primary/90">
                  Manage Products
                </Button>
              </div>}
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Discover our comprehensive range of premium steel doors and windows, 
              engineered for durability, security, and style.
            </p>
            <div className="flex items-center justify-center space-x-2">
              <Shield className="h-5 w-5 text-gold" />
              <Badge variant="secondary" className="text-sm">
                Tata Steel Authorized Dealer
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Spinner variant="circle" size={32} className="mx-auto mb-4" />
                <p>Loading products...</p>
              </div>
            </div> : productCategories.length > 0 ? <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {productCategories.map((category, index) => <ProductCard 
                key={index} 
                id={category.id}
                title={category.title} 
                description={category.description} 
                image={category.image} 
                secondaryImage={category.secondaryImage} 
                features={category.features} 
                icon={category.icon} 
              />)}
            </div> : <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No products available at the moment.</p>
              {isAdmin && <Button onClick={() => setShowManagement(true)} className="bg-primary hover:bg-primary/90">
                  Add Products
                </Button>}
            </div>}
        </div>
      </section>

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
    </div>;
};

export default Products;
