import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { QuizTeaser } from '../components/QuizTeaser';
import { EmailForm } from '../components/EmailForm';
import { Footer } from '../components/Footer';

interface LandingProps {
  onStartQuiz: () => void;
}

export function Landing({ onStartQuiz }: LandingProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero onStartQuiz={onStartQuiz} />
        <HowItWorks />
        <QuizTeaser onStartQuiz={onStartQuiz} />
        
        {/* Email Capture Section */}
        <section id="email-capture" className="py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Join the Waitlist
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Get early access and exclusive beta features when we launch.
            </p>
            <EmailForm />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
} 