import React from 'react';
import { CreditCard, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark_purple text-honeydew pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center"><Phone className="mr-2 h-4 w-4" /> +977-1-4444444</p>
              <p className="flex items-center"><Mail className="mr-2 h-4 w-4" /> info@airwingshorizon.com</p>
              <p className="flex items-center"><MapPin className="mr-2 h-4 w-4" /> Kathmandu, Nepal</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Payment Methods</h3>
            <div className="flex space-x-4">
              <CreditCard className="h-8 w-8" />
            </div>
            <p className="mt-2">We accept all major credit cards and digital payments</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-naples_yellow">About Us</a></li>
              <li><a href="/terms" className="hover:text-naples_yellow">Terms & Conditions</a></li>
              <li><a href="/privacy" className="hover:text-naples_yellow">Privacy Policy</a></li>
              <li><a href="/faq" className="hover:text-naples_yellow">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to get special offers and updates</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-md w-full text-rich_black"
              />
              <button className="bg-naples_yellow text-rich_black px-4 py-2 rounded-r-md hover:bg-naples_yellow/90">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-ash_gray/20 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Airwings Horizon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};