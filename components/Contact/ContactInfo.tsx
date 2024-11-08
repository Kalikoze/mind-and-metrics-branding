import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineClock
} from 'react-icons/hi2';
import { RiArrowRightUpLine } from 'react-icons/ri';

export default function ContactInfo() {
  return (
    <div className="bg-white rounded-lg p-8 border-2 border-neutral-200
                    transition-all duration-300 hover:border-secondary-400
                    hover:shadow-lg">
      <h2 className="font-serif text-3xl text-secondary-400 mb-6">
        Get in Touch
      </h2>
      <p className="text-secondary-500 mb-12">
        Whether you&apos;re looking to transform your brand, optimize your digital presence,
        or develop a comprehensive marketing strategy, we&apos;re here to help. Let&apos;s discuss
        how we can help your business reach its full potential.
      </p>

      <div className="space-y-8">
        <div className="flex items-start space-x-4">
          <div className="bg-neutral-50 p-3 rounded-full shrink-0">
            <HiOutlineEnvelope className="w-6 h-6 text-secondary-400" />
          </div>
          <div>
            <h3 className="font-serif text-lg text-secondary-400 mb-2">Email Us</h3>
            <motion.div
              variants={{
                hover: {
                  y: -2,
                  transition: { type: "spring", stiffness: 400 }
                }
              }}
              whileHover="hover"
            >
              <Link
                href="mailto:info@mindandmetricsbranding.com"
                className="text-secondary-500 hover:text-secondary-400 transition-colors
                               group inline-flex items-center"
              >
                <span className="group-hover:underline">
                  info@mindandmetricsbranding.com
                </span>
                <RiArrowRightUpLine className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 
                                                   group-hover:ml-1 transition-all duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="bg-neutral-50 p-3 rounded-full shrink-0">
            <HiOutlineMapPin className="w-6 h-6 text-secondary-400" />
          </div>
          <div>
            <h3 className="font-serif text-lg text-secondary-400 mb-2">Visit Us</h3>
            <motion.div
              variants={{
                hover: {
                  y: -2,
                  transition: { type: "spring", stiffness: 400 }
                }
              }}
              whileHover="hover"
            >
              <Link
                href="https://www.google.com/maps/dir/?api=1&destination=1569+Washington+St+Blair+NE+68008"
                target="_blank"
                rel="noopener noreferrer"
                className="group block" // Added block to make link take full width
              >
                <div className="text-secondary-500 group-hover:text-secondary-400 transition-colors">
                  <p>1569 Washington St</p>
                  <p>Blair, NE 68008</p>
                  <p className="text-sm text-secondary-400 mt-1 group-hover:underline inline-flex items-center">
                    Get Directions
                    <RiArrowRightUpLine className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 
                                                       group-hover:ml-1 transition-all duration-300" />
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="bg-neutral-50 p-3 rounded-full shrink-0">
            <HiOutlineClock className="w-6 h-6 text-secondary-400" />
          </div>
          <div>
            <h3 className="font-serif text-lg text-secondary-400 mb-2">Business Hours</h3>
            <p className="text-secondary-500">Monday - Friday: 8:00 AM - 4:00 PM</p>
            <p className="text-secondary-500">Closed Weekends & Holidays</p>
          </div>
        </div>
      </div>
    </div>
  );
} 