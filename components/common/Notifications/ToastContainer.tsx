import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CustomToastContainer() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar
      closeButton={false}
      className="!mt-4"
      toastClassName="!bg-transparent !shadow-none !p-0 !min-h-0 !mb-4"
      bodyClassName="!p-0 !m-0"
      style={{ 
        width: 'auto',
        maxWidth: '400px'
      }}
    />
  );
} 