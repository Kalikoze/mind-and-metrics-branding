import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { getQuestionById, calculateInvestmentRange, getOptionLabel } from '@/utils/quiz/calculations';

const isProduction = process.env.VERCEL_ENV === 'production';

const apiKey = isProduction ? process.env.PRODUCTION_SENDGRID_API_KEY : process.env.STAGING_SENDGRID_API_KEY;
const receiverEmail = isProduction ? process.env.PRODUCTION_RECEIVER_EMAIL : process.env.STAGING_RECEIVER_EMAIL;
const receiverEmailCC = isProduction ? process.env.PRODUCTION_RECEIVER_EMAIL_CC : process.env.STAGING_RECEIVER_EMAIL_CC;
const senderEmail = isProduction ? process.env.PRODUCTION_SENDER_EMAIL : process.env.STAGING_SENDER_EMAIL;

if (!apiKey) {
  throw new Error('SENDGRID_API_KEY environment variable is not set');
}

sgMail.setApiKey(apiKey);

function formatQuizAnswers(answers: Record<string, string[]>, selectedBranches: string[]) {
  return Object.entries(answers).map(([questionId, selectedValues]) => {
    const question = getQuestionById(questionId, selectedBranches);
    if (!question) return null;

    const formattedAnswers = selectedValues.map(value => getOptionLabel(question, value));

    return {
      question: question.text,
      answers: formattedAnswers
    };
  }).filter(Boolean);
}

function formatInvestmentRange(answers: Record<string, string[]>, selectedBranches: string[]) {
  const range = calculateInvestmentRange(answers, selectedBranches);
  return {
    initial: {
      min: range.initial.min.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }),
      max: range.initial.max.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })
    },
    monthly: {
      min: range.monthly.min.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }),
      max: range.monthly.max.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })
    }
  };
}

interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  preferredContact: 'email' | 'phone';
  message?: string;
  privacyPolicy: boolean;
  referralSource?: string;
  referralDetail?: string;
  bestTimeToContact?: string;
}

function validateContactInfo(contactInfo: ContactInfo) {
  const errors: Record<string, string> = {};

  if (!contactInfo.firstName?.trim()) {
    errors.firstName = 'First name is required';
  } else if (contactInfo.firstName.length > 20) {
    errors.firstName = 'First name is too long';
  }

  if (!contactInfo.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  } else if (contactInfo.lastName.length > 20) {
    errors.lastName = 'Last name is too long';
  }

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!contactInfo.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(contactInfo.email)) {
    errors.email = 'Invalid email address';
  }

  const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
  if (contactInfo.preferredContact === 'phone') {
    if (!contactInfo.phone?.trim()) {
      errors.phone = 'Phone number is required when phone is selected as contact method';
    } else if (!phoneRegex.test(contactInfo.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!contactInfo.bestTimeToContact) {
      errors.bestTimeToContact = 'Please select your preferred contact time';
    }
  }

  if (!contactInfo.privacyPolicy) {
    errors.privacyPolicy = 'Please accept the privacy policy to proceed';
  }

  if (contactInfo.message && contactInfo.message.length > 500) {
    errors.message = 'Message is too long';
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
      return NextResponse.json({ error: 'We\'re experiencing technical difficulties. Please try again later or contact support.' }, { status: 500 });
    }

    const data = await request.json();
    const { answers, selectedBranches, contactInfo } = data;

    if (!answers || !selectedBranches || !contactInfo) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please ensure all required information is provided before submitting.' 
        },
        { status: 400 }
      );
    }

    const validation = validateContactInfo(contactInfo);
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

    const formattedAnswers = formatQuizAnswers(answers, selectedBranches);
    const investmentRange = formatInvestmentRange(answers, selectedBranches);

    const msg = {
      to: receiverEmail,
      cc: receiverEmailCC,
      from: {
        email: senderEmail,
        name: 'Mind & Metrics Branding'
      },
      subject: `New Growth Strategy Request from ${contactInfo.firstName} ${contactInfo.lastName}`,
      templateId: 'd-c54f896f3d294ce1b3808434b7a57775',
      dynamic_template_data: {
        timestamp: new Date().toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        firstName: contactInfo.firstName,
        lastName: contactInfo.lastName,
        email: contactInfo.email,
        phone: contactInfo.phone,
        companyName: contactInfo.companyName,
        preferredContact: contactInfo.preferredContact,
        bestTimeToContact: contactInfo.bestTimeToContact,
        message: contactInfo.message,
        referralSource: contactInfo.referralSource,
        referralDetail: contactInfo.referralDetail,
        quizAnswers: formattedAnswers,
        selectedServices: selectedBranches,
        investmentRange,
      }
    };
    console.log(msg);
    try {
      await sgMail.send(msg);
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('SendGrid error:', error);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Unable to send your submission at this time. Please try again in a few minutes or contact support.' 
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'We encountered an unexpected error. Please try again or contact our support team for assistance.' 
      },
      { status: 500 }
    );
  }
} 