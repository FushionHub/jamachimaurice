import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create transporter with SMTP configuration
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email to you (notification of new contact)
    const notificationEmail = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO || 'jamachimauricennadi0@gmail.com',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #059669, #0ea5e9); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
              <h3 style="color: #059669; margin-top: 0;">Contact Details:</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <div style="background: #f3f4f6; padding: 15px; border-radius: 4px; margin-top: 10px; color: #374151;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <div style="text-align: center; color: #9ca3af; font-size: 14px;">
              <p>Received on: ${new Date().toLocaleString()}</p>
              <p>Reply directly to: ${email}</p>
            </div>
          </div>
        </div>
      `,
    };

    // Confirmation email to the sender
    const confirmationEmail = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Thank you for contacting me - Message Received',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #059669, #0ea5e9); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">Thank You for Reaching Out!</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; color: #374151;">Hi ${name},</p>
            
            <p style="color: #6b7280; line-height: 1.6;">
              Thank you for contacting me! I have successfully received your message and will get back to you within 24 hours.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
              <h3 style="color: #059669; margin-top: 0;">Your Message Summary:</h3>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <div style="background: #f3f4f6; padding: 15px; border-radius: 4px; margin-top: 10px; color: #374151;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <p style="color: #6b7280; line-height: 1.6;">
              In the meantime, feel free to check out my portfolio and recent projects on my website.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://me.fushionhubai.com.ng" style="background: linear-gradient(135deg, #059669, #0ea5e9); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Visit My Portfolio
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <div style="text-align: center; color: #9ca3af; font-size: 14px;">
              <p>Best regards,<br><strong>Jamachi Mauricennadi</strong></p>
              <p>Professional Web & Mobile Developer</p>
              <p>📧 jamachimauricennadi0@gmail.com | 📱 +2349024428551</p>
              
              <div style="margin-top: 20px;">
                <a href="https://linkedin.com/in/mauricennadijamachi" style="color: #059669; text-decoration: none; margin: 0 10px;">LinkedIn</a>
                <a href="https://x.com/fushiondevhub" style="color: #059669; text-decoration: none; margin: 0 10px;">Twitter</a>
                <a href="https://www.instagram.com/fushionhubdev" style="color: #059669; text-decoration: none; margin: 0 10px;">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      `,
    };

    try {
      // Send both emails
      await Promise.all([
        transporter.sendMail(notificationEmail),
        transporter.sendMail(confirmationEmail)
      ]);

      console.log('Emails sent successfully');
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Still return success to user, but log the email error
      // In production, you might want to handle this differently
    }

    // Log the contact form submission
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been sent successfully! You should receive a confirmation email shortly.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}