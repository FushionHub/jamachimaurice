import { NextRequest, NextResponse } from 'next/server';
import { Appointment, generateAppointmentId, validateAppointment } from '@/lib/appointments';
import nodemailer from 'nodemailer';

// In a real application, you would store appointments in a database
// For now, we'll use in-memory storage
let appointments: Appointment[] = [];

export async function POST(request: NextRequest) {
  try {
    const appointmentData = await request.json();

    // Validate appointment data
    const validation = validateAppointment(appointmentData);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      );
    }

    // Create appointment
    const appointment: Appointment = {
      id: generateAppointmentId(),
      name: appointmentData.name,
      email: appointmentData.email,
      phone: appointmentData.phone,
      date: appointmentData.date,
      time: appointmentData.time,
      timezone: appointmentData.timezone || 'UTC',
      type: appointmentData.type,
      notes: appointmentData.notes,
      status: 'pending',
      createdAt: new Date(),
    };

    // Store appointment
    appointments.push(appointment);

    // Send confirmation email
    await sendAppointmentConfirmation(appointment);

    // Send notification to Jamachi
    await sendAppointmentNotification(appointment);

    return NextResponse.json({
      success: true,
      appointment: {
        id: appointment.id,
        date: appointment.date,
        time: appointment.time,
        type: appointment.type,
        status: appointment.status,
      },
    });
  } catch (error) {
    console.error('Appointment booking error:', error);
    return NextResponse.json(
      { error: 'Failed to book appointment' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    if (email) {
      // Get appointments for specific email
      const userAppointments = appointments.filter(apt => apt.email === email);
      return NextResponse.json({ appointments: userAppointments });
    }

    // Return all appointments (in production, you'd want authentication)
    return NextResponse.json({ appointments });
  } catch (error) {
    console.error('Get appointments error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve appointments' },
      { status: 500 }
    );
  }
}

async function sendAppointmentConfirmation(appointment: Appointment) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: appointment.email,
    subject: 'Appointment Confirmation - Jamachi Mauricennadi',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #059669, #0ea5e9); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0;">Appointment Confirmed</h1>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
          <p>Hi ${appointment.name},</p>
          <p>Your appointment has been successfully scheduled. Here are the details:</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
            <p><strong>Date:</strong> ${appointment.date}</p>
            <p><strong>Time:</strong> ${appointment.time}</p>
            <p><strong>Type:</strong> ${appointment.type}</p>
            <p><strong>Timezone:</strong> ${appointment.timezone}</p>
          </div>
          
          <p>You will receive a reminder before your appointment.</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #9ca3af; font-size: 14px;">
            Best regards,<br>
            <strong>Jamachi Mauricennadi</strong><br>
            Professional Web & Mobile Developer
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

async function sendAppointmentNotification(appointment: Appointment) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO || 'jamachimauricennadi0@gmail.com',
    subject: `New Appointment: ${appointment.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #059669, #0ea5e9); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0;">New Appointment Booked</h1>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
          <p><strong>${appointment.name}</strong> has booked an appointment:</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
            <p><strong>Name:</strong> ${appointment.name}</p>
            <p><strong>Email:</strong> ${appointment.email}</p>
            <p><strong>Phone:</strong> ${appointment.phone}</p>
            <p><strong>Date:</strong> ${appointment.date}</p>
            <p><strong>Time:</strong> ${appointment.time}</p>
            <p><strong>Type:</strong> ${appointment.type}</p>
            <p><strong>Notes:</strong> ${appointment.notes || 'None'}</p>
          </div>
          
          <p>Appointment ID: ${appointment.id}</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
