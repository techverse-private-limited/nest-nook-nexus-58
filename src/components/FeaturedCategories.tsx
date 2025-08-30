
import { Shield, Wrench, Home, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { useSliderProducts } from '@/hooks/useSliderProducts';
import { Spinner } from '@/components/ui/spinner';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FeaturedCategories = () => {
  const { data: sliderProducts, isLoading, error } = useSliderProducts();
  const navigate = useNavigate();
  
  // Typing animation state
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = ['Our', 'Products'];
  
  // Typing animation effect
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
        }, 2000);
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
          const isOur = originalWord === 'Our';
          const isProducts = originalWord === 'Products';
          const className = isOur
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

  // Default fallback categories if no products are configured for slider
  const defaultCategories = [
    {
      id: 'default-1',
      title: "Security Doors",
      image: "/lovable-uploads/ef7268a6-e77c-4190-97be-4007a38ee4f7.png",
      secondaryImage: "/lovable-uploads/a811f9a1-6187-47e7-b102-fb77ef8c43fd.png",
      icon: Shield,
    },
    {
      id: 'default-2',
      title: "Industrial Windows",
      image: "/lovable-uploads/ad88e55d-2bac-4345-a376-5b4410e7404e.png",
      secondaryImage: "/lovable-uploads/b729ae66-ebd0-4ad6-aedf-5a116de4eed8.png",
      icon: Building2,
    },
    {
      id: 'default-3',
      title: "Custom Fabrication",
      image: "/lovable-uploads/d35a783e-c68e-4487-9f7e-ec64a7ba3a47.png",
      secondaryImage: "/lovable-uploads/b2503fbb-44fd-41fa-ab12-205679583fd3.png",
      icon: Wrench,
    },
    {
      id: 'default-4',
      title: "Residential Solutions",
      image: "/lovable-uploads/6ce60eaf-47b6-4631-9528-6fd368381124.png",
      secondaryImage: "/lovable-uploads/8810014a-8bbd-4461-a865-04af177962d3.png",
      icon: Home,
    },
    {
      id: 'default-5',
      title: "Kambi Patta",
      image: "/lovable-uploads/ad88e55d-2bac-4345-a376-5b4410e7404e.png",
      icon: Building2,
    },
    {
      id: 'default-6',
      title: "Pipe Window",
      image: "/lovable-uploads/b729ae66-ebd0-4ad6-aedf-5a116de4eed8.png",
      icon: Building2,
    },
  ];

  const getIconForCategory = (category: string | null) => {
    switch (category?.toLowerCase()) {
      case 'security':
      case 'doors':
        return Shield;
      case 'windows':
      case 'industrial':
        return Building2;
      case 'fabrication':
      case 'custom':
        return Wrench;
      case 'residential':
      case 'home':
        return Home;
      default:
        return Shield;
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 font-lato min-h-[3rem]">
              {renderStyledText(typedText)}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-lato">
              Premium steel doors and windows solutions for residential and commercial needs
            </p>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Spinner variant="circle" size={32} className="mx-auto mb-4" />
              <p>Loading featured products...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Error loading slider products:', error);
  }

  // Use slider products if available, otherwise fall back to default categories
  const displayItems = sliderProducts && sliderProducts.length > 0 
    ? sliderProducts.map(product => ({
        id: product.id,
        title: product.name,
        image: product.image_url || "/placeholder.svg",
        secondaryImage: product.secondary_image_url,
        icon: getIconForCategory(product.category),
      }))
    : defaultCategories;

  // Triple the items for seamless infinite scroll
  const infiniteItems = [...displayItems, ...displayItems, ...displayItems];

  const handleCardClick = (item: any) => {
    if (item.id && item.id.startsWith('default-')) {
      // For default categories, navigate to products page
      navigate('/products');
    } else if (item.id) {
      // For actual products, navigate to product detail page
      navigate(`/product/${item.id}`);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-black mb-4 font-lato min-h-[3rem]">
            {renderStyledText(typedText)}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-lato">
            Premium steel doors and windows solutions for residential and commercial needs
          </p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex animate-fast-infinite-scroll hover:pause-animation">
              {infiniteItems.map((item, index) => (
                <div 
                  key={`${item.id}-${index}`} 
                  className="flex-none w-72 mx-4 group cursor-pointer"
                  onClick={() => handleCardClick(item)}
                >
                  <div className="relative h-80 w-full rounded-lg overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    {item.secondaryImage && (
                      <img 
                        src={item.secondaryImage} 
                        alt={`${item.title} - Secondary`}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                      />
                    )}
                    
                    {/* Text content with black background - positioned at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="bg-black/90 rounded-lg p-4 backdrop-blur-sm">
                        <div className="flex items-center justify-center">
                          <div className="p-2 bg-gold/20 rounded mr-3">
                            <item.icon className="h-5 w-5 text-gold" />
                          </div>
                          <h3 className="text-white font-semibold text-lg text-center">{item.title}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
