
import { useSliderProducts } from '@/hooks/useSliderProducts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Box, Ruler } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { useState, useEffect } from 'react';

const ProductSlider = () => {
  const { data: products, isLoading } = useSliderProducts();
  
  // Typing animation state
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = ['Featured', 'Products'];
  
  // Typing animation effect with 3s cycle
  useEffect(() => {
    const resetAnimation = () => {
      setTypedText('');
      setCurrentWordIndex(0);
      setIsTypingComplete(false);
    };

    const typeWord = (wordIndex: number, charIndex: number = 0) => {
      if (wordIndex >= fullText.length) {
        setIsTypingComplete(true);
        setTimeout(() => {
          resetAnimation();
        }, 1000); // Wait 1s before restarting (total cycle ~3s)
        return;
      }

      const currentWord = fullText[wordIndex];
      
      if (charIndex < currentWord.length) {
        setTypedText(prev => {
          const words = prev.split(' ').filter(Boolean);
          words[wordIndex] = currentWord.slice(0, charIndex + 1);
          return words.join(' ');
        });
        
        setTimeout(() => typeWord(wordIndex, charIndex + 1), 100);
      } else {
        setTimeout(() => {
          setCurrentWordIndex(wordIndex + 1);
          typeWord(wordIndex + 1);
        }, 300);
      }
    };

    if (currentWordIndex === 0 && typedText === '') {
      typeWord(0);
    }
  }, [currentWordIndex, typedText, isTypingComplete]);

  // Function to render the styled text with proper colors
  const renderStyledText = (text: string) => {
    const words = text.split(' ').filter(Boolean);
    return (
      <>
        {words.map((word, index) => {
          const originalWord = fullText[index];
          const isFeatured = originalWord === 'Featured';
          const isProducts = originalWord === 'Products';
          const className = isFeatured
            ? 'text-foreground font-black'
            : isProducts
              ? 'text-gold font-black'
              : undefined;

          return (
            <span key={`word-${index}`} className={className}>
              {word}
              {index < words.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <Spinner variant="circle" size={24} className="mx-auto mb-2" />
          <p className="text-muted-foreground text-sm">Loading products...</p>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  // Extract size information from product description or points
  const extractSizes = (product: any) => {
    const text = `${product.description || ''} ${product.points || ''}`.toLowerCase();
    const sizeMatches = text.match(/(\d+)\s*(inch|inches|"|''|feet|ft)/g);
    return sizeMatches ? sizeMatches.slice(0, 2) : ['Standard Size'];
  };

  // Create multiple copies for seamless infinite scroll
  const infiniteProducts = [...products, ...products, ...products];

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black mb-3 min-h-[3rem]">
            {renderStyledText(typedText)}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Discover our premium collection of steel doors and windows
          </p>
        </div>

        {/* Optimized CSS for faster, smoother animation */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .smooth-slide {
              display: flex;
              animation: smoothSlide 20s linear infinite;
              width: calc(100% * 3);
              will-change: transform;
            }
            
            .smooth-slide:hover {
              animation-play-state: paused;
            }
            
            @keyframes smoothSlide {
              0% {
                transform: translate3d(0, 0, 0);
              }
              100% {
                transform: translate3d(-33.333%, 0, 0);
              }
            }

            .product-card {
              transform: translateZ(0);
              backface-visibility: hidden;
              perspective: 1000px;
            }
          `
        }} />

        <div className="overflow-hidden rounded-lg">
          <div className="smooth-slide">
            {infiniteProducts.map((product, index) => {
              const sizes = extractSizes(product);
              
              return (
                <div key={`${product.id}-${index}`} className="flex-none w-64 px-2">
                  <Card className="product-card group overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] h-80 flex flex-col">
                    {/* Compact Product Image */}
                    <div className="aspect-[4/3] overflow-hidden relative bg-gray-50">
                      <img 
                        src={product.image_url || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      {product.secondary_image_url && (
                        <img 
                          src={product.secondary_image_url} 
                          alt={`${product.name} - Secondary`}
                          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                      
                      {/* Subtle overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Compact measurement indicator */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                          <Ruler className="h-3 w-3" />
                          <span>{sizes[0]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Compact Card Content */}
                    <div className="flex-1 flex flex-col bg-deep-brown p-3">
                      <div className="flex items-start space-x-2 mb-2">
                        <div className="p-1 bg-gold/20 rounded flex-shrink-0">
                          <Box className="h-3 w-3 text-gold" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-white group-hover:text-gold transition-colors duration-300 line-clamp-2 leading-tight">
                            {product.name}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="text-xs text-white/70 line-clamp-2 group-hover:text-white/90 transition-colors duration-300 leading-tight mb-2 flex-1">
                        {product.description || 'Premium steel construction with modern design'}
                      </p>

                      {/* Compact size badges */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {sizes.slice(0, 2).map((size, idx) => (
                          <Badge 
                            key={idx} 
                            variant="secondary" 
                            className="text-xs bg-gold/10 text-gold hover:bg-gold/20 transition-colors duration-300 px-2 py-0.5 text-[10px]"
                          >
                            {size}
                          </Badge>
                        ))}
                      </div>

                      {/* Category badge */}
                      {product.category && (
                        <Badge variant="outline" className="text-xs px-2 py-0.5 border-white/30 text-white self-start">
                          {product.category}
                        </Badge>
                      )}
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
