import React from 'react';
import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { QuizTeaser } from '../components/QuizTeaser';
import { TrustSection } from '../components/TrustSection';
import { EmailForm } from '../components/EmailForm';
import { Footer } from '../components/Footer';

interface LandingProps {
  onStartQuiz: () => void;
}

export function Landing({ onStartQuiz }: LandingProps) {
  const handleJoinWaitlist = () => {
    document.getElementById('email-capture')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero onStartQuiz={onStartQuiz} onJoinWaitlist={handleJoinWaitlist} />
      <HowItWorks />
      <QuizTeaser onStartQuiz={onStartQuiz} />
      
      {/* Email Capture Section */}
      <section id="email-capture" className="py-20 bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Be First to Play
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of future investors already on our waitlist. Get early access and exclusive beta features.
          </p>
          
          <EmailForm />
        </div>
      </section>

      <TrustSection />
      <Footer />
    </div>
  );
} 