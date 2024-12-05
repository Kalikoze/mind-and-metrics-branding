'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { HiExclamationCircle, HiArrowRight } from 'react-icons/hi2';
import { usePhoneFormat } from '@/hooks/usePhoneFormat';
import { toast } from 'react-toastify';
import { CustomToast } from '@/components/common/Notifications/CustomToast';
import ScrambleButton from '@/components/common/ScrambleButton';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  subject: string;
  message: string;
  privacyPolicy: boolean;
}

export default function ContactForm() {
  const { handlePhoneChange } = usePhoneFormat();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted }
  } = useForm<ContactFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData: ContactFormData) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if response is ok and content-type is json
      const contentType = response.headers.get('content-type');
      if (!response.ok) {
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to send message');
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
        throw new Error(data.message || 'Unable to send message. Please try again.');
      }

      toast(() => CustomToast({
        type: 'success',
        message: 'Message Sent Successfully',
        description: data.message || 'We\'ll be in touch with you shortly.'
      }));

      reset({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        companyName: '',
        subject: '',
        message: '',
        privacyPolicy: false
      });

    } catch (error) {
      console.error('Error sending message:', error);
      toast(() => CustomToast({
        type: 'error',
        message: 'Failed to Send Message',
        description: error instanceof Error
          ? error.message
          : 'We\'re having trouble sending your message. Please try again or contact us directly.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 border-2 border-neutral-200
                    transition-all duration-300 hover:border-secondary-400
                    hover:shadow-lg"
      data-cy="contact-form"
    >
      <h2 className="font-serif text-4xl text-dark-800 mb-4"
        data-cy="contact-form-title"
      >
        Send Us a Message
      </h2>

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
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        aria-label="Contact information form"
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-secondary-400 mb-2" htmlFor="firstName">
              First Name *
            </label>
            <input
              id="firstName"
              {...register('firstName', { required: 'First name is required' })}
              className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                       focus:border-secondary-400 focus:outline-none transition-colors"
              placeholder="John"
              data-cy="input-first-name"
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
              id="lastName"
              {...register('lastName', { required: 'Last name is required' })}
              className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                       focus:border-secondary-400 focus:outline-none transition-colors"
              placeholder="Doe"
              data-cy="input-last-name"
            />
            {isSubmitted && errors.lastName && (
              <p className="mt-1 text-red-500 text-sm flex items-center" data-cy="error-lastName">
                <HiExclamationCircle className="w-4 h-4 mr-1" />
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-secondary-400 mb-2" htmlFor="email">
            Email *
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
            className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                     focus:border-secondary-400 focus:outline-none transition-colors"
            placeholder="john@example.com"
            data-cy="input-email"
          />
          {isSubmitted && errors.email && (
            <p className="mt-1 text-red-500 text-sm flex items-center" data-cy="error-email">
              <HiExclamationCircle className="w-4 h-4 mr-1" />
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-secondary-400 mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            {...register('phone', {
              validate: (value) => {
                if (value && !/^\(\d{3}\) \d{3}-\d{4}$/.test(value)) {
                  return 'Please enter a valid phone number';
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
        </div>

        <div>
          <label className="block text-secondary-400 mb-2" htmlFor="companyName">
            Company Name
          </label>
          <input
            id="companyName"
            {...register('companyName')}
            className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                     focus:border-secondary-400 focus:outline-none transition-colors"
            placeholder="Company Inc."
            data-cy="input-company"
          />
        </div>

        <div>
          <label className="block text-secondary-400 mb-2" htmlFor="subject">
            Subject *
          </label>
          <input
            id="subject"
            {...register('subject', { required: 'Subject is required' })}
            className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                     focus:border-secondary-400 focus:outline-none transition-colors"
            placeholder="How can we help?"
            data-cy="input-subject"
          />
          {isSubmitted && errors.subject && (
            <p className="mt-1 text-red-500 text-sm flex items-center" data-cy="error-subject">
              <HiExclamationCircle className="w-4 h-4 mr-1" />
              {errors.subject.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-secondary-400 mb-2" htmlFor="message">
            Message *
          </label>
          <textarea
            id="message"
            {...register('message', {
              required: 'Message is required',
              maxLength: { value: 500, message: 'Message is too long' }
            })}
            className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                     focus:border-secondary-400 focus:outline-none transition-colors"
            rows={4}
            placeholder="Tell us about your project or inquiry..."
            data-cy="input-message"
          />
          {isSubmitted && errors.message && (
            <p className="mt-1 text-red-500 text-sm flex items-center" data-cy="error-message">
              <HiExclamationCircle className="w-4 h-4 mr-1" />
              {errors.message.message}
            </p>
          )}
        </div>

        <div>
          <label className="flex items-start space-x-2">
            <input
              id="privacyPolicy"
              type="checkbox"
              {...register('privacyPolicy', {
                required: 'Please accept the privacy policy to proceed'
              })}
              className="mt-1 mr-2"
              data-cy="privacy-policy-checkbox"
            />
            <span className="text-sm text-secondary-500">
              I agree to the processing of my personal data according to the{' '}
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
                  className="text-secondary-400 underline"
                >
                  Privacy Policy
                </Link>
              </motion.div>
            </span>
          </label>
          {isSubmitted && errors.privacyPolicy && (
            <p className="mt-1 text-red-500 text-sm flex items-center" data-cy="error-privacyPolicy">
              <HiExclamationCircle className="w-4 h-4 mr-1" />
              {errors.privacyPolicy.message}
            </p>
          )}
        </div>

        <ScrambleButton
          text={isLoading ? "Sending..." : "Submit"}
          icon={HiArrowRight}
          variant="primary"
          type="submit"
          dataCy="submit-form"
          disabled={isLoading || (isSubmitted && Object.keys(errors).length > 0)}
          className="!w-full"
          isLoading={isLoading}
        />
      </form>
    </div>
  );
} 