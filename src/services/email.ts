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
  }

  async subscribe(data: EmailSignup): Promise<{ success: boolean; message?: string }> {
    // Always use fallback mode for preview
    console.log('Preview mode: Simulating email signup', data);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    return { success: true };
  }

  private trackEmailSignup(email: string) {
    // Mock tracking for preview
    console.log('Tracking signup:', email);
  }
}

export const emailService = new EmailService(); 