
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  id?: string;
  title: string;
  description: string;
  image: string;
  secondaryImage?: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}

const ProductCard = ({ id, title, description, image, secondaryImage, features, icon: Icon, className = "" }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (id) {
      navigate(`/product/${id}`);
    }
  };

  return (
    <Card 
      className={`overflow-hidden card-hover group cursor-pointer bg-deep-brown ${className}`}
      onClick={handleClick}
    >
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        />
        {secondaryImage && (
          <img 
            src={secondaryImage} 
            alt={`${title} - Secondary`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
          />
        )}
      </div>
      <CardHeader className="bg-deep-brown pb-3">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-gold/20 rounded-lg">
            <Icon className="h-6 w-6 text-gold" />
          </div>
          <CardTitle className="text-xl text-white">{title}</CardTitle>
        </div>
        <CardDescription className="text-base text-white/80">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-deep-brown pt-0">
        <ul className="space-y-2">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center space-x-2 text-sm text-white/70">
              <Star className="h-3 w-3 text-gold" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
