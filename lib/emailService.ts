import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'your_service_id'; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'your_template_id'; // Replace with your EmailJS template ID
const EMAILJS_PUBLIC_KEY = 'your_public_key'; // Replace with your EmailJS public key

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  service: string;
  message: string;
  newsletter?: boolean;
}

export interface WaitlistData {
  email: string;
}

export class EmailService {
  private static initialized = false;

  static init() {
    if (!this.initialized) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      this.initialized = true;
    }
  }

  static async sendContactForm(data: ContactFormData): Promise<boolean> {
    try {
      this.init();
      
      const templateParams = {
        from_name: `${data.firstName} ${data.lastName}`,
        from_email: data.email,
        service_interest: data.service,
        message: data.message,
        newsletter: data.newsletter ? 'Yes' : 'No',
        to_email: 'contact@finstonelab.com'
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      return true;
    } catch (error) {
      console.error('Error sending contact form:', error);
      return false;
    }
  }

  static async addToWaitlist(data: WaitlistData): Promise<boolean> {
    try {
      this.init();
      
      const templateParams = {
        email: data.email,
        to_email: 'contact@finstonelab.com'
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        'waitlist_template_id', // You'll need a separate template for waitlist
        templateParams
      );

      return true;
    } catch (error) {
      console.error('Error adding to waitlist:', error);
      return false;
    }
  }
}

// Fallback method using a simple API endpoint
export const sendToAPI = async (endpoint: string, data: any): Promise<boolean> => {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.ok;
  } catch (error) {
    console.error(`Error sending to ${endpoint}:`, error);
    return false;
  }
};
