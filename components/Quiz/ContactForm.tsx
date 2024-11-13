import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { HiArrowRight, HiExclamationCircle, HiArrowLeft } from 'react-icons/hi2';
import ScrambleText from '@/components/common/ScrambleText';
import { useState, useEffect } from 'react';
import { usePhoneFormat } from '@/hooks/usePhoneFormat';
import { toast } from 'react-toastify';
import { CustomToast } from '@/components/common/Notifications/CustomToast';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  preferredContact: 'email' | 'phone';
  message: string;
  privacyPolicy: boolean;
  referralSource: string;
  referralDetail?: string;
  bestTimeToContact: string;
}

interface ContactFormProps {
  answers: Record<string, string[]>;
  selectedBranches: string[];
  onSubmit: (data: ContactFormData) => void;
  onBack: () => void;
}

export default function ContactForm({ answers, selectedBranches, onSubmit, onBack }: ContactFormProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isBackHovering, setIsBackHovering] = useState(false);
  const { handlePhoneChange } = usePhoneFormat();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitted }
  } = useForm<ContactFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });
  const [isLoading, setIsLoading] = useState(false);

  const preferredContact = watch('preferredContact');

  useEffect(() => {
    if (isSubmitted) {
      trigger('phone');
      trigger('bestTimeToContact');
    }
  }, [preferredContact, trigger, isSubmitted]);

  const onSubmitForm = async (formData: ContactFormData) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const response = await fetch('/api/quiz-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers,
          selectedBranches,
          contactInfo: formData
        }),
      });

      // Check if response is ok and content-type is json
      const contentType = response.headers.get('content-type');
      if (!response.ok) {
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to submit form');
        } else {
          throw new Error('Our system is currently experiencing issues. Please try again in a few minutes.');
        }
      }

      // Ensure we have JSON response
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Received an invalid response from the server. Please try again.');
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Unable to submit form. Please try again.');
      }

      toast(() => CustomToast({
        type: 'success',
        message: 'Form Submitted Successfully',
        description: 'We\'ll be in touch with you shortly.'
      }));

      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast(() => CustomToast({
        type: 'error',
        message: 'Submission Failed',
        description: error instanceof Error
          ? error.message
          : 'We\'re having trouble submitting your form. Please try again or contact support if the issue persists.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm w-full">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-secondary-400 mb-4">
          Almost There!
        </h1>
        <h2 className="text-secondary-500/80 text-sm italic">
          Share your contact details to receive your customized growth strategy. We&apos;ll only use your information to discuss this quote.
        </h2>
      </div>

      {isSubmitted && Object.keys(errors).length > 0 && (
        <div
          className="p-4 bg-red-50 rounded-lg mb-6"
          role="alert"
          data-cy="error-summary"
        >
          <p className="text-red-500 font-medium mb-2">Please correct the following errors:</p>
          <ul className="list-disc list-inside text-sm text-red-500">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field} data-cy={`error-summary-${field}`}>{error.message}</li>
            ))}
          </ul>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="space-y-8"
        aria-label="Contact information form"
        data-cy="contact-form"
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <label className="block text-secondary-400 mb-2" htmlFor="firstName">
              First Name *
            </label>
            <input
              {...register('firstName', {
                required: 'First name is required',
                maxLength: { value: 20, message: 'First name is too long' }
              })}
              data-cy="input-first-name"
              className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                       focus:border-secondary-400 focus:outline-none transition-colors"
              placeholder="John"
            />
            {isSubmitted && errors.firstName && (
              <p className="mt-1 text-red-500 text-sm flex items-center" data-cy="error-firstName">
                <HiExclamationCircle className="w-4 h-4 mr-1" />
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-secondary-400 mb-2" htmlFor="lastName">
              Last Name *
            </label>
            <input
              {...register('lastName', {
                required: 'Last name is required',
                maxLength: { value: 20, message: 'Last name is too long' }
              })}
              data-cy="input-last-name"
              className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                       focus:border-secondary-400 focus:outline-none transition-colors"
              placeholder="Doe"
            />
            {isSubmitted && errors.lastName && (
              <p className="mt-1 text-red-500 text-sm flex items-center" data-cy="error-lastName">
                <HiExclamationCircle className="w-4 h-4 mr-1" />
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-secondary-400 mb-2" htmlFor="companyName">
              Company Name
            </label>
            <input
              {...register('companyName')}
              data-cy="input-company"
              className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                       focus:border-secondary-400 focus:outline-none transition-colors"
              placeholder="Company Inc."
            />
          </div>

          <div>
            <label className="block text-secondary-400 mb-2" htmlFor="email">
              Email Address *
            </label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              data-cy="input-email"
              className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                       focus:border-secondary-400 focus:outline-none transition-colors"
              placeholder="john@example.com"
            />
            {isSubmitted && errors.email && (
              <p className="mt-1 text-red-500 text-sm flex items-center" data-cy="error-email">
                <HiExclamationCircle className="w-4 h-4 mr-1" />
                {errors.email.message}
              </p>
            )}
            <p className="text-xs text-secondary-500/80 mt-1">For quote-related communications only</p>
          </div>

          <div>
            <label className="block text-secondary-400 mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              {...register('phone', {
                validate: (value) => {
                  if (preferredContact === 'phone') {
                    if (!value) return 'Phone number is required when phone is selected as contact method';
                    if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(value)) return 'Please enter a valid phone number';
                  }
                  return true;
                }
              })}
              onChange={(e) => {
                handlePhoneChange(e);
                register('phone').onChange(e);
              }}
              className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                       focus:border-secondary-400 focus:outline-none transition-colors"
              placeholder="(555) 555-5555"
              maxLength={14}
              data-cy="input-phone"
            />
            {isSubmitted && errors.phone && (
              <p className="mt-1 text-red-500 text-sm flex items-center" data-cy="error-phone">
                <HiExclamationCircle className="w-4 h-4 mr-1" />
                {errors.phone.message}
              </p>
            )}
            <p className="text-xs text-secondary-500/80 mt-1">By providing your number, you agree to receive messages about your quote</p>
          </div>

          <div>
            <label className="block text-secondary-400 mb-2" htmlFor="bestTimeToContact">
              Best Time to Contact {preferredContact === 'phone' && '*'}
            </label>
            <select
              id="bestTimeToContact"
              {...register('bestTimeToContact', {
                validate: (value) => {
                  if (preferredContact === 'phone' && !value) {
                    return 'Please select your preferred contact time';
                  }
                  return true;
                }
              })}
              className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                       focus:border-secondary-400 focus:outline-none transition-colors"
            >
              <option value="">Please select...</option>
              <option value="morning">Morning (8am - 12pm)</option>
              <option value="afternoon">Afternoon (12pm - 4pm)</option>
            </select>
            {isSubmitted && errors.bestTimeToContact && (
              <p className="mt-1 text-red-500 text-sm flex items-center" data-cy="error-bestTimeToContact">
                <HiExclamationCircle className="w-4 h-4 mr-1" />
                {errors.bestTimeToContact.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-secondary-400 mb-2">
            Preferred Contact Method *
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                {...register('preferredContact', { required: 'Please select a contact method' })}
                value="email"
                className="mr-2"
                data-cy="input-preferred-contact-email"
              />
              Email
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                {...register('preferredContact', { required: 'Please select a contact method' })}
                value="phone"
                className="mr-2"
                data-cy="input-preferred-contact-phone"
              />
              Phone
            </label>
          </div>
          {isSubmitted && errors.preferredContact && (
            <p className="mt-1 text-red-500 text-sm flex items-center" data-cy="error-preferredContact">
              <HiExclamationCircle className="w-4 h-4 mr-1" />
              {errors.preferredContact.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-secondary-400 mb-2" htmlFor="message">
            Additional Comments
          </label>
          <textarea
            {...register('message', {
              maxLength: { value: 500, message: 'Message is too long' }
            })}
            className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                     focus:border-secondary-400 focus:outline-none transition-colors"
            rows={4}
            placeholder="Any specific requirements or questions..."
          />
          {isSubmitted && errors.message && (
            <p className="mt-1 text-red-500 text-sm flex items-center">
              <HiExclamationCircle className="w-4 h-4 mr-1" />
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-secondary-400 mb-2" htmlFor="referralSource">
              How did you hear about us?
            </label>
            <select
              id="referralSource"
              {...register('referralSource')}
              className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                       focus:border-secondary-400 focus:outline-none transition-colors"
            >
              <option value="">Please select...</option>
              <option value="google">Google Search</option>
              <option value="referral">Personal Referral</option>
              <option value="linkedin">LinkedIn</option>
              <option value="facebook">Facebook</option>
              <option value="twitter">Twitter</option>
              <option value="instagram">Instagram</option>
              <option value="other">Other</option>
            </select>
          </div>

          {watch('referralSource') === 'referral' && (
            <div>
              <label className="block text-secondary-400 mb-2" htmlFor="referralDetail">
                Who referred you?
              </label>
              <input
                {...register('referralDetail')}
                className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                         focus:border-secondary-400 focus:outline-none transition-colors"
                placeholder="Name of person who referred you"
              />
            </div>
          )}

          {watch('referralSource') === 'other' && (
            <div>
              <label className="block text-secondary-400 mb-2" htmlFor="referralDetail">
                Please specify
              </label>
              <input
                {...register('referralDetail')}
                className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                         focus:border-secondary-400 focus:outline-none transition-colors"
                placeholder="Please specify"
              />
            </div>
          )}
        </div>

        <div className="mt-6">
          <label className="flex items-start">
            <input
              type="checkbox"
              data-cy="privacy-policy-checkbox"
              {...register('privacyPolicy', {
                required: 'Please accept the privacy policy to proceed'
              })}
              className="mt-1 mr-2"
            />
            <span className="text-sm text-secondary-500">
              I agree to the <a href="/privacy" className="text-secondary-400 hover:underline">Privacy Policy</a> and understand that:
              <ul className="mt-2 ml-4 list-disc">
                <li>My information will only be used to process my quote request</li>
                <li>I can request access to my data at any time</li>
                <li>I can withdraw my consent by contacting support</li>
              </ul>
            </span>
          </label>
          {isSubmitted && errors.privacyPolicy && (
            <p className="mt-1 text-red-500 text-sm flex items-center" data-cy="error-privacyPolicy">
              <HiExclamationCircle className="w-4 h-4 mr-1" />
              {errors.privacyPolicy.message}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center pt-6">
          <motion.button
            type="button"
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setIsBackHovering(true)}
            onMouseLeave={() => setIsBackHovering(false)}
            className="px-8 py-3.5 bg-transparent text-secondary-400 font-medium
                     rounded-lg flex items-center space-x-2 border-2 border-secondary-400
                     transition-all duration-300 hover:bg-secondary-400 hover:text-white"
          >
            <HiArrowLeft className="w-5 h-5 shrink-0" />
            <span className="w-[140px] text-center">
              <ScrambleText text="Back to Summary" isHovering={isBackHovering} />
            </span>
          </motion.button>

          <motion.button
            type="submit"
            data-cy="submit-form"
            disabled={isLoading || (isSubmitted && Object.keys(errors).length > 0)}
            whileHover={!isLoading && (!isSubmitted || Object.keys(errors).length === 0) ? { scale: 1.05 } : undefined}
            whileTap={!isLoading && (!isSubmitted || Object.keys(errors).length === 0) ? { scale: 0.95 } : undefined}
            className={`px-8 py-3 font-medium rounded-lg flex items-center space-x-3 border-2
                     transition-all duration-300 ${isLoading || (isSubmitted && Object.keys(errors).length > 0)
                ? 'bg-transparent text-neutral-300 border-neutral-300 cursor-not-allowed'
                : 'bg-secondary-400 text-white border-secondary-400 hover:bg-transparent hover:text-secondary-400'
              }`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span className="w-[80px] text-center relative">
              <ScrambleText
                text={isLoading ? "Sending..." : "Submit"}
                isHovering={isHovering && !isLoading && (!isSubmitted || Object.keys(errors).length === 0)}
              />
            </span>
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-neutral-300 border-t-transparent rounded-full animate-spin" />
            ) : (
              <HiArrowRight className="w-5 h-5 shrink-0" />
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
} 