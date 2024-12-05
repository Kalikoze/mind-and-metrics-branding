import Image from 'next/image';
import MainLogo from '@/public/assets/graphics/m&m-logo.svg';

export const DefaultVariant: React.FC = () => (
  <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
    <div className="absolute inset-0 bg-gradient-to-tr from-primary-100/20 to-primary-400/20 
                  rounded-full filter blur-3xl transform -rotate-12" />
    <Image
      src={MainLogo}
      alt="Mind & Metrics logo"
      fill
      className="object-contain"
      priority
    />
  </div>
); 