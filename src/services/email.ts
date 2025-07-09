import { EmailSignup } from '../types';

interface ConvertKitResponse {
  subscription?: {
    id: number;
    state: string;
    created_at: string;
    email_address: string;
  };
  error?: string;
}

export class EmailService {
  private static readonly BASE_URL = 'https://api.convertkit.com/v3';
  private formId: string;
  private apiKey: string;

  constructor() {
    this.formId = import.meta.env.VITE_CONVERTKIT_FORM_ID || '';
    this.apiKey = import.meta.env.VITE_CONVERTKIT_API_KEY || '';
    
    if (!this.formId || !this.apiKey) {
      console.warn('ConvertKit credentials not found. Email signup will use fallback.');
    }
  }

  async subscribe(data: EmailSignup): Promise<{ success: boolean; message?: string }> {
    try {
      // If credentials are not configured, simulate success for development
      if (!this.formId || !this.apiKey) {
        console.log('Development mode: Simulating email signup', data);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        return { success: true };
      }

      const response = await fetch(`${EmailService.BASE_URL}/forms/${this.formId}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: this.apiKey,
          email: data.email,
          first_name: data.name,
          tags: ['draftstox-waitlist'],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ConvertKitResponse = await response.json();
      
      if (result.subscription) {
        // Track successful signup
        this.trackEmailSignup(data.email);
        return { success: true };
      } else {
        return { 
          success: false, 
          message: result.error || 'Subscription failed' 
        };
      }
    } catch (error) {
      console.error('Email subscription error:', error);
      return { 
        success: false, 
        message: 'Network error. Please try again.' 
      };
    }
  }

  private trackEmailSignup(email: string): void {
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'email_signup', {
        event_category: 'engagement',
        event_label: 'waitlist',
        custom_parameter: email,
      });
    }

    // You can add other analytics tracking here
    console.log('Email signup tracked:', email);
  }
}

export const emailService = new EmailService(); 