interface ProcessStepItem {
  subtitle: string;
  description: string;
}

interface ProcessStepContentProps {
  title: string;
  items: ProcessStepItem[];
}

const ProcessStepContent = ({ title, items }: ProcessStepContentProps) => {
  return (
    <section className="bg-white rounded-lg border-2 border-neutral-200 p-8 min-h-[20rem]">
      <h3 className="text-2xl font-serif font-bold text-dark-800 mb-6" data-cy="step-content-title">
        {title}
      </h3>
      <ul className="grid md:grid-cols-2 gap-8">
        {items.map((item, index) => (
          <li
            key={index}
            data-cy={`step-content-item-${index}`}
            className="flex gap-4 items-start"
          >
            <span className="w-1 h-full bg-primary-200 rounded-full mt-2" aria-hidden="true" />
            <div>
              <h4 className="font-medium text-dark-800 mb-2" data-cy="item-subtitle">
                {item.subtitle}
              </h4>
              <p className="text-dark-600" data-cy="item-description">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProcessStepContent; 