import { motion } from 'framer-motion';
import { HiLink } from 'react-icons/hi2';
import { RiLinkedinBoxLine, RiLinkedinBoxFill, RiFacebookBoxLine, RiFacebookBoxFill, RiInstagramLine, RiInstagramFill } from 'react-icons/ri';
import Link from 'next/link';

export const ContactVariant: React.FC = () => (
  <article 
    className="relative w-[320px] h-[250px] sm:w-[420px] 
               bg-white/60 backdrop-blur-sm rounded-xl 
               border border-primary-100/20 shadow-lg p-6"
  >
    <header className="text-center mb-6">
      <HiLink className="w-12 h-12 mx-auto text-primary-500 mb-2" />
      <h2 className="text-xl font-serif text-dark-800">Let&apos;s Connect</h2>
      <div className="h-px w-12 bg-gradient-to-r from-primary-300 to-primary-500 mx-auto mt-2 rounded-full" 
           role="presentation" />
    </header>

    <p className="text-sm text-dark-600 text-center mb-3">
      Connect with us on social media!
    </p>
    <div className="h-px w-full bg-gradient-to-r from-transparent via-primary-200/30 to-transparent mb-4" 
         role="presentation" />

    <nav className="flex justify-center gap-6 mt-4" aria-label="Social media links">
      {[
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
      ].map((social) => (
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
            className="text-primary-500 hover:text-primary-600 transition-all duration-300 group"
            aria-label={social.name}
          >
            <div className="relative w-8 h-8">
              <social.icon className="w-8 h-8 absolute inset-0 transition-opacity duration-300 
                                    group-hover:opacity-0" />
              <social.iconFill className="w-8 h-8 absolute inset-0 opacity-0 transition-opacity 
                                    duration-300 group-hover:opacity-100" />
            </div>
          </Link>
        </motion.div>
      ))}
    </nav>
  </article>
); 