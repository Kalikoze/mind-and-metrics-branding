interface CustomToastProps {
  type: 'success' | 'error';
  message: string;
  description?: string;
}

export const CustomToast = ({ type, message, description }: CustomToastProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex items-start">
      <div className="shrink-0 mr-3 pt-1">
        {type === 'success' ? (
          <div className="w-5 h-5 text-primary-400">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        ) : (
          <div className="w-5 h-5 text-red-500">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      <div>
        <div className="font-medium text-dark-800 mb-1">{message}</div>
        <div className="text-sm text-dark-500">{description}</div>
      </div>
    </div>
  );
}; 