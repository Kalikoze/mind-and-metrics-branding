import React from 'react';
import { 
  HiOutlinePuzzlePiece,
  HiOutlinePresentationChartLine,
  HiOutlineLightBulb,
  HiOutlineUserGroup,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineChatBubbleLeftRight
} from 'react-icons/hi2';

const culturePoints = [
  {
    icon: HiOutlinePuzzlePiece,
    title: "Know the Mission",
    description: "Preparation sets the foundation. Know the plan, gather the right tools, and start with focus and intention."
  },
  {
    icon: HiOutlinePresentationChartLine,
    title: "Resilient Adaptability",
    description: "Challenges will come - stay focused and keep moving forward. Progress is built through persistence."
  },
  {
    icon: HiOutlineLightBulb,
    title: "Be Willing to Fail",
    description: "Learn, adapt, and keep moving forward. We view failure as an opportunity to learn, grow, and continuously improve."
  },
  {
    icon: HiOutlineUserGroup,
    title: "Support the Team",
    description: "Help where you can. Strong teams deliver the best results by working together and communicating."
  },
  {
    icon: HiOutlineGlobeAsiaAustralia,
    title: "Be Respectful",
    description: "Respect time, ideas, and people. Listening and being courteous goes a long way in building trust."
  },
  {
    icon: HiOutlineChatBubbleLeftRight,
    title: "Communicate Clearly",
    description: "Keep the conversation flowing—with the team, yourself, and clients. Speak up, stay open, and make sure everyone's on the same page."
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
          <p className="text-secondary-500 text-lg mx-auto">
            Experience a workplace that values mission-driven teamwork, continuous learning, and clear communication
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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