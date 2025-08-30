
import Navigation from '@/components/Navigation';
import { Shield, Award, Users, Clock, Trophy, Star, Target } from 'lucide-react';
import AutoPlayVideo from '@/components/AutoPlayVideo';
import SEOHead from '@/components/SEOHead';

const About = () => {
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="About us - Sumith Industries" 
        description="Best Tamilnadu steel dealer for doors and windows"
        type="website"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
              About <span className="text-gradient">Sumith Industries</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Leading supplier of premium steel doors and windows, committed to delivering 
              excellence in every project across Tamil Nadu.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 animate-scale-in">
              <img 
                src="/lovable-uploads/a2750ba6-1e2b-4f08-90ce-b2d9f60362ea.png" 
                alt="Founder of Sumith Industries" 
                className="rounded-lg shadow-2xl hover:shadow-3xl transition-shadow duration-300 w-full max-w-md mx-auto"
              />
            </div>
            <div className="order-1 lg:order-2 animate-fade-in-up">
              <h2 className="text-3xl font-playfair font-bold text-foreground mb-6">
                Meet Our <span className="text-gradient">Visionary Founder</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p className="text-lg font-semibold text-foreground">
                  The driving force behind Sumith Industries' remarkable journey
                </p>
                <p>
                  With over 15 years of unwavering dedication to the steel industry, our founder has built 
                  Sumith Industries from the ground up, transforming a simple vision into Tamil Nadu's most 
                  trusted name in premium steel doors and windows.
                </p>
                <p>
                  His entrepreneurial spirit and commitment to quality have revolutionized how steel solutions 
                  are delivered across the region. From humble beginnings to serving over 1000+ satisfied 
                  customers, his leadership has established industry benchmarks that others aspire to achieve.
                </p>
                <p>
                  Under his guidance, Sumith Industries has pioneered innovative steel solutions, maintaining 
                  the perfect balance between traditional craftsmanship and modern technology. His personal 
                  involvement in every project ensures that each client receives nothing but excellence.
                </p>
                <div className="pt-4">
                  <div className="inline-flex items-center bg-gradient-to-r from-gold/10 to-luxury-gold/10 px-6 py-3 rounded-lg border border-gold/20">
                    <Award className="h-6 w-6 text-gold mr-3" />
                    <span className="font-semibold text-foreground">
                      "Quality is not just our promise, it's our passion"
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Participation Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
              Our Industry <span className="text-gradient">Participation</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Witness our active participation in Project Expo 2025 at Esaki Mahal, Tenkasi
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Video */}
            <div className="animate-scale-in">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <AutoPlayVideo
                  src="https://jsndspeyfasxlquibpwg.supabase.co/storage/v1/object/public/assets/sumit%20industry%20expo%20video.mp4"
                  className="w-full h-auto rounded-lg"
                  poster="/placeholder.svg"
                />
              </div>
            </div>
            
            {/* Achievement Descriptions */}
            <div className="animate-fade-in-up space-y-6">
              <div className="border-l-4 border-gold pl-6">
                <h3 className="text-xl font-playfair font-bold text-foreground mb-3 flex items-center">
                  <Trophy className="h-6 w-6 text-gold mr-3" />
                  Project Expo 2025 Excellence
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our participation in Project Expo 2025 at Esaki Mahal, Tenkasi marked a significant milestone 
                  where we demonstrated cutting-edge steel door and window solutions. The event attracted industry 
                  professionals and potential clients, establishing us as innovators in the field.
                </p>
              </div>

              <div className="border-l-4 border-gold pl-6">
                <h3 className="text-xl font-playfair font-bold text-foreground mb-3 flex items-center">
                  <Star className="h-6 w-6 text-gold mr-3" />
                  Media Recognition
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Featured in leading trade magazines and online publications for our innovative approach 
                  to steel fabrication. Our work has been highlighted as a benchmark for quality and 
                  reliability in the Tamil Nadu construction industry.
                </p>
              </div>

              <div className="border-l-4 border-gold pl-6">
                <h3 className="text-xl font-playfair font-bold text-foreground mb-3 flex items-center">
                  <Target className="h-6 w-6 text-gold mr-3" />
                  Exhibition Success
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Regular participation in regional building exhibitions has helped us connect with 
                  architects, contractors, and homeowners. These events showcase our latest products 
                  and demonstrate our commitment to continuous innovation.
                </p>
              </div>
            </div>
          </div>
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
    </div>
  );
};

export default About;
