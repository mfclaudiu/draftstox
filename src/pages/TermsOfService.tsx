import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-6">
              Last updated: March 15, 2024
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing or using DraftStox, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Educational Purpose</h2>
            <p className="text-gray-700 mb-6">
              DraftStox is an educational platform. All trading activities are simulated using virtual currency. No real money is involved in any transactions on the platform.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
            <p className="text-gray-700 mb-4">By creating an account, you agree to:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li>Provide accurate information</li>
              <li>Maintain account security</li>
              <li>Not share account credentials</li>
              <li>Accept responsibility for account activity</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Acceptable Use</h2>
            <p className="text-gray-700 mb-4">You agree not to:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li>Use the service for any illegal purpose</li>
              <li>Attempt to manipulate platform metrics</li>
              <li>Interfere with other users' experience</li>
              <li>Attempt to gain unauthorized access</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
            <p className="text-gray-700 mb-6">
              All content, features, and functionality are owned by DraftStox and are protected by international copyright, trademark, and other intellectual property laws.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Disclaimer</h2>
            <p className="text-gray-700 mb-6">
              The platform is provided "as is" without warranties. We do not guarantee the accuracy of market data or investment information. This is not financial advice.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              DraftStox shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Changes to Terms</h2>
            <p className="text-gray-700 mb-6">
              We reserve the right to modify these terms at any time. We will notify users of any material changes via email or platform notification.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about these Terms, please contact us at terms@draftstox.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 