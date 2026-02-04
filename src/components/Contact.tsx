"use client";

import { useState, memo } from "react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setStatus('success');

    // Reset status after 3 seconds
    setTimeout(() => {
      setStatus('idle');
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-20">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="space-y-12">
          <div>
            <h2 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-4">Contact</h2>
            <h3 className="heading-lg text-white mb-6">Let&apos;s start a conversation.</h3>
            <p className="text-lg text-gray-400 leading-relaxed max-w-md">
              Whether you&apos;re looking for a data strategy, AI implementation, or just want to connect, I&apos;m here.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start">
              <Mail className="w-6 h-6 text-white mt-1 mr-4" />
              <div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Email</div>
                <a href="mailto:raihanrabani199@gmail.com" className="text-xl font-medium text-white hover:text-gray-300 transition-colors">
                  raihanrabani199@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="w-6 h-6 text-white mt-1 mr-4" />
              <div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Phone</div>
                <a href="tel:+6285824665623" className="text-xl font-medium text-white hover:text-gray-300 transition-colors">
                  +62 858-2466-5623
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="w-6 h-6 text-white mt-1 mr-4" />
              <div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Location</div>
                <div className="text-xl font-medium text-white">
                  Bondowoso, Indonesia
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Form */}
        <div className="bg-white rounded-2xl p-8 md:p-12 text-[#111111]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
                placeholder="Project Inquiry"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting' || status === 'success'}
              className={`w-full px-8 py-4 rounded-lg font-bold transition-all flex items-center justify-center group ${
                status === 'success'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-[#111111] text-white hover:bg-black'
              }`}
            >
              {status === 'submitting' && (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  Sending...
                </>
              )}
              {status === 'success' && (
                <>
                  <CheckCircle className="mr-2 w-5 h-5" />
                  Message Sent!
                </>
              )}
              {status === 'idle' && (
                <>
                  Send Message
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer in Contact Section */}
      <div className="pt-20 mt-8 border-t border-gray-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p>© 2026 Raihan Rabbani. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
        </div>
      </div>
    </div>
  );
}

export default memo(Contact);
