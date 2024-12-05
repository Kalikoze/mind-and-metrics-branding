import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { HiArrowRight, HiExclamationCircle, HiArrowLeft } from 'react-icons/hi2';
import { useState, useEffect } from 'react';
import { usePhoneFormat } from '@/hooks/usePhoneFormat';
import { toast } from 'react-toastify';
import { CustomToast } from '@/components/common/Notifications/CustomToast';
import Link from 'next/link';
import MotionScrambleButton from '@/components/common/MotionScrambleButton';

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
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg p-8 border-2 border-neutral-200 
                transition-all duration-300 hover:border-secondary-400 
                hover:shadow-lg w-full"
    >
      <div className="mb-8">
        <h1 className="font-serif text-4xl text-dark-800 mb-4">
          Almost There!
        </h1>
        <h2 className="text-dark-600 text-sm italic">
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
            <label className="block text-dark-800 mb-2" htmlFor="firstName">
              First Name *
            </label>
            <input
              id="firstName"
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
            <label className="block text-dark-800 mb-2" htmlFor="lastName">
              Last Name *
            </label>
            <input
              id="lastName"
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
            <label className="block text-dark-800 mb-2" htmlFor="companyName">
              Company Name
            </label>
            <input
              id="companyName"
              {...register('companyName')}
              data-cy="input-company"
              className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                       focus:border-secondary-400 focus:outline-none transition-colors"
              placeholder="Company Inc."
            />
          </div>

          <div>
            <label className="block text-dark-800 mb-2" htmlFor="email">
              Email Address *
            </label>
            <input
              id="email"
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
            <p className="text-xs text-dark-600 mt-1">For quote-related communications only</p>
          </div>

          <div>
            <label className="block text-dark-800 mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
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
            <p className="text-xs text-dark-600 mt-1">By providing your number, you agree to receive messages about your quote</p>
          </div>

          <div>
            <label className="block text-dark-800 mb-2" htmlFor="bestTimeToContact">
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
          <label className="block text-dark-800 mb-2">
            Preferred Contact Method *
          </label>
          <div className="flex gap-4">
            <label className="flex items-center" htmlFor="preferredContact-email">
              <input
                type="radio"
                id="preferredContact-email"
                {...register('preferredContact', { required: 'Please select a contact method' })}
                value="email"
                className="mr-2"
                data-cy="input-preferred-contact-email"
              />
              Email
            </label>
            <label className="flex items-center" htmlFor="preferredContact-phone">
              <input
                type="radio"
                id="preferredContact-phone"
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
          <label className="block text-dark-800 mb-2" htmlFor="message">
            Additional Comments
          </label>
          <textarea
            id="message"
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
            <label className="block text-dark-800 mb-2" htmlFor="referralSource">
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
              <label className="block text-dark-800 mb-2" htmlFor="referralDetail">
                Who referred you?
              </label>
              <input
                id="referralDetail"
                {...register('referralDetail')}
                className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                         focus:border-secondary-400 focus:outline-none transition-colors"
                placeholder="Name of person who referred you"
              />
            </div>
          )}

          {watch('referralSource') === 'other' && (
            <div>
              <label className="block text-dark-800 mb-2" htmlFor="referralDetail">
                Please specify
              </label>
              <input
                id="referralDetail"
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
            <span className="text-sm text-dark-600">
              I agree to the{' '}
              <motion.div
                className="inline-block"
                variants={{
                  hover: {
                    y: -2,
                    transition: { type: "spring", stiffness: 400 }
                  }
                }}
                whileHover="hover"
              >
                <Link 
                  href="/privacy-policy" 
                  className="text-secondary-400 hover:underline"
                >
                  Privacy Policy
                </Link>
              </motion.div>
              {' '}and understand that:
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

        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-6">
          <MotionScrambleButton
            text="Back to Summary"
            icon={HiArrowLeft}
            variant="secondary"
            onClick={onBack}
            dataCy="back-button"
            disabled={isLoading}
            spanWidth="140px"
          />

          <MotionScrambleButton
            text={isLoading ? "Sending..." : "Submit"}
            icon={HiArrowRight}
            variant="primary"
            onClick={handleSubmit(onSubmitForm)}
            dataCy="submit-form"
            disabled={isLoading || (isSubmitted && Object.keys(errors).length > 0)}
            spanWidth="80px"
          />
        </div>
      </form>
    </motion.div>
  );
}