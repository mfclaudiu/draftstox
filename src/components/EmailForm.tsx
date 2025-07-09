import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { emailService } from '../services/email';

const emailSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface EmailFormProps {
  className?: string;
}

export function EmailForm({ className = '' }: EmailFormProps) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailFormData) => {
    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      const result = await emailService.subscribe(data);
      
      if (result.success) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Email submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md mx-auto ${className}`}>
      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">You're In!</h3>
            <p className="text-gray-300">
              Thanks for joining the waitlist. We'll notify you when DraftStox launches!
            </p>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="mt-4 text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200"
            >
              Add another email →
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div>
              <input
                {...register('name')}
                type="text"
                placeholder="Your Name"
                disabled={submitStatus === 'loading'}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-300 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register('email')}
                type="email"
                placeholder="Your Email"
                disabled={submitStatus === 'loading'}
                className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-300 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/30 rounded-lg p-3"
              >
                <p className="text-red-300 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errorMessage}
                </p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={submitStatus === 'loading'}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {submitStatus === 'loading' ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  Join Waitlist
                </>
              )}
            </button>

            <p className="text-gray-400 text-sm text-center">
              No spam, ever. Unsubscribe anytime.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
} 