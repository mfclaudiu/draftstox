import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { QuizTeaser } from '../components/QuizTeaser';
import { EmailForm } from '../components/EmailForm';
import { Footer } from '../components/Footer';
import { SEOHead } from '../components/SEOHead';

export function Landing() {
  const navigate = useNavigate();
  const handleStartQuiz = () => navigate('/quiz');

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="DraftStox - Learn Investing Through Fantasy Trading"
        description="Master the stock market with our fantasy trading platform. Take the quiz, build your portfolio, and learn investing through play - no risk, all reward."
        keywords="fantasy trading, stock market game, investment learning, portfolio simulator, stock quiz"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero onStartQuiz={handleStartQuiz} />
        <HowItWorks />
        <QuizTeaser onStartQuiz={handleStartQuiz} />
        
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