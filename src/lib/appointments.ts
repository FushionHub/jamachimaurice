// Appointment Scheduling System

export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  timezone: string;
  type: 'consultation' | 'follow-up' | 'support';
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface TimeSlot {
  date: string;
  time: string;
  available: boolean;
}

// Generate available time slots for the next 14 days
export function generateAvailableTimeSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const now = new Date();
  
  for (let i = 1; i <= 14; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) {
      continue;
    }
    
    const dateString = date.toISOString().split('T')[0];
    
    // Add time slots (9 AM to 5 PM)
    const times = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];
    
    times.forEach(time => {
      slots.push({
        date: dateString,
        time,
        available: Math.random() > 0.3, // 70% availability
      });
    });
  }
  
  return slots;
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Format time for display
export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
}

// Validate appointment data
export function validateAppointment(data: Partial<Appointment>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email address');
  }
  
  if (!data.phone || data.phone.trim().length < 10) {
    errors.push('Phone number must be at least 10 characters');
  }
  
  if (!data.date) {
    errors.push('Date is required');
  }
  
  if (!data.time) {
    errors.push('Time is required');
  }
  
  if (!data.type) {
    errors.push('Appointment type is required');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

// Generate appointment ID
export function generateAppointmentId(): string {
  return `APT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Get appointment type label
export function getAppointmentTypeLabel(type: Appointment['type']): string {
  const labels = {
    consultation: 'Initial Consultation',
    'follow-up': 'Follow-up Meeting',
    support: 'Technical Support',
  };
  return labels[type];
}

// Get appointment status label
export function getAppointmentStatusLabel(status: Appointment['status']): string {
  const labels = {
    pending: 'Pending Confirmation',
    confirmed: 'Confirmed',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };
  return labels[status];
}
