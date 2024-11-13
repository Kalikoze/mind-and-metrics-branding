import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  RiLinkedinBoxLine, RiLinkedinBoxFill,
  RiMailLine, RiMailFill
} from 'react-icons/ri';
import MaleProfile from '@/public/assets/about/male-profile.svg';
import FemaleProfile from '@/public/assets/about/female-profile.svg';

const leaders = [
  {
    name: "Julia Eskelson",
    role: "Brand Strategy Director",
    bio: "Combining creative vision with brand development expertise, specializing in visual storytelling and strategic marketing. Leverages professional photography background and design principles to help businesses build authentic, engaging brand identities that resonate with their target audience.",
    image: FemaleProfile,
    linkedin: "https://linkedin.com/",
    email: "jeskelson@mindandmetricsbranding.com"
  },
  {
    name: "Travis Rollins",
    role: "Technical Director & Lead Engineer",
    bio: "Bringing 7+ years of software development expertise and educational leadership in modern web technologies. Specializes in creating powerful digital experiences that combine technical excellence with intuitive design, while maintaining a focus on accessibility and best practices.",
    image: MaleProfile,
    linkedin: "https://www.linkedin.com/in/travisrollins/",
    email: "trollins@mindandmetricsbranding.com"
  }
];

const TeamLeaders = () => {
  return (
    <section className="bg-white py-24" data-cy="team-leaders-section">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-secondary-400 mb-4" data-cy="team-leaders-title">
            Leadership Team
          </h2>
          <p className="text-secondary-500 text-lg max-w-2xl mx-auto">
            Meet the minds behind Mind & Metrics, uniting strategic vision and technical expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mx-auto">
          {leaders.map((leader, index) => (
            <div
              key={index}
              data-cy={`team-leader-${index}`}
              className="bg-neutral-50 rounded-lg p-8 border-2 border-neutral-200
                         hover:border-secondary-400 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden
                               border-4 border-neutral-200"
                     data-cy={`team-leader-image-${index}`}>
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="font-serif text-2xl text-secondary-400 mb-2"
                    data-cy={`team-leader-name-${index}`}>
                  {leader.name}
                </h3>
                <p className="text-secondary-500 font-medium mb-4"
                   data-cy={`team-leader-role-${index}`}>
                  {leader.role}
                </p>
                <p className="text-secondary-400 mb-6 max-w-md"
                   data-cy={`team-leader-bio-${index}`}>
                  {leader.bio}
                </p>

                <div className="flex space-x-4">
                  <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary-400 hover:text-secondary-500 transition-colors group"
                      aria-label={`${leader.name}'s LinkedIn`}
                      data-cy={`team-leader-linkedin-${index}`}
                    >
                      <div className="relative w-6 h-6">
                        <RiLinkedinBoxLine className="w-6 h-6 absolute inset-0 transition-opacity duration-300 
                                                    group-hover:opacity-0" />
                        <RiLinkedinBoxFill className="w-6 h-6 absolute inset-0 opacity-0 transition-opacity 
                                                    duration-300 group-hover:opacity-100" />
                      </div>
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link
                      href={`mailto:${leader.email}`}
                      className="text-secondary-400 hover:text-secondary-500 transition-colors group"
                      aria-label={`Email ${leader.name}`}
                      data-cy={`team-leader-email-${index}`}
                    >
                      <div className="relative w-6 h-6">
                        <RiMailLine className="w-6 h-6 absolute inset-0 transition-opacity duration-300 
                                             group-hover:opacity-0" />
                        <RiMailFill className="w-6 h-6 absolute inset-0 opacity-0 transition-opacity 
                                             duration-300 group-hover:opacity-100" />
                      </div>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamLeaders; 