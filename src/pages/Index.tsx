import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProductSlider from '@/components/ProductSlider';
import AboutUsSection from '@/components/AboutUsSection';
import TrustSection from '@/components/TrustSection';
import WhatsAppButton from '@/components/WhatsAppButton';
import SEOHead from '@/components/SEOHead';

const Index = () => {
  return <div className="min-h-screen overflow-x-hidden">
      <SEOHead 
        title="Sumith Industries - Steel Doors & Windows" 
        description="Most affordable price for steel door and windows"
        type="website"
      />
      <Navigation />
      <HeroSection />
      
      {/* Animated transition section with gradient background */}
      <div className="relative py-16 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 animate-fade-in overflow-hidden">
        
        {/* Floating animated elements */}
        
        <div className="absolute bottom-20 right-32 w-24 h-24 bg-gradient-to-r from-emerald-200/30 to-teal-300/30 rounded-full animate-pulse" style={{
        animationDelay: '1s'
      }}></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-gradient-to-r from-rose-200/30 to-pink-300/30 rounded-full animate-bounce" style={{
        animationDelay: '2s',
        animationDuration: '3s'
      }}></div>
        <ProductSlider />
      </div>
      
      {/* About Us Section with unique gradient background */}
      <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 animate-fade-in overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-luxury-gold/15 via-gold/10 to-warm-wood/20 animate-pulse"></div>
        {/* Unique animated background shapes for About Us */}
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-luxury-gold via-gold to-warm-wood animate-pulse"></div>
        <div className="absolute top-32 right-16 w-48 h-48 bg-gradient-to-r from-amber-400/20 to-orange-500/25 rounded-full animate-bounce" style={{
        animationDelay: '0.5s',
        animationDuration: '7s'
      }}></div>
        <div className="absolute bottom-48 left-16 w-36 h-36 bg-gradient-to-r from-yellow-400/15 to-amber-500/20 rounded-full animate-pulse" style={{
        animationDelay: '1.5s'
      }}></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-28 h-28 bg-gradient-to-r from-orange-400/25 to-red-500/20 rounded-full animate-bounce" style={{
        animationDelay: '2.5s',
        animationDuration: '6s'
      }}></div>
        <div className="absolute bottom-32 right-1/3 w-32 h-32 bg-gradient-to-r from-pink-400/20 to-purple-500/15 rounded-full animate-pulse" style={{
        animationDelay: '3.5s'
      }}></div>
        <AboutUsSection />
      </div>
      
      {/* Trust section with enhanced animated background */}
      <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 animate-fade-in overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400 animate-pulse"></div>
        {/* Multiple animated background elements */}
        <div className="absolute top-32 left-16 w-36 h-36 bg-gradient-to-r from-lime-200/30 to-green-300/30 rounded-full animate-bounce" style={{
        animationDelay: '0.5s',
        animationDuration: '5s'
      }}></div>
        <div className="absolute bottom-32 right-16 w-44 h-44 bg-gradient-to-r from-teal-200/25 to-cyan-300/25 rounded-full animate-pulse" style={{
        animationDelay: '1.5s'
      }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-emerald-200/20 to-green-300/20 rounded-full animate-bounce" style={{
        animationDelay: '3s',
        animationDuration: '4s'
      }}></div>
        <TrustSection />
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

      {/* WhatsApp floating button */}
      <WhatsAppButton />
    </div>;
};

export default Index;
