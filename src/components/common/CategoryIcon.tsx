import React from 'react';
import { 
  Zap, 
  Droplet, 
  Wind, 
  Disc, 
  Refrigerator, 
  KeyRound, 
  Bike, 
  Tv, 
  Wrench, 
  Home, 
  MoreHorizontal,
  LucideProps 
} from 'lucide-react';

interface CategoryIconProps extends LucideProps {
  name: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, ...props }) => {
  switch (name.toLowerCase()) {
    case 'zap':
    case 'dien':
      return <Zap {...props} />;
    case 'droplet':
    case 'nuoc':
      return <Droplet {...props} />;
    case 'wind':
    case 'dien-lanh':
      return <Wind {...props} />;
    case 'disc':
    case 'may-giat':
      return <Disc {...props} />;
    case 'refrigerator':
    case 'tu-lanh':
      return <Refrigerator {...props} />;
    case 'keyround':
    case 'khoa':
      return <KeyRound {...props} />;
    case 'bike':
    case 'xe-may':
      return <Bike {...props} />;
    case 'tv':
    case 'do-gia-dung':
      return <Tv {...props} />;
    case 'wrench':
    case 'lap-dat':
      return <Wrench {...props} />;
    case 'home':
    case 'nha-cua':
      return <Home {...props} />;
    default:
      return <MoreHorizontal {...props} />;
  }
};

