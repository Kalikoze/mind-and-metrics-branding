'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/assets/logos/mm-temp-logo.svg';
import { 
  RiLinkedinBoxLine, RiLinkedinBoxFill,
  RiFacebookBoxLine, RiFacebookBoxFill,
  RiInstagramLine, RiInstagramFill,
  RiMailLine,
  RiTimeLine,
  RiMapPin2Line,
  RiArrowRightUpLine
} from 'react-icons/ri';
import { motion } from 'framer-motion';

const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'How It Works', href: '/process' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
];

const socialLinks = [
  { 
    name: 'LinkedIn', 
    href: 'https://www.linkedin.com/company/mind-and-metrics-branding/', 
    icon: RiLinkedinBoxLine,
    iconFill: RiLinkedinBoxFill 
  },
  { 
    name: 'Facebook', 
    href: 'https://www.facebook.com/mindandmetricsbranding', 
    icon: RiFacebookBoxLine,
    iconFill: RiFacebookBoxFill 
  },
  { 
    name: 'Instagram', 
    href: 'https://www.instagram.com/mindandmetricsbranding/', 
    icon: RiInstagramLine,
    iconFill: RiInstagramFill 
  },
];

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="max-w-sm w-full">
              <Link href="/" className="flex items-center space-x-3" data-cy="footer-logo">
                <Image
                  src={Logo}
                  alt=""
                  aria-hidden="true"
                  width={40}
                  height={40}
                />
                <span className="font-serif text-xl text-secondary-600">
                  Mind & Metrics
                </span>
              </Link>
              <p className="text-secondary-500 text-sm mt-6">
                Elevating Omaha&apos;s B2B landscape through strategic branding and digital excellence. 
                Serving the Greater Omaha area and surrounding communities with tailored solutions 
                for sustainable growth.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <div className="max-w-sm w-full">
              <h3 className="font-serif text-lg text-secondary-400 mb-4" data-cy="footer-nav-title">Navigation</h3>
              <ul className="space-y-3">
                {navigationLinks.map((link) => (
                  <motion.li 
                    key={link.name}
                    variants={{
                      hover: { 
                        y: -2,
                        transition: { type: "spring", stiffness: 400 }
                      }
                    }}
                    whileHover="hover"
                  >
                    <Link
                      href={link.href}
                      data-cy={`footer-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-gray-600 hover:text-secondary-400 transition-colors
                               relative group text-sm inline-flex items-center"
                    >
                      <span className="relative">
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary-50 
                                       transition-all duration-300 group-hover:w-full" />
                      </span>
                      <RiArrowRightUpLine className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 
                                                   group-hover:ml-1 transition-all duration-300" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Hours & Contact */}
          <div className="flex flex-col items-center md:items-start">
            <div className="max-w-sm w-full">
              <h3 className="font-serif text-lg text-secondary-400 mb-4" data-cy="footer-hours-title">Hours & Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3" data-cy="footer-hours">
                  <RiTimeLine className="w-5 h-5 text-secondary-400 shrink-0 mt-0.5" />
                  <div className="text-sm text-secondary-500">
                    <p className="font-medium">Monday - Friday</p>
                    <p>8:00 AM - 4:00 PM</p>
                    <p className="mt-2">Closed Weekends & Holidays</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3" data-cy="footer-address">
                  <RiMapPin2Line className="w-5 h-5 text-secondary-400 shrink-0 mt-0.5" />
                  <div className="text-sm text-secondary-500">
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
                        className="group"
                      >
                        <p className="group-hover:text-secondary-400 transition-colors">1569 Washington St</p>
                        <p className="group-hover:text-secondary-400 transition-colors">Blair, NE 68008</p>
                        <p className="text-xs text-secondary-400 mt-1 group-hover:underline">Get Directions →</p>
                      </Link>
                    </motion.div>
                  </div>
                </div>
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
                    data-cy="footer-email"
                    className="flex items-center space-x-3 text-secondary-500 hover:text-secondary-400 
                             transition-colors group"
                  >
                    <RiMailLine className="w-5 h-5 shrink-0" />
                    <span className="text-sm break-all group-hover:underline">
                      info@mindandmetricsbranding.com
                    </span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <div className="max-w-sm w-full">
              <h3 className="font-serif text-lg text-secondary-400 mb-4" data-cy="footer-social-title">Connect With Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.div
                    key={social.name}
                    variants={{
                      hover: { 
                        y: -2,
                        transition: { type: "spring", stiffness: 400 }
                      }
                    }}
                    whileHover="hover"
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cy={`footer-social-${social.name.toLowerCase()}`}
                      className="text-secondary-500 hover:text-secondary-400 transition-all duration-300
                             group"
                      aria-label={social.name}
                    >
                      <div className="relative w-6 h-6">
                        <social.icon className="w-6 h-6 absolute inset-0 transition-opacity duration-300 
                                              group-hover:opacity-0" />
                        <social.iconFill className="w-6 h-6 absolute inset-0 opacity-0 transition-opacity 
                                                  duration-300 group-hover:opacity-100" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-neutral-200">
          <p className="text-center text-sm text-secondary-500">
            © {new Date().getFullYear()} Mind & Metrics Branding. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 