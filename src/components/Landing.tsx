import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { QuizTeaser } from '../components/QuizTeaser';
import { EmailForm } from '../components/EmailForm';
import { Footer } from '../components/Footer';
import { SEOHead } from '../components/SEOHead';

// Why DraftStox Section Component
function WhyDraftStox() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-gray-900 mb-6">
              Why DraftStox?
            </h2>
            <div className="space-y-6 font-montserrat text-lg text-gray-700 leading-relaxed">
              <p>
                Most new investors lose money because they don't know who they are or what strategy fits them. DraftStox is built to fix that — before it costs you.
              </p>
              <p>
                We give you a game, not a gamble — a safe, social, and strategic way to train for real-world markets.
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="bg-gradient-to-br from-electric-teal/10 to-deep-indigo/10 rounded-2xl p-8 lg:p-12">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-electric-teal rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="font-poppins font-semibold text-xl text-gray-900">Risk-Free Learning</h3>
                  </div>
                  <p className="font-montserrat text-gray-600">
                    Practice with virtual money and real market data. Build confidence without financial risk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Feature Grid Section Component
function FeatureGrid() {
  const features = [
    {
      title: "DraftDNA Quiz",
      description: "Discover your inner investor personality",
      icon: "🧬"
    },
    {
      title: "Fantasy Portfolio",
      description: "Learn strategy and performance — without risk",
      icon: "📈"
    },
    {
      title: "XP + Levels",
      description: "Track your growth as an investor",
      icon: "⭐"
    },
    {
      title: "Leagues & DraftPoints",
      description: "Stay competitive, social, and motivated",
      icon: "🏆"
    },
    {
      title: "Weekly Reports",
      description: "Understand your strengths and blindspots",
      icon: "📊"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-gray-900 mb-6">
            How DraftStox Helps You Grow
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-poppins font-semibold text-xl text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="font-montserrat text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface LandingProps {
  onNavigateToQuiz: () => void;
}

export function Landing({ onNavigateToQuiz }: LandingProps) {
  const [showEmailForm, setShowEmailForm] = useState(false);

  return (
    <>
      <SEOHead 
        title="DraftStox - Play the Market Before You Pay the Market"
        description="Build confidence, strategy, and instinct as an investor — no money at risk, just pure skill-building. DraftStox turns investing into a game of growth."
        url="https://draftstox.com"
      />
      <div className="min-h-screen bg-white">
        <Hero onStartQuiz={onNavigateToQuiz} />
        <WhyDraftStox />
        <FeatureGrid />
        <QuizTeaser onStartQuiz={onNavigateToQuiz} />
        <EmailForm />
        <Footer />
      </div>
    </>
  );
} 