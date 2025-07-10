import React from 'react';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  onStartQuiz: () => void;
}

export function Hero({ onStartQuiz }: HeroProps) {
  return (
    <div className="relative overflow-hidden py-16 sm:py-24">
      <div className="relative">
        <div className="lg:mx-auto lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
            <div className="lg:py-24">
              <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                <span className="block">Invest like it's</span>
                <span className="block text-blue-600">a game</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Learn investing through play — no risk, all reward. Master the market with fantasy-style portfolio building.
              </p>
              <div className="mt-10 sm:mt-12">
                <div className="sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={onStartQuiz}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Take the Quiz
                      <ChevronRight className="ml-2 -mr-1 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
              <div className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none">
                <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 opacity-50"></div>
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Fantasy-Style Dashboard</h3>
                    <p className="text-gray-600">Interactive portfolio visualization with real-time market data</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 