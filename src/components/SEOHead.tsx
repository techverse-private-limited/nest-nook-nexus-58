
import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead = ({ title, description, image, url, type = 'website' }: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Create or update meta tags
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const updateNameMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update Open Graph tags for better rich previews - use specific product title
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:type', type);
    updateMetaTag('og:site_name', 'Sumith Industries');
    
    if (url) {
      updateMetaTag('og:url', url);
    }
    
    if (image) {
      // Ensure the image URL is absolute for better sharing
      const absoluteImageUrl = image.startsWith('http') ? image : `${window.location.origin}${image}`;
      updateMetaTag('og:image', absoluteImageUrl);
      updateMetaTag('og:image:width', '1200');
      updateMetaTag('og:image:height', '630');
      updateMetaTag('og:image:type', 'image/jpeg');
      updateMetaTag('og:image:alt', title);
      
      // Add additional image tags for better compatibility
      updateMetaTag('og:image:secure_url', absoluteImageUrl);
    }

    // Update Twitter Card tags for better previews - use specific product title
    updateNameMetaTag('twitter:card', 'summary_large_image');
    updateNameMetaTag('twitter:title', title);
    updateNameMetaTag('twitter:description', description);
    updateNameMetaTag('twitter:site', '@SumithIndustries');
    
    if (image) {
      const absoluteImageUrl = image.startsWith('http') ? image : `${window.location.origin}${image}`;
      updateNameMetaTag('twitter:image', absoluteImageUrl);
      updateNameMetaTag('twitter:image:alt', title);
    }

    // Update standard meta tags
    updateNameMetaTag('description', description);
    updateNameMetaTag('keywords', `steel products, doors, windows, ${type === 'product' ? 'premium steel, manufacturing' : 'Sumith Industries'}`);
    updateNameMetaTag('author', 'Sumith Industries');

    // Add structured data for better rich snippets
    const structuredData = {
      "@context": "https://schema.org/",
      "@type": type === 'product' ? "Product" : "Organization",
      "name": title,
      "description": description,
      ...(image && { "image": image.startsWith('http') ? image : `${window.location.origin}${image}` }),
      ...(url && { "url": url }),
      ...(type === 'product' && {
        "brand": {
          "@type": "Brand",
          "name": "Sumith Industries"
        },
        "manufacturer": {
          "@type": "Organization",
          "name": "Sumith Industries"
        }
      })
    };

    // Update or create structured data script
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);

  }, [title, description, image, url, type]);

  return null; // This component doesn't render anything
};

export default SEOHead;
