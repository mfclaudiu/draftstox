import React from 'react';
import { SEOHead } from '../components/SEOHead';

export function TermsOfService() {
  return (
    <>
      <SEOHead 
        title="Terms of Service - DraftStox"
        description="Read the terms and conditions for using DraftStox services."
        url="https://draftstox.com/terms"
      />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-sm text-gray-600 mb-8">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p>
                  Welcome to DraftStox ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our 
                  website located at https://draftstox.com (the "Service") operated by DraftStox.
                </p>
                <p>
                  By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part 
                  of these terms, then you may not access the Service. These Terms constitute a legally binding agreement 
                  between you and DraftStox.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                <p>
                  DraftStox is an educational platform that provides investment learning through gamified experiences. 
                  Our services include:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Investment personality assessments and archetype quizzes</li>
                  <li>Virtual portfolio building and management tools</li>
                  <li>Educational content about investing and financial markets</li>
                  <li>Gamified learning experiences with points, badges, and leaderboards</li>
                  <li>Community features and social interactions</li>
                </ul>
                <p>
                  <strong>IMPORTANT DISCLAIMER:</strong> DraftStox is an educational platform using virtual/simulated 
                  investments only. We do not provide actual investment services, financial advice, or real money trading. 
                  All portfolio activities use virtual currency for educational purposes only.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts and Registration</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Account Creation</h3>
                <p>
                  To access certain features of the Service, you may be required to create an account. You agree to provide 
                  accurate, current, and complete information during registration and to update such information to keep it 
                  accurate, current, and complete.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Account Security</h3>
                <p>
                  You are responsible for safeguarding the password and for all activities that occur under your account. 
                  You agree to immediately notify DraftStox of any unauthorized use of your password or account.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Age Requirements</h3>
                <p>
                  You must be at least 13 years old to use this Service. Users between 13-18 years old must have parental 
                  consent to use the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use Policy</h2>
                <p>You agree not to use the Service to:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Violate any applicable local, state, national, or international law or regulation</li>
                  <li>Harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>Submit false or misleading information</li>
                  <li>Upload viruses or other malicious code</li>
                  <li>Spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                  <li>Interfere with or circumvent the security features of the Service</li>
                  <li>Impersonate or attempt to impersonate another user, person, or entity</li>
                  <li>Use the Service for any commercial purposes without our express written consent</li>
                  <li>Attempt to gain unauthorized access to systems or networks</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Educational Purpose and Investment Disclaimer</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Educational Content Only</h3>
                <p>
                  <strong>ALL CONTENT ON DRAFTSTOX IS FOR EDUCATIONAL PURPOSES ONLY.</strong> Nothing on this Service 
                  constitutes professional and/or financial advice, nor does any information on the Service constitute 
                  a comprehensive or complete statement of the matters discussed.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Not Financial Advice</h3>
                <p>
                  DraftStox does not provide investment, legal, tax, or financial advice. The information provided on 
                  this Service is general in nature and is not intended as investment, legal, tax, or financial advice. 
                  Before making any investment decisions, you should consult with qualified professionals.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.3 Virtual Trading Only</h3>
                <p>
                  All trading and portfolio activities on DraftStox use virtual currency and simulated market conditions. 
                  No real money is involved in any DraftStox activities. Past performance of virtual portfolios does not 
                  guarantee future results in real investing.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.4 Market Risk Disclosure</h3>
                <p>
                  Investing in financial markets involves significant risk of loss. DraftStox's educational content may 
                  discuss various investment strategies, but you should understand that all investments carry risk and 
                  you may lose money when investing in real markets.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property Rights</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Our Content</h3>
                <p>
                  The Service and its original content, features, and functionality are and will remain the exclusive 
                  property of DraftStox and its licensors. The Service is protected by copyright, trademark, and other laws.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 User Content</h3>
                <p>
                  Our Service may allow you to post, link, store, share and otherwise make available certain information, 
                  text, graphics, videos, or other material ("Content"). You are responsible for Content that you post 
                  to the Service, including its legality, reliability, and appropriateness.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">6.3 License to User Content</h3>
                <p>
                  By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, 
                  publicly display, reproduce, and distribute such Content on and through the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy Policy</h2>
                <p>
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the 
                  Service, to understand our practices.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Prohibited Uses</h2>
                <p>You may not use our Service:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>For any unlawful purpose or to solicit others to take unlawful actions</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                  <li>For any purpose that is unlawful or prohibited by these Terms</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Termination</h2>
                <p>
                  We may terminate or suspend your account and bar access to the Service immediately, without prior notice 
                  or liability, under our sole discretion, for any reason whatsoever and without limitation, including but 
                  not limited to a breach of the Terms.
                </p>
                <p>
                  If you wish to terminate your account, you may simply discontinue using the Service or contact us to 
                  request account deletion.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Disclaimer of Warranties</h2>
                <p>
                  <strong>THE INFORMATION ON THIS SERVICE IS PROVIDED ON AN "AS IS" BASIS.</strong> TO THE FULLEST EXTENT 
                  PERMITTED BY LAW, THIS COMPANY:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>EXCLUDES ALL REPRESENTATIONS AND WARRANTIES RELATING TO THIS SERVICE AND ITS CONTENTS</li>
                  <li>EXCLUDES ALL LIABILITY FOR DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THIS SERVICE</li>
                  <li>DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR FREE OF ERRORS</li>
                  <li>DOES NOT WARRANT THAT THE RESULTS OBTAINED FROM USE OF THE SERVICE WILL BE ACCURATE OR RELIABLE</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Limitation of Liability</h2>
                <p>
                  <strong>IN NO EVENT SHALL DRAFTSTOX, NOR ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR 
                  AFFILIATES, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, 
                  INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, 
                  RESULTING FROM YOUR USE OF THE SERVICE.</strong>
                </p>
                <p>
                  Some jurisdictions do not allow the exclusion of certain warranties or the exclusion or limitation of 
                  liability for consequential or incidental damages. Accordingly, some of the above limitations may not apply to you.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Indemnification</h2>
                <p>
                  You agree to defend, indemnify, and hold harmless DraftStox and its licensee and licensors, and their 
                  employees, contractors, agents, officers and directors, from and against any and all claims, damages, 
                  obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law</h2>
                <p>
                  These Terms shall be interpreted and governed by the laws of the State of [Your State], United States, 
                  without regard to its conflict of law provisions. Our failure to enforce any right or provision of these 
                  Terms will not be considered a waiver of those rights.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Dispute Resolution</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">14.1 Informal Resolution</h3>
                <p>
                  Before filing a claim against DraftStox, you agree to try to resolve the dispute informally by contacting 
                  us at legal@draftstox.com. We'll try to resolve the dispute informally by contacting you via email.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">14.2 Arbitration</h3>
                <p>
                  If we can't resolve the dispute informally, we both agree to resolve any claims relating to these Terms 
                  or the Service through final and binding arbitration, except as set forth below.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Changes to Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision 
                  is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
                <p>
                  Your continued use of the Service after we post any modifications to the Terms on this page will constitute 
                  your acknowledgment of the modifications and your consent to abide and be bound by the modified Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Severability</h2>
                <p>
                  If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed 
                  and interpreted to accomplish the objectives of such provision to the greatest extent possible under 
                  applicable law and the remaining provisions will continue in full force and effect.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Contact Information</h2>
                <p>If you have any questions about these Terms of Service, please contact us:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>By email: legal@draftstox.com</li>
                  <li>By visiting our contact page: https://draftstox.com/contact</li>
                  <li>By mail: DraftStox Legal Team, [Your Business Address]</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 