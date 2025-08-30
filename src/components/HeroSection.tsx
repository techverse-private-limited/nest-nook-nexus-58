
import { Button } from '@/components/ui/button';
import { WordPullUp } from '@/components/ui/word-pull-up';
import { ArrowRight, Star, Shield, Truck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ["https://manojfwinimoncyghmww.supabase.co/storage/v1/object/public/assets/steptodown.com725079.jpg", "https://manojfwinimoncyghmww.supabase.co/storage/v1/object/public/assets/steptodown.com283076.jpg"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleViewProducts = () => {
    navigate('/products');
  };

  const handleOurProjects = () => {
    navigate('/projects');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <img 
            key={index} 
            src={image} 
            alt={`Industrial steel manufacturing ${index + 1}`} 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`} 
          />
        ))}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Enhanced animated background elements - made more visible */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-r from-blue-500/30 to-cyan-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-36 h-36 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full animate-bounce" style={{
          animationDelay: '1s',
          animationDuration: '4s'
        }}></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-gradient-to-r from-emerald-400/25 to-teal-500/20 rounded-full animate-pulse" style={{
          animationDelay: '2s'
        }}></div>
        <div className="absolute top-32 right-32 w-28 h-28 bg-gradient-to-r from-rose-400/20 to-pink-500/20 rounded-full animate-bounce" style={{
          animationDelay: '3s',
          animationDuration: '5s'
        }}></div>
        <div className="absolute bottom-20 left-32 w-32 h-32 bg-gradient-to-r from-violet-400/20 to-purple-500/20 rounded-full animate-pulse" style={{
          animationDelay: '0.5s'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          {/* Main Heading with reduced font sizes */}
          <div className="mb-6">
            <div className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight font-lato tracking-tight drop-shadow-2xl">
              <WordPullUp
                words="Premium Steel"
                loop={true}
                loopDelay={3000}
                className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight font-lato tracking-tight drop-shadow-2xl inline-block"
                wrapperFramerProps={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
                framerProps={{
                  hidden: { y: 30, opacity: 0 },
                  show: { 
                    y: 0, 
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      ease: "easeOut"
                    }
                  },
                }}
              />
              <br />
              <WordPullUp
                words="Doors & Windows"
                loop={true}
                loopDelay={3000}
                className="text-4xl md:text-6xl lg:text-7xl font-black text-gold leading-tight font-lato tracking-tight drop-shadow-2xl inline-block"
                wrapperFramerProps={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                      delay: 0.5,
                    },
                  },
                }}
                framerProps={{
                  hidden: { y: 30, opacity: 0 },
                  show: { 
                    y: 0, 
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      ease: "easeOut"
                    }
                  },
                }}
              />
              <br />
              <WordPullUp
                words="Solutions"
                loop={true}
                loopDelay={3000}
                className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight font-lato tracking-tight drop-shadow-2xl inline-block"
                wrapperFramerProps={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                      delay: 1.0,
                    },
                  },
                }}
                framerProps={{
                  hidden: { y: 30, opacity: 0 },
                  show: { 
                    y: 0, 
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      ease: "easeOut"
                    }
                  },
                }}
              />
            </div>
          </div>

          {/* Subheading with reduced font size */}
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in-up hover:text-white transition-colors duration-300 font-lato font-medium drop-shadow-lg" style={{
            animationDelay: '0.2s'
          }}>
            Leading supplier of high-quality steel doors and windows from Tata Steel. 
            Trusted by builders and homeowners across Tamil Nadu.
          </p>

          {/* CTA Buttons with slightly smaller size */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up px-4" style={{
            animationDelay: '0.4s'
          }}>
            <Button onClick={handleViewProducts} size="lg" className="w-full sm:w-auto bg-gradient-to-r from-gold to-luxury-gold hover:from-luxury-gold hover:to-gold text-deep-brown font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl transform active:scale-95 min-w-[160px] sm:min-w-[180px] text-base sm:text-lg font-lato tracking-wide">
              View Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button onClick={handleOurProjects} variant="outline" size="lg" className="w-full sm:w-auto border-2 border-white bg-white/10 backdrop-blur-sm text-white font-bold hover:bg-white hover:text-deep-brown px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl transform active:scale-95 min-w-[160px] sm:min-w-[180px] text-base sm:text-lg font-lato tracking-wide">
              Our Projects
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto my-[43px]">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 animate-scale-in hover:bg-white/20 hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 border border-white/20" style={{
              animationDelay: '0.6s'
            }}>
              <Shield className="h-8 w-8 text-gold mx-auto mb-3 animate-bounce hover:animate-pulse hover:scale-110 transition-transform duration-300" />
              <h3 className="font-bold text-white mb-2 hover:text-gold transition-colors duration-300 font-lato text-lg">Tata Steel Quality</h3>
              <p className="text-white/80 text-base hover:text-white transition-colors duration-300 font-lato font-medium">ISI Marked, Corrosion Resistant Steel</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 animate-scale-in hover:bg-white/20 hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 border border-white/20" style={{
              animationDelay: '0.8s'
            }}>
              <Truck className="h-8 w-8 text-gold mx-auto mb-3 animate-bounce hover:animate-pulse hover:scale-110 transition-transform duration-300" style={{
                animationDelay: '0.5s'
              }} />
              <h3 className="font-bold text-white mb-2 hover:text-gold transition-colors duration-300 font-lato text-lg">Timely Delivery</h3>
              <p className="text-white/80 text-base hover:text-white transition-colors duration-300 font-lato font-medium">Quick Installation & Service Support</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 animate-scale-in hover:bg-white/20 hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 border border-white/20" style={{
              animationDelay: '1s'
            }}>
              <Star className="h-8 w-8 text-gold mx-auto mb-3 animate-bounce hover:animate-pulse hover:scale-110 transition-transform duration-300" style={{
                animationDelay: '1s'
              }} />
              <h3 className="font-bold text-white mb-2 hover:text-gold transition-colors duration-300 font-lato text-lg">Industry Leader</h3>
              <p className="text-white/80 text-base hover:text-white transition-colors duration-300 font-lato font-medium">500+ Projects Completed Successfully</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
