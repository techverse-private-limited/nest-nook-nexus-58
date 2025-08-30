
import { useState } from 'react';
import { Menu, X, Search, Home, Info, Package, FolderOpen, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Projects', href: '/projects', icon: FolderOpen },
    { name: 'Contact Us', href: '/contact', icon: Mail },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center space-x-3">
              <img 
                src="/lovable-uploads/d35a783e-c68e-4487-9f7e-ec64a7ba3a47.png" 
                alt="Sumith Industries Logo" 
                className="h-12 w-12 object-contain"
              />
              <Link to="/" className="text-2xl font-georgia font-bold text-primary hover:text-primary/80 transition-colors">
                <span className="text-white">Sumith</span>
                <span className="text-gradient ml-1">Industries</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`px-3 py-2 text-sm font-medium transition-colors duration-200 relative group flex items-center space-x-2 ${
                        isActive(item.href) 
                          ? 'text-white font-semibold' 
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{item.name}</span>
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-deep-brown to-warm-wood transition-all duration-300 ${
                        isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hover:bg-white/10 text-white hover:text-white transition-colors">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:bg-white/10 hover:text-white z-50 relative transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Background overlay */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
          onClick={() => setIsOpen(false)} 
        />
        
        {/* Sidebar panel */}
        <div className={`absolute top-0 left-0 h-full w-80 max-w-[80vw] bg-background shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-background to-secondary/20">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/d35a783e-c68e-4487-9f7e-ec64a7ba3a47.png" 
                alt="Sumith Industries Logo" 
                className="h-10 w-10 object-contain"
              />
              <h2 className="text-xl font-georgia font-bold text-primary">
                <span className="text-deep-brown">Sumith</span>
                <span className="text-gradient ml-1">Industries</span>
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-foreground hover:bg-secondary hover:text-deep-brown transition-colors"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Sidebar Content */}
          <div className="p-4 space-y-2">
            {/* Navigation Items */}
            <div className="space-y-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const active = isActive(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-4 rounded-lg transition-all duration-200 group ${
                      active 
                        ? 'bg-deep-brown text-white shadow-sm' 
                        : 'text-foreground hover:text-deep-brown hover:bg-secondary'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <IconComponent className={`h-5 w-5 mr-4 transition-colors ${
                      active ? 'text-white' : 'text-muted-foreground group-hover:text-deep-brown'
                    }`} />
                    <span className={`font-medium ${active ? 'font-semibold text-white' : ''}`}>
                      {item.name}
                    </span>
                    {active && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Search Section */}
            <div className="pt-4 mt-6 border-t border-border">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-foreground hover:text-deep-brown hover:bg-secondary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Search className="h-5 w-5 mr-4 text-muted-foreground" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
