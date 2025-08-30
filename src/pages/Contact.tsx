import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.message) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const form = e.target as HTMLFormElement;
      const formDataToSubmit = new FormData(form);
      
      const response = await fetch('https://formsubmit.co/nazarmuhammed740@gmail.com', {
        method: 'POST',
        body: formDataToSubmit
      });

      if (response.ok) {
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for contacting us. We'll get back to you within 24 hours.",
        });
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          projectType: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
              Contact <span className="text-gradient">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get in touch with us for all your steel door and window requirements. 
              We're here to provide you with the best solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-playfair font-bold text-foreground mb-6">
                Get In Touch
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you within 24 hours with a detailed quote.
              </p>
              
              <form 
                id="contact" 
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                {/* FormSubmit configuration fields */}
                <input type="hidden" name="_subject" value="New Contact Form Submission from Sumith Industries Website" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name *
                    </label>
                    <Input 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      className="hover:border-gold focus:border-gold transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name *
                    </label>
                    <Input 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      className="hover:border-gold focus:border-gold transition-colors"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <Input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="hover:border-gold focus:border-gold transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number *
                  </label>
                  <Input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="hover:border-gold focus:border-gold transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Project Type
                  </label>
                  <select 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background hover:border-gold focus:border-gold transition-colors"
                  >
                    <option value="">Select project type</option>
                    <option value="Steel door">Steel door</option>
                    <option value="Steel windows">Steel windows</option>
                    <option value="Powder coated Steel windows">Powder coated Steel windows</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your requirements in detail..."
                    rows={4}
                    className="hover:border-gold focus:border-gold transition-colors"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-luxury-gold text-deep-brown font-semibold py-3 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Map Section */}
            <div className="animate-scale-in">
              <h3 className="text-2xl font-playfair font-bold text-foreground mb-6">
                Visit Our Showroom
              </h3>
              <div className="bg-secondary rounded-lg overflow-hidden h-96 mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.8043084694955!2d77.5659911!3d8.9326287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0423be55555555%3A0x65182ee56ae634ae!2sVel%20Electronics!5e0!3m2!1sen!2sin!4v1635789012345!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
              
              {/* Quick Info */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gold mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Main Showroom</p>
                    <p className="text-sm text-muted-foreground">
                      Venkateswarapuram(P.O), Alangulam Taluk<br />
                      Tenkasi Dist, Tamil Nadu - 627 854
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-gold mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Direct Contact</p>
                    <p className="text-sm text-muted-foreground">
                      +91 94420 21149<br />
                      Available for site visits and consultations
                    </p>
                  </div>
                </div>
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

export default Contact;
