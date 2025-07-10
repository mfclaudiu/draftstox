import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Target, TrendingUp, Trophy, Users, FileText, BarChart3 } from 'lucide-react';
import { Hero } from '../components/Hero';
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
      
      {/* 1. Hero Section */}
      <Hero onStartQuiz={handleStartQuiz} />
      
      {/* 2. Why DraftStox Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8 font-poppins">
              Why DraftStox?
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-deep-indigo to-purple-700 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-electric-teal rounded-full flex items-center justify-center">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-poppins">Safe Training Ground</h3>
                    <p className="text-blue-100 font-montserrat">No real money at risk</p>
                  </div>
                </div>
                <div className="space-y-4 font-montserrat">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-electric-teal rounded-full flex-shrink-0"></div>
                    <span>Fantasy portfolios with real market data</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-electric-teal rounded-full flex-shrink-0"></div>
                    <span>Learn from mistakes without consequences</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-electric-teal rounded-full flex-shrink-0"></div>
                    <span>Build confidence before investing real money</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 font-montserrat">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Most new investors lose money because they don't know who they are or what strategy fits them. DraftStox is built to fix that — before it costs you.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We give you a game, not a gamble — a safe, social, and strategic way to train for real-world markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Feature Grid Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8 font-poppins">
              How DraftStox Helps You Grow
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* DraftDNA Quiz */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-deep-indigo rounded-full flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-poppins">DraftDNA Quiz</h3>
              <p className="text-gray-600 font-montserrat text-sm">Discover your inner investor personality</p>
            </div>

            {/* Fantasy Portfolio */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-electric-teal rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-poppins">Fantasy Portfolio</h3>
              <p className="text-gray-600 font-montserrat text-sm">Learn strategy and performance — without risk</p>
            </div>

            {/* XP + Levels */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-matte-gold rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-poppins">XP + Levels</h3>
              <p className="text-gray-600 font-montserrat text-sm">Track your growth as an investor</p>
            </div>

            {/* Leagues & DraftPoints */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 font-poppins">Leagues & DraftPoints</h3>
              <p className="text-gray-600 font-montserrat text-sm">Stay competitive, social, and motivated</p>
            </div>

            {/* Weekly Reports */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow md:col-span-2">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg font-bold text-gray-900 mb-3 font-poppins">Weekly Reports</h3>
                <p className="text-gray-600 font-montserrat text-sm">Understand your strengths and blindspots</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 4. Quiz Preview Section */}
      <div className="bg-gray-50">
        <QuizTeaser onStartQuiz={handleStartQuiz} />
      </div>
      
      {/* 5. Waitlist Sign-Up Section */}
      <section id="email-capture" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 font-poppins">
            Be First to Join the League
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-montserrat">
            Get early access to leagues, DraftDNA insights, and investor growth tools.
          </p>
          <EmailForm />
        </div>
      </section>
      
      {/* 6. Footer */}
      <Footer />
    </div>
  );
} 