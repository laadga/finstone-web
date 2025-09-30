# Adding New OAuth Integrations

This guide shows you how to add new OAuth integrations to your backend server. The pattern is consistent across all integrations, making it easy to add new services.

## 🎯 **Integration Pattern**

Every OAuth integration follows the same 4-step pattern:

1. **Connect Endpoint** - Initiates OAuth flow
2. **Callback Endpoint** - Handles OAuth response
3. **Environment Variables** - OAuth credentials
4. **Frontend Integration** - Client-side usage

## 📋 **Step-by-Step Guide**

### **Step 1: Add Environment Variables**

Add your OAuth credentials to `backend/env.template`:

```env
# New Service OAuth Configuration
# Get these from: https://service.com/developers
NEW_SERVICE_CLIENT_ID=your-client-id
NEW_SERVICE_CLIENT_SECRET=your-client-secret
```

### **Step 2: Add Backend Endpoints**

Add these two endpoints to `backend/index.js`:

```javascript
//
// --- New Service Integration
//
app.post("/api/integrations/newservice/connect", (req, res) => {
  try {
    const url = `https://service.com/oauth/authorize?client_id=${process.env.NEW_SERVICE_CLIENT_ID}&redirect_uri=${encodeURIComponent(`${process.env.BACKEND_URL || "http://localhost:3001"}/api/integrations/newservice/callback`)}&response_type=code&scope=required_scopes`;
    res.json({ url });
  } catch (error) {
    console.error("New Service OAuth error:", error);
    res.status(500).json({ error: "Failed to generate New Service OAuth URL" });
  }
});

app.get("/api/integrations/newservice/callback", async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).send("❌ No authorization code received");
    }

    const response = await axios.post("https://service.com/oauth/token", {
      grant_type: "authorization_code",
      code,
      redirect_uri: `${process.env.BACKEND_URL || "http://localhost:3001"}/api/integrations/newservice/callback`,
      client_id: process.env.NEW_SERVICE_CLIENT_ID,
      client_secret: process.env.NEW_SERVICE_CLIENT_SECRET,
    });
    
    const userId = req.session.userId || "user-1";
    
    if (!userIntegrations[userId]) {
      userIntegrations[userId] = { 
        google: null, 
        slack: null, 
        notion: null,
        airtable: null,
        hubspot: null,
        salesforce: null,
        newservice: null  // Add new service here
      };
    }
    
    userIntegrations[userId].newservice = {
      ...response.data,
      connectedAt: new Date().toISOString()
    };
    
    res.send(`
      <html>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h2>✅ New Service Connected Successfully!</h2>
          <p>You can now close this window and return to your application.</p>
          <script>
            setTimeout(() => {
              window.close();
            }, 2000);
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("New Service callback error:", error);
    res.status(500).send("❌ Failed to connect New Service account");
  }
});
```

### **Step 3: Update User Integrations Object**

Add the new service to the user integrations object in all places:

```javascript
// In the mock DB initialization
const userIntegrations = {
  "user-1": { 
    google: null, 
    slack: null, 
    notion: null,
    airtable: null,
    hubspot: null,
    salesforce: null,
    newservice: null  // Add here
  },
};

// In all callback functions, update the userIntegrations initialization
if (!userIntegrations[userId]) {
  userIntegrations[userId] = { 
    google: null, 
    slack: null, 
    notion: null,
    airtable: null,
    hubspot: null,
    salesforce: null,
    newservice: null  // Add here
  };
}
```

### **Step 4: Update Frontend Example**

Add usage examples to `backend/frontend-example.js`:

```javascript
// Example: Connect to New Service
async function connectNewService() {
  try {
    console.log('Connecting to New Service...');
    const result = await oauth.connectService('newservice');
    console.log('New Service connected:', result);
  } catch (error) {
    console.error('New Service connection failed:', error);
  }
}
```

## 🔧 **OAuth Service Configuration**

### **Common OAuth Parameters:**

| Parameter | Description | Example |
|-----------|-------------|---------|
| `client_id` | Your app's client ID | `abc123def456` |
| `client_secret` | Your app's client secret | `secret789xyz` |
| `redirect_uri` | Callback URL | `http://localhost:3001/api/integrations/service/callback` |
| `response_type` | OAuth response type | `code` |
| `scope` | Requested permissions | `read write admin` |

### **OAuth URLs by Service:**

| Service | Authorization URL | Token URL |
|---------|------------------|-----------|
| Google | `https://accounts.google.com/oauth/authorize` | `https://oauth2.googleapis.com/token` |
| Slack | `https://slack.com/oauth/v2/authorize` | `https://slack.com/api/oauth.v2.access` |
| Notion | `https://api.notion.com/v1/oauth/authorize` | `https://api.notion.com/v1/oauth/token` |
| Airtable | `https://airtable.com/oauth2/v1/authorize` | `https://airtable.com/oauth2/v1/token` |
| HubSpot | `https://app.hubspot.com/oauth/authorize` | `https://api.hubapi.com/oauth/v1/token` |
| Salesforce | `https://login.salesforce.com/services/oauth2/authorize` | `https://login.salesforce.com/services/oauth2/token` |

## 🚀 **Popular Integrations to Add**

### **1. Microsoft 365**
```javascript
// Authorization URL
const url = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${process.env.MICROSOFT_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(callbackUrl)}&scope=https://graph.microsoft.com/User.Read%20https://graph.microsoft.com/Calendars.ReadWrite`;

// Token URL
const response = await axios.post("https://login.microsoftonline.com/common/oauth2/v2.0/token", {
  grant_type: "authorization_code",
  code,
  redirect_uri: callbackUrl,
  client_id: process.env.MICROSOFT_CLIENT_ID,
  client_secret: process.env.MICROSOFT_CLIENT_SECRET,
});
```

### **2. GitHub**
```javascript
// Authorization URL
const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(callbackUrl)}&scope=repo%20user`;

// Token URL
const response = await axios.post("https://github.com/login/oauth/access_token", {
  grant_type: "authorization_code",
  code,
  redirect_uri: callbackUrl,
  client_id: process.env.GITHUB_CLIENT_ID,
  client_secret: process.env.GITHUB_CLIENT_SECRET,
});
```

