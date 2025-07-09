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
  private formId = '5266853'; // Your ConvertKit form ID
  private apiKey = 'xBHJ4g9SEmwF7jDwsqVvgg'; // Your ConvertKit API key

  async subscribe(data: EmailSignup): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch(`${EmailService.BASE_URL}/forms/${this.formId}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: this.apiKey,
          email: data.email,
          first_name: data.name,
        }),
      });

      const result: ConvertKitResponse = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      if (result.subscription) {
        this.trackEmailSignup(data.email);
        return { success: true };
      }

      return { success: false, message: 'Failed to subscribe. Please try again.' };
    } catch (error) {
      console.error('Email subscription error:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to subscribe. Please try again.'
      };
    }
  }

  private trackEmailSignup(email: string) {
    // Analytics tracking
    console.log('Tracking signup:', email);
  }
}

export const emailService = new EmailService(); 