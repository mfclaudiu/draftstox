// Google Analytics and event tracking utilities

interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export function trackEvent({ action, category, label, value }: GAEvent): void {
  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // Plausible Analytics fallback
  if (typeof plausible !== 'undefined') {
    plausible(action, {
      props: {
        category,
        label,
        value: value?.toString(),
      },
    });
  }

  // Console log for development
  if (import.meta.env.DEV) {
    console.log('Analytics Event:', { action, category, label, value });
  }
}

// Predefined events for common actions
export const analytics = {
  // Quiz Events
  quizStarted: () => trackEvent({
    action: 'quiz_started',
    category: 'engagement',
    label: 'archetype_quiz',
  }),

  quizCompleted: (archetype: string) => trackEvent({
    action: 'quiz_completed',
    category: 'engagement',
    label: archetype,
  }),

  quizAbandoned: (questionNumber: number) => trackEvent({
    action: 'quiz_abandoned',
    category: 'engagement',
    label: `question_${questionNumber}`,
    value: questionNumber,
  }),

  // Email Events
  emailSignupStarted: () => trackEvent({
    action: 'email_signup_started',
    category: 'conversion',
    label: 'waitlist',
  }),

  emailSignupCompleted: () => trackEvent({
    action: 'email_signup_completed',
    category: 'conversion',
    label: 'waitlist',
  }),

  // Navigation Events
  pageView: (path: string) => trackEvent({
    action: 'page_view',
    category: 'navigation',
    label: path,
  }),

  // Social Sharing
  resultShared: (platform: string, archetype: string) => trackEvent({
    action: 'result_shared',
    category: 'social',
    label: `${platform}_${archetype}`,
  }),

  // How It Works Interaction
  howItWorksModalOpened: (stepNumber: number) => trackEvent({
    action: 'how_it_works_modal_opened',
    category: 'engagement',
    label: `step_${stepNumber}`,
    value: stepNumber,
  }),

  // Button Clicks
  ctaClicked: (buttonName: string, location: string) => trackEvent({
    action: 'cta_clicked',
    category: 'engagement',
    label: `${buttonName}_${location}`,
  }),
};

// Page view tracking for router
export function trackPageView(path: string): void {
  if (typeof gtag !== 'undefined') {
    gtag('config', import.meta.env.VITE_GA_TRACKING_ID, {
      page_path: path,
    });
  }

  analytics.pageView(path);
} 