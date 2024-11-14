import React from 'react';
import { 
  HiOutlineLightBulb,
  HiOutlineUserGroup,
  HiOutlinePresentationChartLine,
  HiOutlineHeart
} from 'react-icons/hi2';

const culturePoints = [
  {
    icon: HiOutlineLightBulb,
    title: "Innovation First",
    description: "We encourage creative thinking and welcome fresh perspectives. Every team member has the opportunity to contribute ideas and shape our approach to client solutions."
  },
  {
    icon: HiOutlineUserGroup,
    title: "Collaborative Spirit",
    description: "Our success is built on teamwork. We foster an environment where knowledge sharing and cross-functional collaboration drive exceptional results."
  },
  {
    icon: HiOutlinePresentationChartLine,
    title: "Growth Mindset",
    description: "We invest in our team's professional development through mentorship, training programs, and opportunities to work with cutting-edge technologies."
  },
  {
    icon: HiOutlineHeart,
    title: "Work-Life Balance",
    description: "We believe in flexible scheduling, remote work options, and creating an environment that supports both professional excellence and personal well-being."
  }
];

const WorkCulture = () => {
  return (
    <section className="bg-white py-24" data-cy="work-culture-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-secondary-400 mb-4">
            Our Culture
          </h2>
          <p className="text-secondary-500 text-lg max-w-2xl mx-auto">
            Experience a workplace that values creativity, growth, and well-being
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {culturePoints.map((point, index) => (
            <div
              key={index}
              className="bg-neutral-50 rounded-lg p-8 border-2 border-neutral-200"
              data-cy={`culture-point-${index}`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-white p-4 rounded-full mb-6 border-2 border-neutral-200">
                  <point.icon className="w-8 h-8 text-secondary-400" />
                </div>
                <h3 className="font-serif text-xl text-secondary-400 mb-4">
                  {point.title}
                </h3>
                <p className="text-secondary-500">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkCulture; 