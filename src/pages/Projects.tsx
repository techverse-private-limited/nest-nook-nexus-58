import Navigation from '@/components/Navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Building, Users, Eye, DollarSign } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { Spinner } from '@/components/ui/spinner';
import SEOHead from '@/components/SEOHead';

const Projects = () => {
  const { data: projects, isLoading, error } = useProjects();

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter only active projects for public display
  const activeProjects = projects?.filter(project => project.active) || [];

  // Array of gradient backgrounds for variety
  const gradientBackgrounds = [
    'bg-gradient-to-br from-rose-50 to-pink-100',
    'bg-gradient-to-br from-blue-50 to-indigo-100', 
    'bg-gradient-to-br from-emerald-50 to-teal-100',
    'bg-gradient-to-br from-amber-50 to-orange-100',
    'bg-gradient-to-br from-violet-50 to-purple-100',
    'bg-gradient-to-br from-cyan-50 to-sky-100'
  ];

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Our Projects - Sumith Industries" 
        description="Best steel dealers for doors and windows projects done in all over tamilnadu"
        type="website"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
              Our <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Explore our portfolio of successfully completed projects across Tamil Nadu, 
              showcasing our expertise in steel door and window solutions.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-gold" />
                <span>{activeProjects.length}+ Projects</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gold" />
                <span>1000+ Satisfied Clients</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gold" />
                <span>50+ Districts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Spinner variant="ring" size={32} className="mx-auto mb-4" />
                <p>Loading projects...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">Error loading projects: {error.message}</p>
            </div>
          ) : activeProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeProjects.map((project, index) => (
                <Card
                  key={project.id}
                  className={`overflow-hidden card-hover group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 ${gradientBackgrounds[index % gradientBackgrounds.length]}`}
                >
                  {/* Image */}
                  <div className="aspect-video overflow-hidden relative">
                    {project.image_url ? (
                      <img 
                        src={project.image_url} 
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Eye className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 flex gap-2">
                      {project.category && (
                        <Badge variant="secondary" className="bg-background/90 text-foreground">
                          {project.category}
                        </Badge>
                      )}
                      {project.featured && (
                        <Badge variant="outline" className="bg-gold/90 text-deep-brown border-gold">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Content area with full card background */}
                  <div className="flex flex-col flex-1">
                    <CardHeader className="transform transition-all duration-300 group-hover:translate-y-[-2px] flex-1">
                      <CardTitle className="text-xl hover:text-primary transition-colors duration-300 group-hover:text-gold">
                        {project.name}
                      </CardTitle>
                      {project.client && (
                        <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          Client: {project.client}
                        </p>
                      )}
                      <CardDescription className="text-base group-hover:text-foreground/80 transition-colors duration-300">
                        {project.description || 'No description available'}
                      </CardDescription>
                      {project.status && (
                        <div className="flex justify-end mt-2">
                          <Badge className={`${getStatusColor(project.status)} transition-all duration-300 group-hover:scale-110`}>
                            {project.status}
                          </Badge>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="transform transition-all duration-300 group-hover:translate-y-[-2px] pt-0">
                      {project.budget && (
                        <div className="flex items-center space-x-1 text-sm mb-2 group-hover:text-gold transition-colors duration-300">
                          <DollarSign className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                          <span className="font-semibold">₹{project.budget.toLocaleString()}</span>
                        </div>
                      )}
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No projects found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">
              Our Project Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A systematic approach ensuring quality delivery every time
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "Understanding your requirements" },
              { step: "02", title: "Design", desc: "Custom solutions and planning" },
              { step: "03", title: "Manufacturing", desc: "Quality production using Tata Steel" },
              { step: "04", title: "Installation", desc: "Professional installation & support" }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gold text-deep-brown rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
                <h3 className="font-playfair font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
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

export default Projects;
