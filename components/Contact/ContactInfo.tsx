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
                    hover:shadow-lg" data-cy="contact-info">
      <h2 className="font-serif text-3xl text-dark-800 mb-6" data-cy="contact-info-title">
        Get in Touch
      </h2>
      <p className="text-dark-600 mb-12" data-cy="contact-info-description">
        Whether you&apos;re ready to transform your brand, enhance your digital presence,
        or craft a tailored marketing strategy, we&apos;re here to help. Let&apos;s connect
        and discuss how we can drive your business toward its full potential.
      </p>

      <div className="space-y-8">
        <div className="flex items-start space-x-4" data-cy="contact-email">
          <div className="bg-neutral-50 p-3 rounded-full shrink-0">
            <HiOutlineEnvelope className="w-6 h-6 text-secondary-400" />
          </div>
          <div>
            <h3 className="font-serif text-lg text-dark-800 mb-2" data-cy="contact-email-title">Email Us</h3>
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
                className="text-dark-600 hover:text-secondary-400 transition-colors
                           group inline-flex items-center"
                data-cy="contact-email-link"
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

        <div className="flex items-start space-x-4" data-cy="contact-location">
          <div className="bg-neutral-50 p-3 rounded-full shrink-0">
            <HiOutlineMapPin className="w-6 h-6 text-secondary-400" />
          </div>
          <div>
            <h3 className="font-serif text-lg text-dark-800 mb-2" data-cy="contact-location-title">Visit Us</h3>
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
                className="group block"
                data-cy="contact-location-directions"
              >
                <div className="text-dark-600 group-hover:text-secondary-400 transition-colors" data-cy="contact-location-address">
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

        <div className="flex items-start space-x-4" data-cy="contact-hours">
          <div className="bg-neutral-50 p-3 rounded-full shrink-0">
            <HiOutlineClock className="w-6 h-6 text-secondary-400" />
          </div>
          <div>
            <h3 className="font-serif text-lg text-dark-800 mb-2" data-cy="contact-hours-title">Business Hours</h3>
            <p className="text-dark-600" data-cy="contact-hours-weekday">Monday - Friday: 8:00 AM - 4:00 PM</p>
            <p className="text-dark-600" data-cy="contact-hours-weekend">Closed Weekends & Holidays</p>
          </div>
        </div>
      </div>
    </div>
  );
} 