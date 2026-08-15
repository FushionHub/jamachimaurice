// AI Email and Reminder System

import nodemailer from 'nodemailer';

export interface Reminder {
  id: string;
  type: 'appointment' | 'payment' | 'follow-up' | 'project_update';
  recipientEmail: string;
  recipientName: string;
  subject: string;
  message: string;
  scheduledDate: Date;
  status: 'pending' | 'sent' | 'failed';
  metadata?: Record<string, any>;
}

export interface EmailTemplate {
  subject: string;
  html: string;
}

// Create email transporter
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

// Email Templates
export const emailTemplates = {
  appointmentReminder: (data: { name: string; date: string; time: string }): EmailTemplate => ({
    subject: 'Appointment Reminder - Jamachi Mauricennadi',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #059669, #0ea5e9); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0;">📅 Appointment Reminder</h1>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
          <p>Hi ${data.name},</p>
          <p>This is a friendly reminder about your upcoming appointment:</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
            <p><strong>Date:</strong> ${data.date}</p>
            <p><strong>Time:</strong> ${data.time}</p>
          </div>
          
          <p>Please make sure you're available at the scheduled time. If you need to reschedule, please contact me.</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #9ca3af; font-size: 14px;">
            Best regards,<br>
            <strong>Jamachi Mauricennadi</strong><br>
            Professional Web & Mobile Developer
          </p>
        </div>
      </div>
    `,
  }),

  paymentReminder: (data: { name: string; amount: string; dueDate: string }): EmailTemplate => ({
    subject: 'Payment Reminder - Jamachi Mauricennadi',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #059669, #0ea5e9); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0;">💳 Payment Reminder</h1>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
          <p>Hi ${data.name},</p>
          <p>This is a friendly reminder about your upcoming payment:</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
            <p><strong>Amount:</strong> ${data.amount}</p>
            <p><strong>Due Date:</strong> ${data.dueDate}</p>
          </div>
          
          <p>To complete your payment, please visit the services page or contact me directly.</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #9ca3af; font-size: 14px;">
            Best regards,<br>
            <strong>Jamachi Mauricennadi</strong><br>
            Professional Web & Mobile Developer
          </p>
        </div>
      </div>
    `,
  }),

  followUpReminder: (data: { name: string; projectName: string; lastContact: string }): EmailTemplate => ({
    subject: 'Follow-up Reminder - Jamachi Mauricennadi',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #059669, #0ea5e9); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0;">🔄 Follow-up Reminder</h1>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
          <p>Hi ${data.name},</p>
          <p>I wanted to follow up on our project "${data.projectName}":</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
            <p><strong>Project:</strong> ${data.projectName}</p>
            <p><strong>Last Contact:</strong> ${data.lastContact}</p>
          </div>
          
          <p>How is everything going? Let me know if you need any updates or have questions.</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #9ca3af; font-size: 14px;">
            Best regards,<br>
            <strong>Jamachi Mauricennadi</strong><br>
            Professional Web & Mobile Developer
          </p>
        </div>
      </div>
    `,
  }),

  projectUpdate: (data: { name: string; projectName: string; update: string }): EmailTemplate => ({
    subject: 'Project Update - Jamachi Mauricennadi',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #059669, #0ea5e9); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0;">🚀 Project Update</h1>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
          <p>Hi ${data.name},</p>
          <p>Great news! Here's an update on your project "${data.projectName}":</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
            <p><strong>Project:</strong> ${data.projectName}</p>
            <p><strong>Update:</strong></p>
            <p style="color: #374151;">${data.update}</p>
          </div>
          
          <p>Feel free to reach out if you have any questions or feedback!</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #9ca3af; font-size: 14px;">
            Best regards,<br>
            <strong>Jamachi Mauricennadi</strong><br>
            Professional Web & Mobile Developer
          </p>
        </div>
      </div>
    `,
  }),
};

// Send email immediately
export async function sendEmail(emailData: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}

// Schedule reminder (in production, you'd use a job scheduler like node-cron)
export function scheduleReminder(reminder: Reminder): void {
  // In a real application, you would store this in a database
  // and use a job scheduler to send emails at the scheduled time
  
  const now = new Date();
  const scheduledTime = new Date(reminder.scheduledDate);
  const delay = scheduledTime.getTime() - now.getTime();

  if (delay > 0) {
    setTimeout(async () => {
      await sendEmail({
        to: reminder.recipientEmail,
        subject: reminder.subject,
        html: reminder.message,
      });
    }, delay);
  }
}

// Create reminder
export function createReminder(data: {
  type: Reminder['type'];
  recipientEmail: string;
  recipientName: string;
  scheduledDate: Date;
  metadata?: Record<string, any>;
}): Reminder {
  const id = `REM-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  let template: EmailTemplate;
  
  switch (data.type) {
    case 'appointment':
      template = emailTemplates.appointmentReminder({
        name: data.recipientName,
        date: data.metadata?.date || '',
        time: data.metadata?.time || '',
      });
      break;
    case 'payment':
      template = emailTemplates.paymentReminder({
        name: data.recipientName,
        amount: data.metadata?.amount || '',
        dueDate: data.metadata?.dueDate || '',
      });
      break;
    case 'follow-up':
      template = emailTemplates.followUpReminder({
        name: data.recipientName,
        projectName: data.metadata?.projectName || '',
        lastContact: data.metadata?.lastContact || '',
      });
      break;
    case 'project_update':
      template = emailTemplates.projectUpdate({
        name: data.recipientName,
        projectName: data.metadata?.projectName || '',
        update: data.metadata?.update || '',
      });
      break;
    default:
      throw new Error('Invalid reminder type');
  }

  const reminder: Reminder = {
    id,
    type: data.type,
    recipientEmail: data.recipientEmail,
    recipientName: data.recipientName,
    subject: template.subject,
    message: template.html,
    scheduledDate: data.scheduledDate,
    status: 'pending',
    metadata: data.metadata,
  };

  // Schedule the reminder
  scheduleReminder(reminder);

  return reminder;
}
