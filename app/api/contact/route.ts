import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

const isProduction = process.env.VERCEL_ENV === 'production';

const apiKey = isProduction ? process.env.PRODUCTION_SENDGRID_API_KEY : process.env.STAGING_SENDGRID_API_KEY;
const receiverEmail = isProduction ? process.env.PRODUCTION_RECEIVER_EMAIL : process.env.STAGING_RECEIVER_EMAIL;
const receiverEmailCC = isProduction ? process.env.PRODUCTION_RECEIVER_EMAIL_CC : process.env.STAGING_RECEIVER_EMAIL_CC;
const senderEmail = isProduction ? process.env.PRODUCTION_SENDER_EMAIL : process.env.STAGING_SENDER_EMAIL;

if (!apiKey) {
  throw new Error('SENDGRID_API_KEY environment variable is not set');
}

sgMail.setApiKey(apiKey);

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyName?: string;
  subject: string;
  message: string;
}

function validateContactForm(data: ContactFormData) {
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

  if (!data.message?.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.length > 500) {
    errors.message = 'Message must be less than 500 characters';
  }

  if (!data.subject?.trim()) {
    errors.subject = 'Subject is required';
  } else if (data.subject.length > 100) {
    errors.subject = 'Subject must be less than 100 characters';
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

    const data: ContactFormData = await request.json();

    const validation = validateContactForm(data);
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

    const msg = {
      to: receiverEmail,
      cc: receiverEmailCC,
      from: {
        email: senderEmail,
        name: 'Mind & Metrics Branding'
      },
      subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
      templateId: 'd-761689fbba544e96bd1a2149a797f253',
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
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || 'Not provided',
        companyName: data.companyName || 'Not provided',
        subject: data.subject,
        message: data.message
      }
    };

    try {
      await sgMail.send(msg);
      return NextResponse.json({ 
        success: true,
        message: 'Your message has been sent successfully. We\'ll be in touch soon!'
      });
    } catch (error) {
      console.error('SendGrid error:', error);
      return NextResponse.json(
        { 
          success: false, 
          message: 'We\'re having trouble sending your message. Please try again in a few minutes or contact us directly.' 
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Something went wrong while processing your request. Please try again or contact us directly.' 
      },
      { status: 500 }
    );
  }
} 