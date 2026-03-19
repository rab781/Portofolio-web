"use client";

import { useState, memo, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle, Loader2, Copy, Check, AlertCircle } from "lucide-react";

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const [modifierKey, setModifierKey] = useState('Ctrl');
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const isMounted = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    isMounted.current = true;

    // Detect OS for keyboard shortcut hint
    if (typeof navigator !== 'undefined') {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      setModifierKey(isMac ? '⌘' : 'Ctrl');
    }

    return () => {
      isMounted.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("raihanrabani199@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // ⚡ Bolt: Use native FormData instead of controlled state to prevent re-renders on every keystroke
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!isMounted.current) return;

      if (response.ok) {
        formRef.current?.reset();
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      if (!isMounted.current) return;
      console.error("Error submitting form:", error);
      setSubmitStatus('error');
    } finally {
      if (isMounted.current) {
        setIsSubmitting(false);
        // Reset status after 5 seconds
        timeoutRef.current = setTimeout(() => {
          if (isMounted.current) {
            setSubmitStatus('idle');
          }
        }, 5000);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
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
                  <a href="mailto:raihanrabani199@gmail.com" className="text-xl font-medium text-white hover:text-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA239] rounded-lg px-1 -mx-1">
                    raihanrabani199@gmail.com
                  </a>
                  <button
                    type="button"
                    onClick={handleCopy}
                    aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
                    className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA239]"
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
                <a href="tel:+6285824665623" className="text-xl font-medium text-white hover:text-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA239] rounded-lg px-1 -mx-1">
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
          <form ref={formRef} onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-6">
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
                required
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              aria-keyshortcuts={`${modifierKey === '⌘' ? 'Meta' : 'Control'}+Enter`}
              className={`w-full bg-[#111111] text-white px-8 py-4 rounded-lg font-bold hover:bg-black transition-all flex items-center justify-center group relative overflow-hidden ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />

                    {/* Keyboard Shortcut Hint */}
                    <div className="hidden sm:flex items-center ml-3 px-2 py-0.5 rounded text-[10px] font-medium bg-white/10 text-white/80 border border-white/20 transition-opacity opacity-0 group-hover:opacity-100 absolute right-6" aria-hidden="true">
                      <span>{modifierKey}</span>
                      <span className="mx-0.5">+</span>
                      <span>Enter</span>
                    </div>
                  </>
                )}
              </div>
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

            {submitStatus === 'error' && (
              <div
                role="alert"
                aria-live="assertive"
                className="mt-4 p-4 bg-red-50 text-red-800 rounded-lg flex items-center animate-in fade-in slide-in-from-bottom-2 border border-red-100"
              >
                <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                <span>Something went wrong. Please try again later.</span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Footer in Contact Section */}
      <div className="pt-20 mt-8 border-t border-gray-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p>© 2026 Raihan Rabbani. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Visit my LinkedIn profile" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA239] rounded-sm px-1 -mx-1">LinkedIn</a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Visit my GitHub profile" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA239] rounded-sm px-1 -mx-1">GitHub</a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Visit my Twitter profile" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA239] rounded-sm px-1 -mx-1">Twitter</a>
        </div>
      </div>
    </div>
  );
}

export default memo(Contact);