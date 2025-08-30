
import { Card, CardContent } from '@/components/ui/card';
import { Star, CheckCircle } from 'lucide-react';

const TrustSection = () => {
  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Tenkasi',
      rating: 5,
      text: 'Amazing quality steel doors! The delivery was on time and the team was very professional. Highly recommended!'
    },
    {
      name: 'Rajesh Kumar',
      location: 'Madurai',
      rating: 5,
      text: 'Bought steel windows for our entire building. The craftsmanship is outstanding and the prices are very reasonable.'
    },
    {
      name: 'Meera Devi',
      location: 'Tirunelveli',
      rating: 5,
      text: 'Excellent customer service and beautiful steel solutions. They helped us choose the perfect designs for our home.'
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden min-h-screen">
      {/* Light animated background elements for steel business theme */}
      <div className="absolute inset-0">
        {/* Main animated overlay with warm steel colors */}
        <div className="absolute inset-0 bg-gradient-to-r from-warm-wood/10 via-gold/8 to-luxury-gold/12 animate-pulse"></div>
        
        {/* Multiple floating gradient orbs with steel/metal inspired colors - hidden on mobile for performance */}
        <div className="hidden md:block absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-amber-200/30 to-orange-200/25 rounded-full blur-3xl animate-float" style={{animationDelay: '0s', animationDuration: '8s'}}></div>
        <div className="hidden md:block absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-yellow-200/25 to-amber-200/30 rounded-full blur-3xl animate-float" style={{animationDelay: '2s', animationDuration: '10s'}}></div>
        <div className="hidden md:block absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-r from-orange-200/20 to-yellow-200/25 rounded-full blur-2xl animate-bounce" style={{animationDelay: '1s', animationDuration: '6s'}}></div>
        <div className="hidden md:block absolute top-40 right-40 w-56 h-56 bg-gradient-to-r from-amber-200/25 to-orange-300/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
        <div className="hidden md:block absolute bottom-40 left-40 w-72 h-72 bg-gradient-to-r from-yellow-200/20 to-amber-300/25 rounded-full blur-3xl animate-float" style={{animationDelay: '4s', animationDuration: '12s'}}></div>
        
        {/* Animated gradient lines with steel theme colors */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-warm-wood via-gold to-luxury-gold animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-luxury-gold via-gold to-warm-wood animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-center min-h-[80vh]">
        {/* Customer Testimonials with light glass-morphism */}
        <div className="px-2 w-full">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-foreground mb-8 md:mb-12 animate-scale-in hover:animate-pulse transition-all duration-300 drop-shadow-sm font-lato">
            What Our Customers Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-lg animate-fade-in-up transition-all duration-500 hover:shadow-xl hover:scale-105 hover:-translate-y-2 bg-white/60 backdrop-blur-sm border border-white/40 hover:bg-white/80 hover:border-gold/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-4 md:p-6">
                  {/* Rating */}
                  <div className="flex items-center justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 md:h-5 md:w-5 text-gold fill-current hover:animate-bounce transition-all duration-300 drop-shadow-sm" style={{animationDelay: `${i * 0.1}s`}} />
                    ))}
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-sm md:text-base text-muted-foreground text-center mb-4 md:mb-6 italic hover:text-foreground transition-colors duration-300 font-lato">
                    "{testimonial.text}"
                  </p>
                  
                  {/* Customer Info */}
                  <div className="text-center">
                    <h4 className="text-sm md:text-base font-semibold text-foreground mb-1 hover:text-deep-brown transition-colors duration-300 drop-shadow-sm font-lato">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs md:text-sm text-muted-foreground flex items-center justify-center hover:text-foreground transition-colors duration-300 font-lato">
                      <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-gold mr-1" />
                      {testimonial.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
