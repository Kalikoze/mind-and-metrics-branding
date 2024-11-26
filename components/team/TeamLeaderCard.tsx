import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RiLinkedinBoxLine, RiLinkedinBoxFill, RiMailLine, RiMailFill } from 'react-icons/ri';
import { TeamLeader } from '@/data/team';

interface TeamLeaderCardProps {
  leader: TeamLeader;
  index: number;
}

export const TeamLeaderCard = ({ leader, index }: TeamLeaderCardProps) => {
  return (
    <article 
      data-cy={`team-leader-${index}`}
      className="bg-neutral-50 rounded-lg p-8 border-2 border-neutral-200
                 hover:border-secondary-400 transition-all duration-300 text-center"
    >
      <figure 
        className="relative w-72 h-[400px] mb-8 mx-auto rounded-xl overflow-hidden
                   ring-2 ring-neutral-200 ring-offset-4"
        data-cy={`team-leader-image-${index}`}
      >
        <Image
          src={leader.image}
          alt={leader.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 2}
        />
      </figure>

      <h3 className="font-serif text-2xl text-dark-800 mb-2"
          data-cy={`team-leader-name-${index}`}>
        {leader.name}
      </h3>
      <p className="text-dark-600 font-medium mb-4"
         data-cy={`team-leader-role-${index}`}>
        {leader.role}
      </p>
      <p className="text-dark-600 mb-6 max-w-md mx-auto"
         data-cy={`team-leader-bio-${index}`}>
        {leader.bio}
      </p>

      <nav 
        className="flex justify-center space-x-4" 
        aria-label={`${leader.name}'s social links`}
      >
        <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
          <Link
            href={leader.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary-400 hover:text-secondary-500 transition-colors group"
            aria-label={`${leader.name}'s LinkedIn`}
            data-cy={`team-leader-linkedin-${index}`}
          >
            <span className="relative w-6 h-6 inline-block">
              <RiLinkedinBoxLine className="w-6 h-6 absolute inset-0 transition-opacity duration-300 
                                          group-hover:opacity-0" />
              <RiLinkedinBoxFill className="w-6 h-6 absolute inset-0 opacity-0 transition-opacity 
                                          duration-300 group-hover:opacity-100" />
            </span>
          </Link>
        </motion.div>
        <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
          <Link
            href={`mailto:${leader.email}`}
            className="text-secondary-400 hover:text-secondary-500 transition-colors group"
            aria-label={`Email ${leader.name}`}
            data-cy={`team-leader-email-${index}`}
          >
            <span className="relative w-6 h-6 inline-block">
              <RiMailLine className="w-6 h-6 absolute inset-0 transition-opacity duration-300 
                                   group-hover:opacity-0" />
              <RiMailFill className="w-6 h-6 absolute inset-0 opacity-0 transition-opacity 
                                   duration-300 group-hover:opacity-100" />
            </span>
          </Link>
        </motion.div>
      </nav>
    </article>
  );
}; 