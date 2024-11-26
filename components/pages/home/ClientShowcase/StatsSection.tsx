import SectionHeader from '@/components/pages/home/ClientShowcase/SectionHeader';

interface StatProps {
  readonly value: string;
  readonly label: string;
}

const StatsSection = ({ stats }: { stats: readonly StatProps[] }) => (
  <section className="relative pt-16">
    <SectionHeader
      title="Success By The Numbers"
      subtitle="Measurable results that drive business growth through data-driven strategies"
    />
    
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <li
          key={index}
          data-cy={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
          className="text-center p-8 bg-neutral-50 border-2 border-neutral-200 rounded-lg"
        >
          <h4 className="font-serif text-5xl text-dark-800 mb-3 block" data-cy="stat-value">
            {stat.value}
          </h4>
          <p className="text-dark-600 text-sm font-sans" data-cy="stat-label">
            {stat.label}
          </p>
        </li>
      ))}
    </ul>
  </section>
);

export default StatsSection; 