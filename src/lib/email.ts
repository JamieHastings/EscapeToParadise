import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

const isEmailConfigured = Boolean(SERVICE_ID && PUBLIC_KEY && TEMPLATE_ID);

interface NotificationParams {
  subject: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  details: string;
  [key: string]: string;
}

export async function sendNotificationEmail(params: NotificationParams) {
  if (!isEmailConfigured) return;

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, { publicKey: PUBLIC_KEY });
  } catch (error) {
    // Don't throw — email failure should never block form submission
    console.error('Email notification failed:', error);
  }
}
