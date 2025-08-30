
import { Card, CardContent } from '@/components/ui/card';
import { SplitText } from '@/components/ui/split-text';
import { Settings, Users, Award, Clock, MapPin, Phone } from 'lucide-react';
import { useState, useEffect, type ReactNode } from 'react';
import AutoPlayVideo from '@/components/AutoPlayVideo';

const AboutUsSection = () => {
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = ['Restructure', 'Your', 'Concepts'];
  
  // Faster typing animation for better user experience
  useEffect(() => {
    const resetAnimation = () => {
      setTypedText('');
      setCurrentWordIndex(0);
      setIsTypingComplete(false);
    };

    const typeWord = (wordIndex: number, charIndex: number = 0) => {
      if (wordIndex >= fullText.length) {
        setIsTypingComplete(true);
        // Reset after shorter cycle for faster experience
        setTimeout(() => {
          resetAnimation();
        }, 1500);
        return;
      }

      const currentWord = fullText[wordIndex];
      
      if (charIndex < currentWord.length) {
        setTypedText(prev => {
          const words = prev.split(' ').filter(Boolean);
          words[wordIndex] = currentWord.slice(0, charIndex + 1);
          return words.join(' ');
        });
        
        // Much faster typing speed - reduced from 120ms to 60ms
        setTimeout(() => typeWord(wordIndex, charIndex + 1), 60);
      } else {
        // Shorter pause between words - reduced from 400ms to 200ms
        setTimeout(() => {
          setCurrentWordIndex(wordIndex + 1);
          typeWord(wordIndex + 1);
        }, 200);
      }
    };

    if (currentWordIndex === 0 && typedText === '') {
      typeWord(0);
    }
  }, [currentWordIndex, typedText, isTypingComplete]);

  const stats = [
    {
      icon: Clock,
      title: 'Years of Experience',
      value: '15+',
      description: 'Serving quality since 2009'
    },
    {
      icon: Settings,
      title: 'Projects Done',
      value: '5000+',
      description: 'Successful installations'
    },
    {
      icon: Users,
      title: 'Engineers',
      value: '12+',
      description: 'Skilled professionals'
    },
    {
      icon: Award,
      title: 'Satisfied Customers',
      value: '4500+',
      description: 'Happy homeowners'
    }
  ];

  const handleAnimationComplete = () => {
    console.log('Split text animation completed!');
  };

  // Function to render the styled text with proper colors and weights
  const renderStyledText = (text: string): ReactNode => {
    const words = text.split(' ').filter(Boolean);
    return (
      <>
        {words.map((word, index) => {
          // Check if this word should be styled based on the original full text
          const originalWord = fullText[index];
          const isBrown = originalWord === 'Restructure';
          const isYellow = originalWord === 'Your' || originalWord === 'Concepts';
          const className = isBrown
            ? 'text-deep-brown font-black'
            : isYellow
              ? 'text-gradient bg-gradient-to-r from-gold via-luxury-gold to-gold bg-clip-text text-transparent font-black'
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

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 relative overflow-hidden">
      {/* Light animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 via-luxury-gold/3 to-warm-wood/8 animate-pulse"></div>
        <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-purple-200/30 to-indigo-200/20 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-blue-200/25 to-purple-200/30 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '4s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-indigo-200/35 to-blue-200/25 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-20 right-1/4 w-20 h-20 bg-gradient-to-r from-purple-300/25 to-indigo-300/15 rounded-full animate-bounce" style={{animationDelay: '3s', animationDuration: '5s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block mb-4">
            <span className="text-sm font-black text-gold tracking-wider uppercase">ABOUT US</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 animate-scale-in min-h-[3rem] md:min-h-[4rem]">
            {renderStyledText(typedText)}
          </h2>
          <div className="max-w-4xl mx-auto leading-relaxed">
            <SplitText
              text="Sumith Industries is a well-known custom steel doors and windows shop founded in 2009 and based in Alagulam, Tamil Nadu. With a wide selection of steel solutions for home and business use, Sumith Industries is a one-stop shop for people looking for high-end products with cutting-edge designs. We have established a reputation for innovation and skill throughout the years. With over 15 years of experience, we continually test the limits of standard steel concepts and brought new ideas to life."
              className="text-lg text-muted-foreground font-bold"
              delay={15}
              animationFrom={{ opacity: 0, transform: 'translate3d(0, 20px, 0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
              easing="easeOutCubic"
              threshold={0.2}
              rootMargin="-50px"
              textAlign="center"
              onLetterAnimationComplete={handleAnimationComplete}
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left Side - Optimized Vimeo Video */}
          <div className="relative animate-slide-in-left" style={{animationDelay: '0.3s'}}>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-black group">
              <div className="w-full h-64 md:h-96 lg:h-[400px]">
                <AutoPlayVideo
                  src="https://jsndspeyfasxlquibpwg.supabase.co/storage/v1/object/public/assets/sumit%20industry%20expo%20video.mp4"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 rounded-2xl"
                  loop={true}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/20 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="flex flex-col justify-center animate-slide-in-right" style={{animationDelay: '0.4s'}}>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-white/40">
                <div className="flex-shrink-0">
                  <MapPin className="h-8 w-8 text-gold" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-2">
                    Our Location
                  </h4>
                  <p className="text-muted-foreground">
                    Based in <span className="text-gold font-semibold">Alagulam, Tamil Nadu</span>, we serve customers across 
                    Tenkasi, Madurai, and Tirunelveli with premium steel solutions.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-white/40">
                <div className="flex-shrink-0">
                  <Award className="h-8 w-8 text-gold" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-2">
                    Our Expertise
                  </h4>
                  <p className="text-muted-foreground">
                    Specializing in steel security doors, kambi patta windows, pipe windows, and powder coated solutions 
                    with 2-side and 3-side opening systems.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-white/40">
                <div className="flex-shrink-0">
                  <Phone className="h-8 w-8 text-gold" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-2">
                    Get In Touch
                  </h4>
                  <p className="text-muted-foreground">
                    Ready to transform your space? Contact us today for custom steel solutions 
                    that combine durability with elegant design.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="text-center border-0 shadow-lg bg-white/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 animate-fade-in-up transform hover:scale-105 hover:-translate-y-2 border border-white/30" 
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gold/20 to-luxury-gold/10 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-gold" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-foreground mb-1">
                  {stat.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-gold to-luxury-gold text-deep-brown px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer">
            <Award className="inline-block mr-3 h-6 w-6" />
            15+ Years of Excellence in Steel Solutions
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
