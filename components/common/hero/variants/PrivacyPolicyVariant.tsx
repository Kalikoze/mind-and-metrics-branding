import { HiLockClosed } from 'react-icons/hi2';

export const PrivacyPolicyVariant: React.FC = () => (
  <figure className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
    <div
      className="absolute inset-0 bg-gradient-to-tr from-primary-200/20 to-primary-500/20 
                 rounded-full filter blur-3xl transform -rotate-12"
      aria-hidden="true"
    />
    
    {/* Document Base */}
    <div className="absolute w-48 h-56 sm:w-56 sm:h-64 bg-white/80 backdrop-blur-sm 
                    rounded-lg shadow-lg border border-primary-100/30">
      {/* Document Lines */}
      <div className="absolute top-8 left-6 right-6 space-y-3">
        <div className="h-2 bg-primary-100 rounded-full w-3/4" />
        <div className="h-2 bg-primary-100 rounded-full w-full" />
        <div className="h-2 bg-primary-100 rounded-full w-2/3" />
      </div>

      {/* Privacy Seal */}
      <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary-500 rounded-full 
                      shadow-lg border-4 border-white flex items-center justify-center">
        <HiLockClosed className="w-8 h-8 text-white" />
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-8 h-8">
        <div className="absolute top-0 right-0 w-full h-full bg-primary-100 
                      transform -translate-y-1/2 translate-x-1/2 rotate-45" />
      </div>
    </div>
  </figure>
); 