type ValuePropProps = {
  icon: React.ElementType;
  title: string;
  description: string;
}

const ValuePropCard = ({ icon: Icon, title, description }: ValuePropProps) => (
  <article
    data-cy={`value-prop-${title.toLowerCase().replace(/\s+/g, '-')}`}
    className="p-8 rounded-lg bg-neutral-50 border-2 border-neutral-200"
  >
    <figure className="bg-white p-4 rounded-full w-16 h-16 mb-6
                    flex items-center justify-center">
      <Icon className="w-8 h-8 text-primary-400" />
    </figure>
    <h3 className="text-xl font-serif text-dark-800 mb-3">
      {title}
    </h3>
    <p className="text-dark-600 font-sans">
      {description}
    </p>
  </article>
);

export default ValuePropCard; 