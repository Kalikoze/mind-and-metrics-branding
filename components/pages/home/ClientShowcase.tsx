'use client';

import { useState } from 'react';
import { stats, clientLogos } from '@/data/clientShowcase';
import SectionHeader from '@/components/pages/home/ClientShowcase/SectionHeader';
import ClientLogo from '@/components/pages/home/ClientShowcase/ClientLogo';
import StatsSection from '@/components/pages/home/ClientShowcase/StatsSection';

const ClientShowcase = () => {
  const [hoveringIndices, setHoveringIndices] = useState<{ [key: number]: boolean }>({});

  return (
    <section data-cy="social-proof-section" className="bg-white py-20">
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Trusted By Industry Leaders"
          subtitle="Join the growing list of B2B leaders who trust us with their digital success."
          dataCy="social-proof"
        />

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {clientLogos.map((logo, index) => (
            <li key={index}>
              <ClientLogo
                logo={logo}
                index={index}
                isHovering={hoveringIndices[index]}
                onMouseEnter={() => setHoveringIndices(prev => ({ ...prev, [index]: true }))}
                onMouseLeave={() => setHoveringIndices(prev => ({ ...prev, [index]: false }))}
              />
            </li>
          ))}
        </ul>

        <StatsSection stats={stats} />
      </article>
    </section>
  );
};

export default ClientShowcase; 