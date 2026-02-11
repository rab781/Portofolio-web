"use client";

import { useState, memo, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle, Loader2, Copy, Check } from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("raihanrabani199@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (!isMounted.current) return;

    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
    setSubmitStatus('success');

    // Reset status after 5 seconds
    timeoutRef.current = setTimeout(() => {
      if (isMounted.current) {
        setSubmitStatus('idle');
      }
    }, 5000);
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
                <div className="flex items-center gap-3">
                  <a href="mailto:raihanrabani199@gmail.com" className="text-xl font-medium text-white hover:text-gray-300 transition-colors">
                    raihanrabani199@gmail.com
                  </a>
                  <button
                    type="button"
                    onClick={handleCopy}
                    aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
                    className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
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
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
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
              <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
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
              disabled={isSubmitting}
              className={`w-full bg-[#111111] text-white px-8 py-4 rounded-lg font-bold hover:bg-black transition-all flex items-center justify-center group ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {submitStatus === 'success' && (
              <div
                role="status"
                aria-live="polite"
                className="mt-4 p-4 bg-green-50 text-green-800 rounded-lg flex items-center animate-in fade-in slide-in-from-bottom-2 border border-green-100"
              >
                <CheckCircle className="w-5 h-5 mr-2 shrink-0" />
                <span>Message sent successfully! I&apos;ll get back to you soon.</span>
              </div>
            )}
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