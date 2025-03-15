import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | EntreLink',
  description: 'How EntreLink collects, uses, and protects your data',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 m-10">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last Updated: March 14, 2025</p>
          
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>EntreLink (we, our, or us) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-lg font-medium mt-6 mb-3">2.1 Personal Information</h3>
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 my-4">
              <li>Account information (name, email address, password)</li>
              <li>Profile information (company details, industry, location)</li>
              <li>Communications (emails, messages sent through our platform)</li>
              <li>Payment information (processed through secure third-party payment processors)</li>
            </ul>
            
            <h3 className="text-lg font-medium mt-6 mb-3">2.2 Usage Information</h3>
            <p>We automatically collect certain information about how you interact with our platform, including:</p>
            <ul className="list-disc pl-6 my-4">
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage data (pages visited, features used, search queries)</li>
              <li>Interaction history (investors contacted, messages sent)</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 my-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Match you with relevant investors or opportunities</li>
              <li>Process and facilitate communication requests</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Protect against misuse, fraud, or unauthorized use</li>
              <li>Communicate with you about products, services, offers, and events</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Information Sharing and Disclosure</h2>
            <p>We may share your information in the following circumstances:</p>
            <ul className="list-disc pl-6 my-4">
              <li>With investors or founders you choose to connect with</li>
              <li>With service providers who perform services on our behalf</li>
              <li>To comply with legal obligations or protect rights</li>
              <li>In connection with a business transaction (e.g., merger or acquisition)</li>
            </ul>
            <p>We will never sell your personal information to third parties.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p>We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Your Rights and Choices</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul className="list-disc pl-6 my-4">
              <li>Accessing, updating, or deleting your information</li>
              <li>Opting out of marketing communications</li>
              <li>Requesting a copy of your data</li>
              <li>Objecting to certain processing activities</li>
            </ul>
            <p>To exercise these rights, please contact us using the information provided below.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar tracking technologies to collect information about your browsing activities and to provide a better user experience. You can manage your cookie preferences through your browser settings.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the Last Updated date.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:privacy@entrelink.com" className="text-blue-600 hover:underline">privacy@entrelink.com</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}