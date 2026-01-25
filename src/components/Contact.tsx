"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setIsSubmitting(false);
    alert("Message sent successfully!");
  };

  return (
    <section id="contact" className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#FFD700] mb-4 font-mono">
            &lt;Initiate_Uplink /&gt;
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-mono">
            &quot;// Secure connection request ready&quot;
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 font-mono">
              [TRANSMISSION_OPEN]
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              I&apos;m always interested in hearing about new projects and opportunities.
              Whether you&apos;re a company looking to hire, or you&apos;re a fellow developer
              wanting to collaborate, I&apos;d love to hear from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-center group">
                <div className="bg-[#00F0FF]/10 border border-[#00F0FF]/20 p-3 rounded mr-4 group-hover:bg-[#00F0FF]/20 transition-colors">
                  <Mail className="w-6 h-6 text-[#00F0FF]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white font-mono">Email_Address</h4>
                  <p className="text-gray-400 font-mono">raihanrabani199@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center group">
                <div className="bg-[#00F0FF]/10 border border-[#00F0FF]/20 p-3 rounded mr-4 group-hover:bg-[#00F0FF]/20 transition-colors">
                  <Phone className="w-6 h-6 text-[#00F0FF]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white font-mono">Comms_Line</h4>
                  <p className="text-gray-400 font-mono">+62 858-2466-5623</p>
                </div>
              </div>

              <div className="flex items-center group">
                <div className="bg-[#00F0FF]/10 border border-[#00F0FF]/20 p-3 rounded mr-4 group-hover:bg-[#00F0FF]/20 transition-colors">
                  <MapPin className="w-6 h-6 text-[#00F0FF]" />
                </div>
                <div>
                  <h4 className="font-semibold text-white font-mono">Geo_Coordinates</h4>
                  <p className="text-gray-400 font-mono">Bondowoso, Indonesia</p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-800 pt-6">
              <h4 className="font-semibold text-[#FFD700] mb-2 font-mono">
                [LATENCY_INFO]
              </h4>
              <p className="text-gray-500 text-sm">
                Typical response time: &lt; 24 hours.<br />
                Priority given to encrypted channels (LinkedIn/Email).
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-panel p-8 rounded-xl border border-gray-700/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#00F0FF] mb-2 font-mono"
                  >
                    User_ID
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded text-white focus:ring-1 focus:ring-[#00F0FF] focus:border-[#00F0FF] transition-all"
                    placeholder="Identify yourself"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#00F0FF] mb-2 font-mono"
                  >
                    Return_Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded text-white focus:ring-1 focus:ring-[#00F0FF] focus:border-[#00F0FF] transition-all"
                    placeholder="email@domain.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-[#00F0FF] mb-2 font-mono"
                >
                  Header_Data
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded text-white focus:ring-1 focus:ring-[#00F0FF] focus:border-[#00F0FF] transition-all"
                  placeholder="Subject matter"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#00F0FF] mb-2 font-mono"
                >
                  Payload
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded text-white focus:ring-1 focus:ring-[#00F0FF] focus:border-[#00F0FF] transition-all resize-none"
                  placeholder="Enter message content..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#00F0FF]/10 border border-[#00F0FF]/50 hover:bg-[#00F0FF]/20 text-[#00F0FF] hover:text-white hover:border-[#00F0FF] px-6 py-3 rounded font-bold transition-all duration-300 flex items-center justify-center font-mono group"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#00F0FF] mr-2"></div>
                ) : (
                  <Send size={18} className="mr-2 group-hover:translate-x-1 transition-transform" />
                )}
                {isSubmitting ? "TRANSMITTING..." : "EXECUTE_SEND"}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-600 font-mono text-sm">
            © 2026 Mohammad Raihan Rabbani. System Status: <span className="text-green-500">OPTIMAL</span>
          </p>
        </div>
      </div>
    </section>
  );
}
