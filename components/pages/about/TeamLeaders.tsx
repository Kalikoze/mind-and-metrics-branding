'use client';

import { leaders } from '@/data/team';
import { TeamLeaderCard } from '@/components/pages/about/team/TeamLeaderCard';

const TeamLeaders = () => {
  return (
    <section className="bg-white py-24" data-cy="team-leaders-section">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 className="font-serif text-4xl text-dark-800 mb-4" data-cy="team-leaders-title">
            Leadership Team
          </h2>
          <p className="text-dark-600 text-lg max-w-2xl mx-auto">
            Meet the minds behind Mind & Metrics, uniting strategic vision and technical expertise.
          </p>
        </header>

        <ul className="grid md:grid-cols-2 gap-12 mx-auto list-none">
          {leaders.map((leader, index) => (
            <li key={index}>
              <TeamLeaderCard leader={leader} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TeamLeaders; 