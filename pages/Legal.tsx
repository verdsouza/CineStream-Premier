import React from 'react';
import { Store } from '../services/store';

const LegalLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-dark-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8 border-b border-dark-700 pb-4">{title}</h1>
        <div className="prose prose-invert max-w-none text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export const PrivacyPolicy: React.FC = () => {
    const config = Store.getConfig();
    return (
        <LegalLayout title="Privacy Policy">
            <p>Last Updated: {new Date().toLocaleDateString()}</p>
            <h3>1. Introduction</h3>
            <p>Welcome to {config.siteName}. We respect your privacy and are committed to protecting your personal data.</p>
            <h3>2. Data We Collect</h3>
            <p>We collect your email address for authentication and booking verification purposes. We do not sell your data to third parties.</p>
            <h3>3. Usage of Data</h3>
            <p>Your data is used strictly to:</p>
            <ul>
                <li>Manage your access slots.</li>
                <li>Send booking confirmations and secure access tokens.</li>
                <li>Verify your identity during secure streaming sessions.</li>
            </ul>
        </LegalLayout>
    );
};

export const TermsOfService: React.FC = () => {
    const config = Store.getConfig();
    return (
        <LegalLayout title="Terms of Service">
            <h3>1. Acceptance of Terms</h3>
            <p>By accessing {config.siteName}, you agree to be bound by these Terms of Service.</p>
            <h3>2. Slot Booking Rules</h3>
            <p>Bookings are for personal use only. Recording, restreaming, or sharing access tokens is strictly prohibited and will result in an immediate ban.</p>
            <h3>3. Service Availability</h3>
            <p>We strive for 99.9% uptime, but we do not guarantee uninterrupted access. Scheduled maintenance will be communicated via email.</p>
        </LegalLayout>
    );
};

export const RefundPolicy: React.FC = () => {
    const config = Store.getConfig();
    return (
        <LegalLayout title="Refund Policy">
            <h3>1. Cancellations</h3>
            <p>You may cancel a booked slot up to 24 hours before the start time for a full refund.</p>
            <h3>2. Technical Issues</h3>
            <p>If you experience technical issues preventing you from accessing your slot, please contact {config.contactEmail} within 2 hours of your slot time for a resolution or refund.</p>
            <h3>3. Non-Refundable Items</h3>
            <p>Completed slots where content was accessed are non-refundable.</p>
        </LegalLayout>
    );
};