"use client";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { useState } from "react";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
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
    <div>
      <Header />
      <div className="pt-20">
        <div className="py-16 lg:py-24">
          <div className="container">
            <SectionHeader
              eyebrow="Get In Touch"
              title="Let's Work Together"
              description="Ready to bring your project to life? I'd love to hear from you and discuss how we can collaborate."
            />

            <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <Card className="p-8">
                <h3 className="text-2xl font-serif mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-300/20 rounded-full flex items-center justify-center">
                      <span className="text-emerald-300 text-xl">📧</span>
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-white/60">jamachimauricennadi0@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-300/20 rounded-full flex items-center justify-center">
                      <span className="text-emerald-300 text-xl">📱</span>
                    </div>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-white/60">+234 (0) 902 442 8551</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-300/20 rounded-full flex items-center justify-center">
                      <span className="text-emerald-300 text-xl">📍</span>
                    </div>
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-white/60">Owerri North Imo State, Nigeria</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-300/20 rounded-full flex items-center justify-center">
                      <span className="text-emerald-300 text-xl">⏰</span>
                    </div>
                    <div>
                      <p className="font-semibold">Response Time</p>
                      <p className="text-white/60">Within 24 hours</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-semibold mb-4">Follow Me</h4>
                  <div className="flex gap-4">
                    <a href="https://linkedin.com/in/mauricennadijamachi" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                      <span className="text-sm font-bold">in</span>
                    </a>
                    <a href="https://x.com/fushiondevhub" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                      <span className="text-sm font-bold">𝕏</span>
                    </a>
                    <a href="https://www.instagram.com/fushionhubdev" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                      <span className="text-sm font-bold">📷</span>
                    </a>
                  </div>
                </div>
              </Card>

              {/* Contact Form */}
              <Card className="p-8">
                <h3 className="text-2xl font-serif mb-6">Send Me a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
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
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-emerald-300 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-emerald-300 transition-colors"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-emerald-300 transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
                      <p className="text-emerald-300 font-semibold">✅ Message sent successfully!</p>
                      <p className="text-emerald-300/80 text-sm">I'll get back to you within 24 hours.</p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <p className="text-red-300 font-semibold">❌ Failed to send message</p>
                      <p className="text-red-300/80 text-sm">Please try again or contact me directly.</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-emerald-600 hover:to-sky-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowUpRightIcon className="size-4" />
                      </>
                    )}
                  </button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}