'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineClock
} from 'react-icons/hi2';
import { RiArrowRightUpLine } from 'react-icons/ri';
import ContactItem from './ContactItem';

const contactData = [
  {
    icon: <HiOutlineEnvelope className="w-6 h-6 text-secondary-400" />,
    title: 'Email Us',
    content: (
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
        >
          <span className="group-hover:underline">
            info@mindandmetricsbranding.com
          </span>
          <RiArrowRightUpLine className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 
                                       group-hover:ml-1 transition-all duration-300" />
        </Link>
      </motion.div>
    )
  },
  {
    icon: <HiOutlineMapPin className="w-6 h-6 text-secondary-400" />,
    title: 'Visit Us',
    content: (
      <motion.address
        variants={{
          hover: {
            y: -2,
            transition: { type: "spring", stiffness: 400 }
          }
        }}
        whileHover="hover"
        className="not-italic"
      >
        <Link
          href="https://www.google.com/maps/dir/?api=1&destination=1569+Washington+St+Blair+NE+68008"
          target="_blank"
          rel="noopener noreferrer"
          className="group block text-dark-600 group-hover:text-secondary-400 transition-colors"
        >
          <p>1569 Washington St</p>
          <p>Blair, NE 68008</p>
          <p className="text-sm text-secondary-400 mt-1 group-hover:underline inline-flex items-center">
            Get Directions
            <RiArrowRightUpLine className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 
                                         group-hover:ml-1 transition-all duration-300" />
          </p>
        </Link>
      </motion.address>
    )
  },
  {
    icon: <HiOutlineClock className="w-6 h-6 text-secondary-400" />,
    title: 'Business Hours',
    content: (
      <>
        <time className="text-dark-600 block">Monday - Friday: 8:00 AM - 4:00 PM</time>
        <p className="text-dark-600">Closed Weekends & Holidays</p>
      </>
    )
  }
];

export default function ContactInfo() {
  return (
    <section className="bg-white rounded-lg p-8 border-2 border-neutral-200
                    transition-all duration-300 hover:border-secondary-400
                    hover:shadow-lg" data-cy="contact-info">
      <h2 className="font-serif text-4xl text-dark-800 mb-4" data-cy="contact-info-title">
        Get in Touch
      </h2>
      <p className="text-dark-600 mb-12" data-cy="contact-info-description">
        Whether you&apos;re ready to transform your brand, enhance your digital presence,
        or craft a tailored marketing strategy, we&apos;re here to help. Let&apos;s connect
        and discuss how we can drive your business toward its full potential.
      </p>

      <ul className="space-y-8">
        {contactData.map((item, index) => (
          <ContactItem key={index} icon={item.icon} title={item.title} content={item.content} />
        ))}
      </ul>
    </section>
  );
} 