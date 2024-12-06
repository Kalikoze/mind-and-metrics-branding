interface ProcessStepButtonProps {
  index: number;
  title: string;
  isActive: boolean;
  isProgressLine: boolean;
  onClick: () => void;
  showConnector?: boolean;
}

const ProcessStepButton = ({ index, title, isActive, isProgressLine, onClick, showConnector }: ProcessStepButtonProps) => {
  return (
    <li className="flex flex-col items-center relative">
      {showConnector && (
        <span
          data-cy={`process-step-connector-${index}`}
          className="absolute w-full"
          style={{
            left: '50%',
            top: '1.5rem',
            height: '2px',
            zIndex: 0
          }}
          aria-hidden="true"
        >
          <span
            className="absolute h-full bg-primary-400 transition-all duration-300"
            style={{
              width: isProgressLine ? '100%' : '0%',
              left: '0%'
            }}
          />
        </span>
      )}

      <button
        data-cy={`process-step-button-${index}`}
        onClick={onClick}
        aria-current={isActive ? 'step' : undefined}
        className={`
          w-12 h-12 rounded-full 
          flex items-center justify-center
          transition-all duration-300
          relative z-10
          ${isActive
            ? 'bg-primary-400 text-white shadow-lg'
            : 'bg-white text-primary-400 border-2 border-primary-200 hover:border-primary-400'
          }
        `}
      >
        <span className="font-serif text-xl font-bold">{index + 1}</span>
      </button>

      <span
        data-cy={`process-step-title-${index}`}
        aria-hidden="true"
        className={`
          mt-4 text-sm font-medium text-center hidden md:block
          transition-colors duration-300
          ${isActive ? 'text-primary-400' : 'text-dark-600'}
        `}
      >
        {title}
      </span>
    </li>
  );
};

export default ProcessStepButton; 