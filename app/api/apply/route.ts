import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { positions } from '@/data/positions';

const isProduction = process.env.VERCEL_ENV === 'production';

const apiKey = isProduction ? process.env.PRODUCTION_SENDGRID_API_KEY : process.env.STAGING_SENDGRID_API_KEY;
const receiverEmail = isProduction ? process.env.PRODUCTION_RECEIVER_EMAIL : process.env.STAGING_RECEIVER_EMAIL;
const receiverEmailCC = isProduction ? process.env.PRODUCTION_RECEIVER_EMAIL_CC : process.env.STAGING_RECEIVER_EMAIL_CC;
const senderEmail = isProduction ? process.env.PRODUCTION_SENDER_EMAIL : process.env.STAGING_SENDER_EMAIL;

if (!apiKey) {
  throw new Error('SENDGRID_API_KEY environment variable is not set');
}

sgMail.setApiKey(apiKey);

interface JobApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  linkedIn?: string;
  portfolio?: string;
  currentEmployer?: string;
  yearsExperience: string;
  startDate: string;
  coverLetter?: string;
  heardFrom: string;
  referralDetail?: string;
  positionId: string;
  resume: File;
  privacyPolicy: boolean;
}

function validateJobApplication(data: JobApplicationData, resume?: File) {
  const errors: Record<string, string> = {};

  if (!data.firstName?.trim()) {
    errors.firstName = 'First name is required';
  } else if (data.firstName.length > 50) {
    errors.firstName = 'First name must be less than 50 characters';
  }

  if (!data.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  } else if (data.lastName.length > 50) {
    errors.lastName = 'Last name must be less than 50 characters';
  }

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!data.email?.trim()) {
    errors.email = 'Email address is required';
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
  if (data.phone && !phoneRegex.test(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  const linkedInRegex = /^https?:\/\/(www\.)?linkedin\.com\/.*$/i;
  if (data.linkedIn && !linkedInRegex.test(data.linkedIn)) {
    errors.linkedIn = 'Please enter a valid LinkedIn URL';
  }

  const portfolioRegex = /^https?:\/\/(www\.)?([a-zA-Z0-9-]{2,}\.)+[a-zA-Z]{2,}(\/[\w-./?%&=]*)?$/;
  if (data.portfolio && !portfolioRegex.test(data.portfolio)) {
    errors.portfolio = 'Please enter a valid portfolio URL';
  }

  if (!data.yearsExperience) {
    errors.yearsExperience = 'Years of experience is required';
  } else if (isNaN(Number(data.yearsExperience)) || Number(data.yearsExperience) < 0) {
    errors.yearsExperience = 'Please enter a valid number of years';
  }

  if (!data.startDate) {
    errors.startDate = 'Start date is required';
  } else {
    const selectedDate = new Date(data.startDate);
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 14);
    if (selectedDate < minDate) {
      errors.startDate = 'Start date must be at least 2 weeks from today';
    }
  }

  if (data.coverLetter && data.coverLetter.length < 100) {
    errors.coverLetter = 'If providing a cover letter, it should be at least 100 characters';
  }

  if (!data.positionId || !positions.some(p => p.id === data.positionId)) {
    errors.positionId = 'Invalid position selected';
  }

  if (!resume) {
    errors.resume = 'Resume is required';
  } else {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(resume.type)) {
      errors.resume = 'Please upload a PDF, DOC, or DOCX file';
    }
    if (resume.size > 5000000) { // 5MB
      errors.resume = 'File size must be less than 5MB';
    }
  }

  if (!data.privacyPolicy) {
    errors.privacyPolicy = 'You must accept the privacy policy to proceed';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export async function POST(request: Request) {
  try {
    if (!receiverEmail || !receiverEmailCC || !senderEmail) {
      console.error('Server configuration error: Email addresses are not set');
      return NextResponse.json(
        {
          success: false,
          message: 'We\'re experiencing technical difficulties. Please try again later or contact support.'
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const resume = formData.get('resume') as File;
    const data = Object.fromEntries(formData.entries()) as unknown as JobApplicationData;

    const validation = validateJobApplication(data, resume);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please review and correct the highlighted fields.',
          errors: validation.errors
        },
        { status: 400 }
      );
    }

    const position = positions.find(p => p.id === data.positionId);
    if (!position) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid position selected'
        },
        { status: 400 }
      );
    }

    const buffer = await resume.arrayBuffer();
    const base64Resume = Buffer.from(buffer).toString('base64');

    const msg = {
      to: receiverEmail,
      cc: receiverEmailCC,
      from: {
        email: senderEmail,
        name: 'Mind & Metrics Careers'
      },
      subject: `New Job Application: ${position.title}`,
      templateId: 'd-f491e22b32264c7ab3e330b702a2a9ce',
      dynamic_template_data: {
        timestamp: new Date().toLocaleString('en-US', {
          timeZone: 'America/Chicago',
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        position: position.title,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || 'Not provided',
        linkedIn: data.linkedIn || 'Not provided',
        portfolio: data.portfolio || 'Not provided',
        currentEmployer: data.currentEmployer || 'Not provided',
        yearsExperience: `${data.yearsExperience} years`,
        startDate: new Date(data.startDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        coverLetter: data.coverLetter || 'Not provided',
        heardFrom: data.heardFrom,
        referralDetail: data.referralDetail
      },
      attachments: [
        {
          content: base64Resume,
          filename: resume.name,
          type: resume.type,
          disposition: 'attachment'
        }
      ]
    };

    try {
      await sgMail.send(msg);
      return NextResponse.json({
        success: true,
        message: 'Your application has been submitted successfully. We\'ll review it and get back to you soon!'
      });
    } catch (error) {
      console.error('SendGrid error:', error);
      return NextResponse.json(
        {
          success: false,
          message: 'We\'re having trouble processing your application. Please try again in a few minutes or contact us directly.'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error processing job application:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong while processing your application. Please try again or contact us directly.'
      },
      { status: 500 }
    );
  }
} 