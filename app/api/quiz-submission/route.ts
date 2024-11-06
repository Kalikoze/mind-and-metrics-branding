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
      min: range.initial.min.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      max: range.initial.max.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    },
    monthly: {
      min: range.monthly.min.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      max: range.monthly.max.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    }
  };
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { answers, selectedBranches, contactInfo } = data;

    if (!answers || !selectedBranches || !contactInfo) {
      return NextResponse.json(
        { success: false, message: 'Missing required data' },
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
        timestamp: new Date().toISOString()
      }
    };

    await sgMail.send(msg);
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
} 