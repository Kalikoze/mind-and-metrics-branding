import { motion, AnimatePresence } from 'framer-motion';
import { serviceDetails } from '@/data/serviceDetails';

interface ServicesVariantProps {
  activeService: number;
}

export const ServicesVariant: React.FC<ServicesVariantProps> = ({ activeService }) => (
  <div className="relative h-64 flex flex-col justify-around">
    <div className="flex flex-wrap justify-center items-center">
      {serviceDetails.map((service, index) => (
        <div
          key={service.id}
          className="flex justify-center items-center m-2 p-4 bg-primary-400 rounded-full shadow-lg"
          style={{
            opacity: activeService === index ? 1 : 0.5,
          }}
        >
          <service.icon className="w-8 h-8 text-white" />
        </div>
      ))}
    </div>
    <AnimatePresence mode="wait">
      <motion.div
        key={serviceDetails[activeService].title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex flex-col justify-center items-center w-96 h-64 bg-white rounded-xl shadow-lg border border-primary-100/20 p-4 transform hover:scale-105 mx-auto mt-8"
      >
        <p className="text-xl sm:text-2xl font-serif text-dark-800 text-center">
          {serviceDetails[activeService].title}
        </p>
        <div className="h-1 w-12 bg-gradient-to-r from-primary-300 to-primary-500 mx-auto mt-2 rounded-full"></div>
      </motion.div>
    </AnimatePresence>
  </div>
); 