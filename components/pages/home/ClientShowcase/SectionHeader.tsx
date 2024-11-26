interface SectionHeaderProps {
  title: string;
  subtitle: string;
  dataCy?: string;
}

const SectionHeader = ({ title, subtitle, dataCy }: SectionHeaderProps) => (
  <header className="text-center mb-16">
    <h2 data-cy={`${dataCy}-title`} className="text-3xl md:text-4xl font-serif text-dark-800 mb-4">
      {title}
    </h2>
    <h3 data-cy={`${dataCy}-subtitle`} className="text-dark-600 text-lg max-w-2xl mx-auto">
      {subtitle}
    </h3>
  </header>
);

export default SectionHeader; 