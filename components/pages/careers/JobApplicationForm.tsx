'use client'

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { HiExclamationCircle, HiArrowRight, HiXMark, HiOutlineCloudArrowUp, HiOutlineDocumentText, HiArrowLeft } from 'react-icons/hi2';
import { usePhoneFormat } from '@/hooks/usePhoneFormat';
import { toast } from 'react-toastify';
import { CustomToast } from '@/components/common/Notifications/CustomToast';
import ScrambleButton from '@/components/common/ScrambleButton';
import type { Position } from '@/data/positions';
import { useDropzone } from 'react-dropzone';
import Link from 'next/link';

interface JobApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  linkedIn?: string;
  portfolio?: string;
  currentEmployer?: string;
  yearsExperience?: string;
  startDate: string;
  coverLetter: string;
  heardFrom: string;
  referralDetail?: string;
  resume: FileList;
  privacyPolicy: boolean;
}

interface JobApplicationFormProps {
  position: Position;
  onCancel: () => void;
}

const ResumeUpload = ({
  onChange,
  value,
  isSubmitted,
  error
}: {
  onChange: (files: File[]) => void;
  value: FileList | null;
  isSubmitted: boolean;
  error?: { message?: string };
}) => {
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 5000000, // 5MB
    multiple: false,
    onDrop: (acceptedFiles) => {
      onChange(acceptedFiles);
    }
  });

  return (
    <div>
      {!value || !value[0] ? (
        <>
          <div
            {...getRootProps()}
            data-cy="resume-dropzone"
            className={`border-2 border-dashed rounded-lg p-8 transition-all duration-300
              ${isDragActive
                ? 'border-secondary-400 bg-secondary-400/5 ring-2 ring-secondary-400 ring-opacity-20'
                : 'border-neutral-200 hover:border-secondary-400'}
              ${fileRejections.length > 0 || (isSubmitted && error) ? 'border-red-400 bg-red-50' : ''}`}
          >
            <input
              {...getInputProps()}
              data-cy="resume-input"
              id="resume-upload-input"
              aria-label="Upload resume file"
            />
            <div className="text-center">
              <HiOutlineCloudArrowUp className={`mx-auto h-12 w-12 transition-colors duration-300
                text-primary-400
                ${fileRejections.length > 0 ? 'text-red-400' : ''}`}
              />
              <p className="mt-2 text-sm text-dark-800">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="mt-1 text-xs text-dark-500">
                PDF, DOC, or DOCX up to 5MB
              </p>
            </div>
          </div>

          {fileRejections.length > 0 && fileRejections.map(({ errors }) => (
            <div key={errors[0].code} className="mt-2">
              {errors.map(error => (
                <p key={error.code} className="text-red-500 text-sm flex items-center" data-cy="resume-error">
                  <HiExclamationCircle className="w-4 h-4 mr-1" />
                  {error.code === 'file-invalid-type' && 'Please upload a PDF, DOC, or DOCX file'}
                  {error.code === 'file-too-large' && 'File is larger than 5MB'}
                </p>
              ))}
            </div>
          ))}

          {isSubmitted && error && fileRejections.length === 0 && (
            <p className="mt-1 text-red-500 text-sm flex items-center" data-cy="resume-error">
              <HiExclamationCircle className="w-4 h-4 mr-1" />
              {error.message}
            </p>
          )}
        </>
      ) : (
        <div
          className="flex items-center justify-between p-4 border rounded-lg bg-neutral-50"
          data-cy="resume-preview"
        >
          <div className="flex items-center">
            <HiOutlineDocumentText className="h-6 w-6 text-primary-400" />
            <span className="ml-2 text-sm text-dark-800" data-cy="resume-filename">
              {value[0].name}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-dark-800 mr-4" data-cy="resume-size">
              {(value[0].size / (1024 * 1024)).toFixed(2)} MB
            </span>
            <motion.button
              onClick={() => onChange([])}
              className="text-primary-400"
              data-cy="resume-remove"
              variants={{
                hover: {
                  y: -2,
                  transition: { type: "spring", stiffness: 400 }
                }
              }}
              whileHover="hover"
            >
              <HiXMark className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function JobApplicationForm({ position, onCancel }: JobApplicationFormProps) {
  const { handlePhoneChange } = usePhoneFormat();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    control,
    watch
  } = useForm<JobApplicationData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onCancel();
  };

  const onSubmit = async (formData: JobApplicationData) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'resume' && value[0]) {
          submitData.append('resume', value[0]);
        } else if (value !== undefined) {
          submitData.append(key, value.toString());
        }
      });
      submitData.append('positionId', position.id);

      const response = await fetch('/api/apply', {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit application');
      }

      toast(() => CustomToast({
        type: 'success',
        message: 'Application Submitted Successfully',
        description: "We'll review your application and get back to you soon."
      }));

      handleCancel();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast(() => CustomToast({
        type: 'error',
        message: 'Failed to Submit Application',
        description: error instanceof Error
          ? error.message
          : 'We\'re having trouble submitting your application. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 border-2 border-neutral-200
                    transition-all duration-300 hover:border-secondary-400
                    hover:shadow-lg"
      data-cy="job-application-form"
    >
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-serif text-4xl text-dark-800">
            Apply for {position.title}
          </h1>

          <motion.button
            onClick={handleCancel}
            className="text-primary-400 transition-colors"
            variants={{
              hover: {
                y: -2,
                transition: { type: "spring", stiffness: 400 }
              }
            }}
            whileHover="hover"
            aria-label="Close application form"
          >
            <HiXMark className="w-6 h-6" />
          </motion.button>
        </div>

        <h2 className="ml-1 text-dark-600 text-sm italic">
          Join our team and help shape the future of digital marketing
        </h2>
      </div>

      {/* Error Summary */}
      {isSubmitted && Object.keys(errors).length > 0 && (
        <div className="bg-red-50 rounded-lg mb-6" role="alert">
          <p className="text-red-500 font-medium mb-2">Please correct the following errors:</p>
          <ul className="list-disc list-inside text-sm text-red-500">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>{error.message}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-dark-800 mb-2" htmlFor="firstName">
              First Name *
            </label>
            <input
              {...register('firstName', { required: 'First name is required' })}
              id="firstName"
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
            <label className="block text-dark-800 mb-2" htmlFor="lastName">
              Last Name *
            </label>
            <input
              {...register('lastName', { required: 'Last name is required' })}
              id="lastName"
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

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-dark-800 mb-2" htmlFor="email">
              Email *
            </label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              id="email"
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
            <label className="block text-dark-800 mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              {...register('phone', {
                validate: (value) => {
                  if (value && !/^\(\d{3}\) \d{3}-\d{4}$/.test(value)) {
                    return 'Please enter a valid phone number';
                  }
                  return true;
                }
              })}
              id="phone"
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
              <p className="mt-1 text-red-500 text-sm flex items-center">
                <HiExclamationCircle className="w-4 h-4 mr-1" />
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Professional Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-dark-800 mb-2" htmlFor="linkedIn">
              LinkedIn Profile URL
            </label>
            <input
              {...register('linkedIn', {
                pattern: {
                  value: /^https?:\/\/(www\.)?linkedin\.com\/.*$/i,
                  message: 'Please enter a valid LinkedIn URL'
                }
              })}
              id="linkedIn"
              className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                       focus:border-secondary-400 focus:outline-none transition-colors"
              placeholder="https://linkedin.com/in/johndoe"
              data-cy="input-linkedin"
            />
            {isSubmitted && errors.linkedIn && (
              <p className="mt-1 text-red-500 text-sm flex items-center" data-cy="error-linkedin">
                <HiExclamationCircle className="w-4 h-4 mr-1" />
                {errors.linkedIn.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-dark-800 mb-2" htmlFor="portfolio">
              Portfolio URL
            </label>
            <input
              {...register('portfolio', {
                pattern: {
                  value: /^https?:\/\/(www\.)?([a-zA-Z0-9-]{2,}\.)+[a-zA-Z]{2,}(\/[\w-./?%&=]*)?$/,
                  message: 'Please enter a valid URL (must start with http:// or https://)'
                }
              })}
              id="portfolio"
              className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                       focus:border-secondary-400 focus:outline-none transition-colors"
              placeholder="https://yourportfolio.com"
              data-cy="input-portfolio"
            />
            {isSubmitted && errors.portfolio && (
              <p className="mt-1 text-red-500 text-sm flex items-center">
                <HiExclamationCircle className="w-4 h-4 mr-1" />
                {errors.portfolio.message}
              </p>
            )}
          </div>
        </div>

        {/* Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-dark-800 mb-2" htmlFor="currentEmployer">
              Current/Most Recent Employer
            </label>
            <input
              {...register('currentEmployer')}
              id="currentEmployer"
              className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                       focus:border-secondary-400 focus:outline-none transition-colors"
              placeholder="Company Name"
              data-cy="input-employer"
            />
          </div>

          <div>
            <label className="block text-dark-800 mb-2" htmlFor="yearsExperience">
              Years of Relevant Experience
            </label>
            <input
              {...register('yearsExperience', {
                validate: (value) => {
                  if (!value) return true; // Optional field
                  const numValue = Number(value);
                  if (isNaN(numValue) || numValue < 0) {
                    return 'Please enter a valid number of years';
                  }
                  return true;
                }
              })}
              id="yearsExperience"
              type="number"
              min="0"
              step="1"
              className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                       focus:border-secondary-400 focus:outline-none transition-colors"
              placeholder="5"
              data-cy="input-experience"
              onKeyDown={(e) => {
                if (['e', 'E', '+', '-', '.'].includes(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            {isSubmitted && errors.yearsExperience && (
              <p className="mt-1 text-red-500 text-sm flex items-center" data-cy="error-experience">
                <HiExclamationCircle className="w-4 h-4 mr-1" />
                {errors.yearsExperience.message}
              </p>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <label className="block text-dark-800 mb-2" htmlFor="startDate">
            Earliest Available Start Date *
          </label>
          <input
            {...register('startDate', {
              required: 'Start date is required',
              validate: (value) => {
                const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
                return value >= today || 'Please select today or a future date';
              }
            })}
            id="startDate"
            type="date"
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                     focus:border-secondary-400 focus:outline-none transition-colors"
            data-cy="input-start-date"
          />
          {isSubmitted && errors.startDate && (
            <p className="mt-1 text-red-500 text-sm flex items-center" data-cy="error-start-date">
              <HiExclamationCircle className="w-4 h-4 mr-1" />
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-dark-800 mb-2" htmlFor="coverLetter">
            Cover Letter (Recommended)
          </label>
          <textarea
            {...register('coverLetter', {
              minLength: { value: 100, message: 'If providing a cover letter, it should be at least 100 characters' }
            })}
            id="coverLetter"
            className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                     focus:border-secondary-400 focus:outline-none transition-colors"
            rows={6}
            placeholder="Tell us why you're interested in this position and what makes you a great fit..."
            data-cy="input-cover-letter"
          />
          {isSubmitted && errors.coverLetter && (
            <p className="mt-1 text-red-500 text-sm flex items-center" data-cy="error-cover-letter">
              <HiExclamationCircle className="w-4 h-4 mr-1" />
              {errors.coverLetter.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-dark-800 mb-2" htmlFor="heardFrom">
            How did you hear about this position?
          </label>
          <select
            {...register('heardFrom')}
            id="heardFrom"
            className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                       focus:border-secondary-400 focus:outline-none transition-colors"
            data-cy="input-heard-from"
          >
            <option value="">Select an option</option>
            <option value="linkedin">LinkedIn</option>
            <option value="indeed">Indeed</option>
            <option value="company-website">Company Website</option>
            <option value="referral">Employee Referral</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Add the conditional referral detail input */}
        {watch('heardFrom') === 'referral' && (
          <div>
            <label className="block text-dark-800 mb-2" htmlFor="referralDetail">
              Who referred you?
            </label>
            <input
              {...register('referralDetail')}
              id="referralDetail"
              className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                        focus:border-secondary-400 focus:outline-none transition-colors"
              placeholder="Name of person who referred you"
              data-cy="input-referral-detail"
            />
          </div>
        )}

        {watch('heardFrom') === 'other' && (
          <div>
            <label className="block text-dark-800 mb-2" htmlFor="referralDetail">
              Please specify
            </label>
            <input
              {...register('referralDetail')}
              id="referralDetail"
              className="w-full px-4 py-2 border-2 border-neutral-200 rounded-lg 
                        focus:border-secondary-400 focus:outline-none transition-colors"
              placeholder="Please specify"
              data-cy="input-referral-detail"
            />
          </div>
        )}

        <div>
          <label className="block text-dark-800 mb-2" htmlFor="resume" data-cy="resume-upload">
            Resume * (PDF, DOC, or DOCX)
          </label>
          <Controller
            control={control}
            name="resume"
            rules={{
              required: 'Resume is required'
            }}
            render={({ field: { onChange, value } }) => (
              <ResumeUpload
                onChange={onChange}
                value={value}
                isSubmitted={isSubmitted}
                error={errors.resume}
              />
            )}
          />
        </div>

        {/* Privacy Policy */}
        <div>
          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              {...register('privacyPolicy', {
                required: 'You must accept the privacy policy to proceed'
              })}
              id="privacyPolicy"
              className="mt-1 mr-2"
              data-cy="privacy-policy-checkbox"
            />
            <span className="text-sm text-dark-600">
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
            <p className="mt-1 text-red-500 text-sm flex items-center">
              <HiExclamationCircle className="w-4 h-4 mr-1" />
              {errors.privacyPolicy.message}
            </p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-6">
          <ScrambleButton
            text="Cancel"
            href="#"
            icon={HiArrowLeft}
            variant="secondary"
            dataCy="cancel-button"
            onClick={handleCancel}
          />

          <ScrambleButton
            text={isLoading ? "Sending..." : "Submit"}
            href="#"
            icon={HiArrowRight}
            variant="primary"
            dataCy="submit-button"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading || (isSubmitted && Object.keys(errors).length > 0)}
          />
        </div>
      </form>
    </div>
  );
}