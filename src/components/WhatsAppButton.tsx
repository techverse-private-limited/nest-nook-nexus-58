
import { Phone, Mail } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '+919442021149';
  const email = 'svsundar@gmail.com';
  const defaultMessage = 'Hello! I am interested in your premium steel doors and windows. Could you please provide more information about your products and pricing?';
  
  const handleWhatsAppClick = () => {
    // Encode the message to ensure it works properly in URLs
    const encodedMessage = encodeURIComponent(defaultMessage);
    
    // Try multiple WhatsApp URL formats for better compatibility
    const whatsappUrls = [
      `https://api.whatsapp.com/send?phone=919442021149&text=${encodedMessage}`,
      `https://wa.me/919442021149/?text=${encodedMessage}`,
      `whatsapp://send?phone=919442021149&text=${encodedMessage}`
    ];
    
    console.log('Opening WhatsApp with message:', defaultMessage);
    console.log('Trying WhatsApp URLs:', whatsappUrls);
    
    // Try the API URL first (most reliable for pre-filled messages)
    const primaryUrl = whatsappUrls[0];
    
    // For mobile devices, try the whatsapp:// protocol first
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = whatsappUrls[2]; // whatsapp:// protocol
      
      // Fallback to web URL after a short delay if app doesn't open
      setTimeout(() => {
        window.open(primaryUrl, '_blank', 'noopener,noreferrer');
      }, 1000);
    } else {
      // For desktop, use the API URL directly
      const newWindow = window.open(primaryUrl, '_blank', 'noopener,noreferrer');
      
      // Fallback if popup is blocked
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        window.location.href = primaryUrl;
      }
    }
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent('Inquiry about Steel Doors and Windows');
    const body = encodeURIComponent(defaultMessage);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed bottom-6 right-2 sm:right-4 md:right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button - Font Awesome icon and slow pulse */}
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg ring-1 ring-black/10 hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center animate-pulse"
        style={{
          animationDuration: '2s',
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite'
        }}
        aria-label="Contact us on WhatsApp"
        title="WhatsApp"
      >
        <i className="fa-brands fa-whatsapp text-white text-2xl sm:text-3xl"></i>
      </button>
      
      {/* Phone Button */}
      <button
        onClick={handlePhoneClick}
        className="bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg ring-1 ring-black/10 hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Call us"
        title="Call +91 94420 21149"
      >
        <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      
      {/* Email Button */}
      <button
        onClick={handleEmailClick}
        className="bg-purple-500 hover:bg-purple-600 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg ring-1 ring-black/10 hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label="Email us"
        title="Email us"
      >
        <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    </div>
  );
};

export default WhatsAppButton;
