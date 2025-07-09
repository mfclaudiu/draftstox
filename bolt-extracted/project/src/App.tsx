import React from 'react';
import { 
  TrendingUp, 
  Target, 
  Trophy, 
  Users, 
  ArrowRight, 
  Play, 
  Mail, 
  Twitter, 
  Linkedin, 
  Instagram,
  Star,
  BarChart3,
  GamepadIcon,
  Shield
} from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="block">Invest like it's a game.</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Because it is.
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              Learn investing through play — no risk, all reward. Master the market with fantasy-style portfolio building.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button 
                id="start-quiz"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Take the Quiz
              </button>
              <button 
                id="join-waitlist-hero"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-200 border border-white/20 hover:border-white/40 flex items-center gap-2"
              >
                Join the Waitlist
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Hero Visual Placeholder */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-6 h-64 sm:h-80 flex items-center justify-center">
                <div className="text-center text-white">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
                  <h3 className="text-2xl font-bold mb-2">Fantasy-Style Dashboard</h3>
                  <p className="text-gray-300">Interactive portfolio visualization coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to start your investing journey through gamified learning
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-200">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                1. Take a Quiz
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Discover your investing archetype with our personalized quiz. Are you a cautious saver or bold risk-taker?
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-cyan-500 to-teal-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-200">
                <GamepadIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                2. Build Your Portfolio
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Create your fantasy investment portfolio with virtual money. Experiment with stocks, ETFs, and crypto safely.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-200">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                3. Climb the Leaderboard
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Compete with friends, earn DraftPoints, and unlock achievements as you master investing strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Teaser */}
      <section id="quiz-teaser" className="py-20 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="mb-8">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Discover Your Investing Archetype
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Take our 2-minute quiz to unlock personalized investment strategies and find your perfect starting point.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <p className="text-gray-700 font-medium mb-2">✨ Quick Preview Questions:</p>
              <div className="text-left space-y-2 text-gray-600">
                <p>• How do you feel about market volatility?</p>
                <p>• What's your investment timeline?</p>
                <p>• Risk tolerance vs. potential returns?</p>
              </div>
            </div>
            
            <button 
              id="start-quiz-main"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
            >
              <Play className="w-5 h-5" />
              Start Quiz Now
            </button>
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section id="email-capture" className="py-20 bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Be First to Play
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of future investors already on our waitlist. Get early access and exclusive beta features.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md mx-auto">
            <form className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                />
              </div>
              <button 
                id="join-waitlist"
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Join Waitlist
              </button>
            </form>
            <p className="text-gray-400 text-sm mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Credibility */}
      <section id="trust-credibility" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Trusted by Future Investors
            </h3>
            
            {/* Testimonials Placeholder */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sarah M.</p>
                    <p className="text-gray-600 text-sm">Beta Tester</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Finally, a way to learn investing that doesn't feel like homework. The game mechanics make it addictive!"
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Mike R.</p>
                    <p className="text-gray-600 text-sm">Early Adopter</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "I learned more about portfolio diversification in one week than I did in months of reading articles."
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Alex K.</p>
                    <p className="text-gray-600 text-sm">Finance Student</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "The risk-free environment let me experiment with strategies I'd never try with real money."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">DraftStox</h3>
              <p className="text-gray-400">Invest like it's a game. Because it is.</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; 2024 DraftStox. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;