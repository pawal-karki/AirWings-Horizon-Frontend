"use client";

import type React from "react";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronUp,
  Send,
} from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed with:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-r from-dark_purple to-purple-900 text-honeydew shadow-md pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMjEyMTIxIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMzYTNhM2EiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 inline-block transform hover:scale-105 transition-transform duration-300">
              Airwings Horizon
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Elevating your travel experience to new heights. Discover the
              world with comfort and style.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors duration-300 group"
                >
                  <Icon className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                "About Us",
                "Our Services",
                "Travel Packages",
                "Destinations",
                "FAQs",
                "Contact Us",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      ›
                    </span>
                    <span className="border-b border-transparent group-hover:border-white transition-all duration-300">
                      {link}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500 inline-block">
              Contact Us
            </h4>
            <div className="space-y-4">
              {[
                { Icon: Phone, text: "+977-1-4444444" },
                { Icon: Mail, text: "info@airwingshorizon.com" },
                { Icon: MapPin, text: "Kathmandu, Nepal" },
              ].map(({ Icon, text }, index) => (
                <p key={index} className="flex items-center group">
                  <Icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    {text}
                  </span>
                </p>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500 inline-block">
              Newsletter
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300 text-white placeholder:text-gray-400 peer"
                  placeholder=" "
                  required
                />
                <label className="absolute text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-violet-400 left-1">
                  Email Address
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-3 rounded-md hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center group"
              >
                Subscribe
                <Send className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
            <p className="mt-4 text-xs text-gray-400">
              By subscribing, you agree to our privacy policy and consent to
              receive updates from our company.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Airwings Horizon. All rights
            reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute bottom-4 right-4 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors duration-300 group"
      >
        <ChevronUp className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
      </button>
    </footer>
  );
};
