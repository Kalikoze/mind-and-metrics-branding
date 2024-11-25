import { privacySections, sectionIcons } from '@/data/privacy-policy';
import PrivacySection from '@/components/pages/privacy-policy/PrivacySection';
import QuestionsSection from '@/components/pages/privacy-policy/QuestionsSection';

const PrivacyContent = () => {
  return (
    <div className="bg-white py-16" data-cy="privacy-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {privacySections.map((section) => {
            const Icon = sectionIcons[section.id];
            return <PrivacySection key={section.id} section={section} Icon={Icon} data-cy={`privacy-section-${section.id}`} />;
          })}
          <QuestionsSection />
        </div>
      </div>
    </div>
  );
};

export default PrivacyContent; 