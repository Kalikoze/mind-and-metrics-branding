import React from 'react';
import { culturePoints } from '@/data/culturePoints';

const WorkCulture = () => {
  return (
    <section className="bg-white py-24" data-cy="work-culture-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 className="font-serif text-4xl text-dark-800 mb-4">
            Our Culture
          </h2>
          <p className="text-dark-600 text-lg mx-auto">
            Experience a workplace that values mission-driven teamwork, continuous learning, and clear communication
          </p>
        </header>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {culturePoints.map((point, index) => (
            <li
              key={index}
              className="bg-neutral-50 rounded-lg p-8 border-2 border-neutral-200 flex flex-col items-center text-center"
              data-cy={`culture-point-${index}`}
            >
              <span className="bg-white p-4 rounded-full mb-6 border-2 border-neutral-200">
                <point.icon className="w-8 h-8 text-secondary-400" />
              </span>
              <h3 className="font-serif text-xl text-dark-800 mb-4">
                {point.title}
              </h3>
              <p className="text-dark-600">
                {point.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WorkCulture; 