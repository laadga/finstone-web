import Airtable from 'airtable';

// Airtable configuration
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || 'your_airtable_api_key';
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'your_airtable_base_id';

const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

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

export class AirtableService {
  static async saveContactForm(data: ContactFormData): Promise<boolean> {
    try {
      await base('Contract submission').create([
        {
          fields: {
            'First name': data.firstName,
            'Last name': data.lastName,
            'email': data.email,
            'service interest': data.service === 'ai-audit' ? 'AI Audit' : data.service === 'ai-workforce' ? 'AI Workforce' : data.service === 'enterprise' ? 'Enterprise' : 'Other',
            'Message': data.message,
            'Newsletter Opt-in': data.newsletter || false
          }
        }
      ]);
      return true;
    } catch (error) {
      console.error('Error saving to Airtable:', error);
      return false;
    }
  }

  static async saveWaitlistSignup(data: WaitlistData): Promise<boolean> {
    try {
      await base('Newsletter').create([
        {
          fields: {
            'email': data.email
          }
        }
      ]);
      return true;
    } catch (error) {
      console.error('Error saving waitlist to Airtable:', error);
      return false;
    }
  }
}

// Fallback: Simple file storage (for development)
export const saveToFile = async (type: 'contact' | 'waitlist', data: any): Promise<boolean> => {
  try {
    const fs = require('fs');
    const path = require('path');
    
    const filename = `${type}_submissions_${new Date().toISOString().split('T')[0]}.json`;
    const filepath = path.join(process.cwd(), 'data', filename);
    
    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Read existing data or create new array
    let existingData = [];
    if (fs.existsSync(filepath)) {
      existingData = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    }
    
    // Add new submission
    existingData.push({
      ...data,
      timestamp: new Date().toISOString()
    });
    
    // Write back to file
    fs.writeFileSync(filepath, JSON.stringify(existingData, null, 2));
    
    console.log(`Saved ${type} submission to ${filepath}`);
    return true;
  } catch (error) {
    console.error(`Error saving ${type} to file:`, error);
    return false;
  }
};
