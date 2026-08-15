"use client";
import { useState, useEffect } from 'react';
import { Card } from "@/components/Card";
import { generateAvailableTimeSlots, formatDate, formatTime, getAppointmentTypeLabel } from "@/lib/appointments";
import { motion } from "framer-motion";

export const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'consultation' as 'consultation' | 'follow-up' | 'support',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [availableSlots, setAvailableSlots] = useState(generateAvailableTimeSlots());

  // Filter slots by selected date
  const availableTimes = selectedDate 
    ? availableSlots.filter(slot => slot.date === selectedDate && slot.available)
    : [];

  // Get unique dates
  const availableDates = Array.from(new Set(availableSlots.map(slot => slot.date)));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: selectedDate,
          time: selectedTime,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', type: 'consultation', notes: '' });
        setSelectedDate('');
        setSelectedTime('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-8">
      <h3 className="text-2xl font-serif mb-6">Book an Appointment</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Appointment Type */}
        <div>
          <label className="block text-sm font-semibold mb-3">Appointment Type</label>
          <div className="grid grid-cols-3 gap-3">
            {(['consultation', 'follow-up', 'support'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData({ ...formData, type })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.type === type
                    ? 'border-emerald-400 bg-emerald-400/10 text-emerald-300'
                    : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20'
                }`}
              >
                <div className="text-sm font-medium">{getAppointmentTypeLabel(type)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        <div>
          <label className="block text-sm font-semibold mb-3">Select Date</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-40 overflow-y-auto">
            {availableDates.map((date) => (
              <button
                key={date}
                type="button"
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedTime('');
                }}
                className={`p-2 rounded-lg border-2 transition-all text-xs ${
                  selectedDate === date
                    ? 'border-emerald-400 bg-emerald-400/10 text-emerald-300'
                    : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20'
                }`}
              >
                {formatDate(date)}
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="overflow-hidden"
          >
            <label className="block text-sm font-semibold mb-3">Select Time</label>
            <div className="grid grid-cols-4 gap-2">
              {availableTimes.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => setSelectedTime(slot.time)}
                  disabled={!slot.available}
                  className={`p-2 rounded-lg border-2 transition-all text-xs ${
                    selectedTime === slot.time
                      ? 'border-emerald-400 bg-emerald-400/10 text-emerald-300'
                      : slot.available
                      ? 'border-white/10 bg-white/5 text-white/60 hover:border-white/20'
                      : 'border-white/5 bg-white/5 text-white/30 cursor-not-allowed'
                  }`}
                >
                  {formatTime(slot.time)}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Personal Information */}
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-emerald-300 transition-colors"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-emerald-300 transition-colors"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-emerald-300 transition-colors"
              placeholder="+234 902 442 8551"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-semibold mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-emerald-300 transition-colors resize-none"
              placeholder="Any specific topics you'd like to discuss..."
            />
          </div>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-lg"
          >
            <p className="text-emerald-300 font-semibold">✅ Appointment booked successfully!</p>
            <p className="text-emerald-300/80 text-sm">You'll receive a confirmation email shortly.</p>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg"
          >
            <p className="text-red-300 font-semibold">❌ Failed to book appointment</p>
            <p className="text-red-300/80 text-sm">Please try again or contact me directly.</p>
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedDate || !selectedTime || isSubmitting}
          className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-emerald-600 hover:to-sky-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Booking...
            </>
          ) : (
            'Confirm Appointment'
          )}
        </button>
      </form>
    </Card>
  );
};
