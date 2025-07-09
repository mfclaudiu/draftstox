import React from 'react';
import { Users, TrendingUp, Shield } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Beta Tester',
    content: 'Finally, a way to learn investing that doesn\'t feel like homework. The game mechanics make it addictive!',
    icon: Users,
    gradient: 'from-purple-500 to-blue-500',
  },
  {
    name: 'Mike R.',
    role: 'Early Adopter',
    content: 'I learned more about portfolio diversification in one week than I did in months of reading articles.',
    icon: TrendingUp,
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    name: 'Alex K.',
    role: 'Finance Student',
    content: 'The risk-free environment let me experiment with strategies I\'d never try with real money.',
    icon: Shield,
    gradient: 'from-orange-500 to-red-500',
  },
];

export function TrustSection() {
  return (
    <section id="trust-credibility" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Trusted by Future Investors
          </h3>
          
          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => {
              const IconComponent = testimonial.icon;
              
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center mr-4`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    "{testimonial.content}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
} 