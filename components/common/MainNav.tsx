'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { RiMenuLine, RiCloseLine, RiHome5Line, RiCustomerService2Line, RiTeamLine, RiMailLine, RiBriefcaseLine } from 'react-icons/ri';
import Logo from '@/public/assets/logos/mm-temp-logo.svg';

const menuItems = [
  { name: 'Home', href: '/', icon: RiHome5Line },
  { name: 'About', href: '/about', icon: RiTeamLine },
  { name: 'Services', href: '/services', icon: RiCustomerService2Line },
  { name: 'Careers', href: '/careers', icon: RiBriefcaseLine },
  { name: 'Contact', href: '/contact', icon: RiMailLine },
];

const MainNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItemVariants = {
    hover: {
      y: -2,
      transition: { type: "spring", stiffness: 400 }
    }
  };

  const menuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div
              variants={navItemVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              className="mb-2"
            >
              <Link href="/" className="flex items-end space-x-3" data-cy="nav-logo">
                <Image
                  src={Logo}
                  alt=""
                  aria-hidden="true"
                  width={40}
                  height={40}
                />
                <span data-cy="nav-logo-text" 
                      className="font-serif text-xl text-dark-900 -mb-[2px]">
                  Mind & Metrics
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-end space-x-8">
            {menuItems.map((item) => (
              <motion.div
                key={item.name}
                variants={navItemVariants}
                whileHover="hover"
                className="mb-4"
              >
                <Link
                  data-cy={`nav-item-${item.name.toLowerCase().replace(' ', '-')}`}
                  href={item.href}
                  className={`font-sans text-sm transition-colors relative group 
                    ${(pathname === item.href || (item.href === '/careers' && pathname.startsWith('/careers')))
                      ? 'text-dark-900 font-semibold' 
                      : 'text-dark-600 hover:text-dark-800'}`}
                >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 
                                   bg-dark-800/10 transition-all duration-300 
                                   group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile menu button */}
          <motion.button
            data-cy="mobile-menu-button"
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-dark-600 
                     hover:text-dark-800 hover:bg-neutral-100"
          >
            <span className="sr-only">Open menu</span>
            {isMenuOpen ? (
              <RiCloseLine className="h-6 w-6" />
            ) : (
              <RiMenuLine className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        data-cy="mobile-menu"
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={menuVariants}
        className="md:hidden overflow-hidden absolute top-16 left-0 right-0 z-50"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 
                      bg-white border-b border-neutral-200 shadow-lg">
          {menuItems.map((item) => (
            <motion.div
              key={item.name}
              variants={{
                open: {
                  opacity: 1,
                  x: 0,
                  transition: { type: "spring", stiffness: 300, damping: 30 }
                },
                closed: {
                  opacity: 0,
                  x: -20,
                  transition: { type: "spring", stiffness: 300, damping: 30 }
                }
              }}
            >
              <Link
                data-cy={`mobile-menu-${item.name.toLowerCase()}`}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-sans
                  ${(pathname === item.href || (item.href === '/careers' && pathname.startsWith('/careers')))
                    ? 'text-dark-900 font-semibold bg-primary-800/15'
                    : 'text-dark-600 hover:text-dark-800 hover:bg-primary-800/5'}
                  flex items-center space-x-3`}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};

export default MainNav;