### **3. Dropbox**
```javascript
// Authorization URL
const url = `https://www.dropbox.com/oauth2/authorize?client_id=${process.env.DROPBOX_CLIENT_ID}&redirect_uri=${encodeURIComponent(callbackUrl)}&response_type=code`;

// Token URL
const response = await axios.post("https://api.dropboxapi.com/oauth2/token", {
  grant_type: "authorization_code",
  code,
  redirect_uri: callbackUrl,
  client_id: process.env.DROPBOX_CLIENT_ID,
  client_secret: process.env.DROPBOX_CLIENT_SECRET,
});
```

### **4. Zoom**
```javascript
// Authorization URL
const url = `https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.ZOOM_CLIENT_ID}&redirect_uri=${encodeURIComponent(callbackUrl)}&scope=user:read%20meeting:write`;

// Token URL
const response = await axios.post("https://zoom.us/oauth/token", {
  grant_type: "authorization_code",
  code,
  redirect_uri: callbackUrl,
  client_id: process.env.ZOOM_CLIENT_ID,
  client_secret: process.env.ZOOM_CLIENT_SECRET,
});
```

### **5. Stripe**
```javascript
// Authorization URL
const url = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.STRIPE_CLIENT_ID}&scope=read_write&redirect_uri=${encodeURIComponent(callbackUrl)}`;

// Token URL
const response = await axios.post("https://connect.stripe.com/oauth/token", {
  grant_type: "authorization_code",
  code,
  redirect_uri: callbackUrl,
  client_id: process.env.STRIPE_CLIENT_ID,
  client_secret: process.env.STRIPE_CLIENT_SECRET,
});
```

## 🔍 **Testing New Integrations**

### **1. Test OAuth Flow**
```bash
# Test the connect endpoint
curl -X POST http://localhost:3001/api/integrations/newservice/connect

# Should return: {"url": "https://service.com/oauth/authorize?..."}
```

### **2. Test Integration Status**
```bash
# Check if integration appears in the list
curl http://localhost:3001/api/integrations

# Should include: {"name": "newservice", "status": "disconnected"}
```

### **3. Test Frontend Integration**
```javascript
// Test in browser console
const oauth = new OAuthIntegration();
await oauth.connectService('newservice');
```

## 🛠 **Troubleshooting**

### **Common Issues:**

1. **Invalid Redirect URI**
   - Ensure callback URL matches exactly in OAuth app settings
   - Check for trailing slashes and protocol (http vs https)

2. **Invalid Scope**
   - Verify requested scopes are available for your OAuth app
   - Check service documentation for required permissions

3. **Token Exchange Fails**
   - Verify client_id and client_secret are correct
   - Check if token endpoint URL is correct
   - Ensure grant_type is "authorization_code"

4. **CORS Issues**
   - Verify CORS configuration in backend
   - Check if frontend URL is in allowed origins

### **Debug Tips:**

```javascript
// Add logging to debug OAuth flow
console.log('OAuth URL:', url);
console.log('Callback code:', code);
console.log('Token response:', response.data);
```

## 📚 **Resources**

- [OAuth 2.0 Specification](https://tools.ietf.org/html/rfc6749)
- [OAuth.com](https://oauth.com/) - Comprehensive OAuth guide
- [Service-specific documentation](https://service.com/developers) - Check each service's OAuth docs

## 🎯 **Best Practices**

1. **Security**
   - Never expose client secrets in frontend code
   - Use environment variables for all credentials
   - Implement proper session management

2. **Error Handling**
   - Always wrap OAuth calls in try-catch blocks
   - Provide meaningful error messages to users
   - Log errors for debugging

3. **User Experience**
   - Use popup windows for OAuth flows
   - Provide clear success/error messages
   - Allow easy disconnect functionality

4. **Maintenance**
   - Keep OAuth apps updated
   - Monitor token expiration
   - Implement token refresh logic

This pattern makes it easy to add any OAuth service to your backend! 🚀







