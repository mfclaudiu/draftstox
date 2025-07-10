import React, { useEffect } from 'react';
import { Mail } from 'lucide-react';

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
    <div className="w-full max-w-md mx-auto">
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
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-200 
                       text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:border-transparent"
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
            className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold 
                     hover:bg-blue-700 transition-colors duration-200 flex items-center 
                     justify-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Join Waitlist
          </button>

          <div id="mce-responses" className="text-sm">
            <div id="mce-error-response" className="hidden text-red-600"></div>
            <div id="mce-success-response" className="hidden text-green-600"></div>
          </div>

          <p className="text-sm text-gray-500 text-center mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </form>
    </div>
  );
} 