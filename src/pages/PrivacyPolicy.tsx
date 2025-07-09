import React from 'react';
import { SEOHead } from '../components/SEOHead';

export function PrivacyPolicy() {
  return (
    <>
      <SEOHead 
        title="Privacy Policy - DraftStox"
        description="Learn how DraftStox collects, uses, and protects your personal information."
        url="https://draftstox.com/privacy"
      />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-sm text-gray-600 mb-8">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p>
                  DraftStox ("we," "our," or "us") operates the website located at https://draftstox.com (the "Service"). 
                  This Privacy Policy informs you of our policies regarding the collection, use, and disclosure of personal 
                  data when you use our Service and the choices you have associated with that data.
                </p>
                <p>
                  We use your data to provide and improve the Service. By using the Service, you agree to the collection 
                  and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, 
                  terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Personal Information</h3>
                <p>
                  While using our Service, we may ask you to provide us with certain personally identifiable information 
                  that can be used to contact or identify you ("Personal Data"). This may include:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Quiz responses and archetype results</li>
                  <li>Portfolio preferences and investment selections</li>
                  <li>Usage data and interaction patterns</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Usage Data</h3>
                <p>
                  We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Your computer's Internet Protocol address (IP address)</li>
                  <li>Browser type and version</li>
                  <li>Pages of our Service that you visit</li>
                  <li>Time and date of your visit</li>
                  <li>Time spent on those pages</li>
                  <li>Unique device identifiers and other diagnostic data</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.3 Tracking & Cookies Data</h3>
                <p>
                  We use cookies and similar tracking technologies to track activity on our Service and hold certain information. 
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <p>DraftStox uses the collected data for various purposes:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>To provide and maintain the Service</li>
                  <li>To notify you about changes to our Service</li>
                  <li>To allow you to participate in interactive features when you choose to do so</li>
                  <li>To provide customer care and support</li>
                  <li>To provide analysis or valuable information so that we can improve the Service</li>
                  <li>To monitor the usage of the Service</li>
                  <li>To detect, prevent and address technical issues</li>
                  <li>To provide personalized investment education and archetype-based recommendations</li>
                  <li>To send periodic emails regarding your account or other products and services</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Legal Requirements</h3>
                <p>
                  DraftStox may disclose your Personal Data in good faith belief that such action is necessary to:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Comply with a legal obligation</li>
                  <li>Protect and defend the rights or property of DraftStox</li>
                  <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                  <li>Protect the personal safety of users of the Service or the public</li>
                  <li>Protect against legal liability</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Service Providers</h3>
                <p>
                  We may employ third party companies and individuals to facilitate our Service, provide the Service on our behalf, 
                  perform Service-related services, or assist us in analyzing how our Service is used. These third parties include:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li><strong>ConvertKit:</strong> Email marketing and communication</li>
                  <li><strong>Google Analytics:</strong> Website analytics and performance tracking</li>
                  <li><strong>Supabase:</strong> Database and authentication services</li>
                  <li><strong>Netlify:</strong> Website hosting and deployment</li>
                  <li><strong>Market Data Providers:</strong> Real-time financial information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                <p>
                  The security of your data is important to us, but remember that no method of transmission over the Internet, 
                  or method of electronic storage is 100% secure. We implement appropriate data collection, storage and processing 
                  practices and security measures to protect against unauthorized access, alteration, disclosure or destruction 
                  of your personal information.
                </p>
                <p>
                  We use SSL encryption for data transmission and secure database storage. Access to personal data is restricted 
                  to authorized personnel only.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Data Protection Rights</h2>
                <p>Under applicable data protection laws, you have the following rights:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li><strong>Right to Access:</strong> Request copies of your personal data</li>
                  <li><strong>Right to Rectification:</strong> Request correction of inaccurate personal data</li>
                  <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                  <li><strong>Right to Restrict Processing:</strong> Request restriction of processing your personal data</li>
                  <li><strong>Right to Data Portability:</strong> Request transfer of your data to another organization</li>
                  <li><strong>Right to Object:</strong> Object to our processing of your personal data</li>
                </ul>
                <p>
                  To exercise these rights, please contact us at privacy@draftstox.com. We will respond to your request within 
                  30 days of receipt.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Children's Privacy</h2>
                <p>
                  Our Service does not address anyone under the age of 13 ("Children"). We do not knowingly collect personally 
                  identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware 
                  that your Children has provided us with Personal Data, please contact us.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Data Transfers</h2>
                <p>
                  Your information, including Personal Data, may be transferred to — and maintained on — computers located 
                  outside of your state, province, country or other governmental jurisdiction where the data protection laws 
                  may differ than those from your jurisdiction.
                </p>
                <p>
                  If you are located outside United States and choose to provide information to us, please note that we transfer 
                  the data, including Personal Data, to United States and process it there.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. California Privacy Rights (CCPA)</h2>
                <p>
                  If you are a California resident, you have specific rights regarding your personal information under the 
                  California Consumer Privacy Act (CCPA):
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Right to know what personal information is collected, used, shared or sold</li>
                  <li>Right to delete personal information held by businesses</li>
                  <li>Right to opt-out of the sale of personal information</li>
                  <li>Right to non-discrimination for exercising CCPA rights</li>
                </ul>
                <p>
                  We do not sell personal information. To exercise your CCPA rights, contact us at privacy@draftstox.com.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                  Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
                </p>
                <p>
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy 
                  are effective when they are posted on this page.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>By email: privacy@draftstox.com</li>
                  <li>By visiting our contact page: https://draftstox.com/contact</li>
                  <li>By mail: DraftStox Privacy Team, [Your Business Address]</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 