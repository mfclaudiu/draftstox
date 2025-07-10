import React, { useEffect } from 'react';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export function EmailForm() {
  useEffect(() => {
    // Add Mailchimp validation script
    const script = document.createElement('script');
    script.src = '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize Mailchimp validation
      const w = window as any;
      w.fnames = new Array();
      w.ftypes = new Array();
      w.fnames[0] = 'EMAIL';
      w.ftypes[0] = 'email';
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-deep-indigo">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 
          className="font-poppins font-bold text-3xl lg:text-4xl text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Be First to Join the League
        </motion.h2>
        
        <motion.p 
          className="font-montserrat text-lg lg:text-xl text-gray-200 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Get early access to leagues, DraftDNA insights, and investor growth tools.
        </motion.p>

        <motion.div 
          className="w-full max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <form
            action="https://draftstox.us10.list-manage.com/subscribe/post?u=0b8ad6b1562fbf1827daa5225&amp;id=82435b5c5f&amp;f_id=004104e2f0"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
          >
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  name="EMAIL"
                  id="mce-EMAIL"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 
                           text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 
                           focus:ring-electric-teal focus:border-electric-teal font-montserrat"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Bot protection - do not remove */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
                <input
                  type="text"
                  name="b_0b8ad6b1562fbf1827daa5225_82435b5c5f"
                  tabIndex={-1}
                  defaultValue=""
                />
              </div>

              <button
                type="submit"
                name="subscribe"
                id="mc-embedded-subscribe"
                className="w-full bg-electric-teal text-deep-indigo px-8 py-3 rounded-lg font-montserrat font-semibold 
                         hover:bg-teal-400 transition-colors duration-200 flex items-center 
                         justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                Join Waitlist
              </button>

              <div id="mce-responses" className="text-sm">
                <div id="mce-error-response" className="hidden text-red-400"></div>
                <div id="mce-success-response" className="hidden text-electric-teal"></div>
              </div>

              <p className="font-montserrat text-sm text-gray-300 text-center mt-4">
                No spam, ever. Unsubscribe anytime.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
} 