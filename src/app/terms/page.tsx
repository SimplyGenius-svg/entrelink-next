import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | EntreLink',
  description: 'Terms and conditions for using EntreLink platform',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last Updated: March 14, 2025</p>
          
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
            <p>By accessing or using the EntreLink platform (Service), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Service.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Description of Service</h2>
            <p>EntreLink provides a platform that connects founders with potential investors, co-founders, and other resources. Our service includes AI-powered matching, investor databases, communication tools, and other related features.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. User Registration and Accounts</h2>
            <p>Some features of our Service require registration. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. User Conduct</h2>
            <p>You agree not to use the Service for any illegal purpose or in violation of any local, state, national, or international law. You also agree not to:</p>
            <ul className="list-disc pl-6 my-4">
              <li>Harass, abuse, or harm another person</li>
              <li>Impersonate or misrepresent your affiliation with any person or entity</li>
              <li>Collect or store personal data about other users without their express permission</li>
              <li>Use the Service in any manner that could interfere with, disrupt, negatively affect, or inhibit other users from fully enjoying the Service</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Communication Permissions</h2>
            <p>When you request to connect with an investor through our platform, you acknowledge that:</p>
            <ul className="list-disc pl-6 my-4">
              <li>EntreLink may review communication content for quality and compliance purposes</li>
              <li>We cannot guarantee responses from investors or the accuracy of investor information</li>
              <li>Investors may opt out of communications at any time</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Intellectual Property Rights</h2>
            <p>The Service and its original content, features, and functionality are owned by EntreLink and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Termination</h2>
            <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including but not limited to a breach of the Terms.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
            <p>EntreLink and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. We will provide notification of material changes by posting a notice on our website.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at <a href="mailto:legal@entrelink.com" className="text-blue-600 hover:underline">legal@entrelink.com</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}