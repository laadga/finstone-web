// Airtable configuration - using REST API directly for better Netlify compatibility
function getAirtableConfig() {
  let apiKey = process.env.AIRTABLE_API_KEY || 'patOEr4oNOwYZxEoW.1944174626b223f9672c32f5ee7ae2f5250d5ef4d2ff15026d1eb769321ac138';
  const baseId = process.env.AIRTABLE_BASE_ID || 'appZQiMdgYVqnyATD';
  
  // Ensure API key has correct format
  if (apiKey && !apiKey.startsWith('pat')) {
    apiKey = `pat${apiKey}`;
  }
  
  // Debug logging
  console.log('🔍 Airtable Config Debug:');
  console.log('API Key exists:', !!apiKey);
  console.log('API Key length:', apiKey?.length);
  console.log('API Key starts with pat:', apiKey?.startsWith('pat'));
  console.log('Base ID exists:', !!baseId);
  console.log('Base ID:', baseId);
  
  return { apiKey, baseId };
}

async function createAirtableRecord(tableName: string, fields: any): Promise<boolean> {
  try {
    const { apiKey, baseId } = getAirtableConfig();
    
    const response = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: fields,
        typecast: true
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Airtable API Error: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`Airtable API Error: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Airtable record created:', result.id);
    return true;
  } catch (error) {
    console.error('❌ Airtable API Error:', error);
    return false;
  }
}

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
      const fields = {
        'First name': data.firstName,
        'Last name': data.lastName,
        'email': data.email,
        'service interest': data.service === 'ai-audit' ? 'AI Audit' : data.service === 'ai-workforce' ? 'AI Workforce' : data.service === 'enterprise' ? 'Enterprise' : 'Other',
        'Message': data.message,
        'Newsletter Opt-in': data.newsletter || false
      };
      
      return await createAirtableRecord('Contract submission', fields);
    } catch (error) {
      console.error('Error saving to Airtable:', error);
      return false;
    }
  }

  static async saveWaitlistSignup(data: WaitlistData): Promise<boolean> {
    try {
      const fields = {
        'email': data.email
      };
      
      return await createAirtableRecord('Newsletter', fields);
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
