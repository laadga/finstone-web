import express from "express";
import dotenv from "dotenv";
import session from "cookie-session";
import { google } from "googleapis";
import axios from "axios";
import cors from "cors";

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  })
);

// Mock DB - In production, use a real database
const userIntegrations = {
  "user-1": { 
    google: null, 
    slack: null, 
    notion: null,
    airtable: null,
    hubspot: null,
    salesforce: null
  },
};

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// GET all integrations for a user
app.get("/api/integrations", (req, res) => {
  const userId = req.session.userId || "user-1"; // Default for demo
  
  if (!userIntegrations[userId]) {
    userIntegrations[userId] = { 
      google: null, 
      slack: null, 
      notion: null,
      airtable: null,
      hubspot: null,
      salesforce: null
    };
  }
  
  const integrations = Object.keys(userIntegrations[userId]).map((key) => ({
    name: key,
    status: userIntegrations[userId][key] ? "connected" : "disconnected",
    connectedAt: userIntegrations[userId][key]?.connectedAt || null
  }));
  
  res.json(integrations);
});

// GET specific integration status
app.get("/api/integrations/:service", (req, res) => {
  const userId = req.session.userId || "user-1";
  const service = req.params.service;
  
  if (!userIntegrations[userId] || !userIntegrations[userId][service]) {
    return res.json({ status: "disconnected" });
  }
  
  res.json({ 
    status: "connected",
    connectedAt: userIntegrations[userId][service].connectedAt
  });
});

//
// --- Google Integration
//
app.post("/api/integrations/google/connect", (req, res) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.BACKEND_URL || "http://localhost:3001"}/api/integrations/google/callback`
    );
    
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/calendar.readonly",
        "https://www.googleapis.com/auth/gmail.readonly",
        "https://www.googleapis.com/auth/drive.readonly"
      ],
      prompt: "consent"
    });
    
    res.json({ url });
  } catch (error) {
    console.error("Google OAuth error:", error);
    res.status(500).json({ error: "Failed to generate Google OAuth URL" });
  }
});

app.get("/api/integrations/google/callback", async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) {
      return res.status(400).send("❌ No authorization code received");
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.BACKEND_URL || "http://localhost:3001"}/api/integrations/google/callback`
    );
    
    const { tokens } = await oauth2Client.getToken(code);
    const userId = req.session.userId || "user-1";
    
    if (!userIntegrations[userId]) {
      userIntegrations[userId] = { 
        google: null, 
        slack: null, 
        notion: null,
        airtable: null,
        hubspot: null,
        salesforce: null
      };
    }
    
    userIntegrations[userId].google = {
      ...tokens,
      connectedAt: new Date().toISOString()
    };
    
    res.send(`
      <html>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h2>✅ Google Connected Successfully!</h2>
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
    console.error("Google callback error:", error);
    res.status(500).send("❌ Failed to connect Google account");
  }
});

//
// --- Slack Integration
//
app.post("/api/integrations/slack/connect", (req, res) => {
  try {
    const url = `https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=channels:read,chat:write,users:read,files:read&redirect_uri=${encodeURIComponent(`${process.env.BACKEND_URL || "http://localhost:3001"}/api/integrations/slack/callback`)}`;
    res.json({ url });
  } catch (error) {
    console.error("Slack OAuth error:", error);
    res.status(500).json({ error: "Failed to generate Slack OAuth URL" });
  }
});

app.get("/api/integrations/slack/callback", async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).send("❌ No authorization code received");
    }

    const response = await axios.post("https://slack.com/api/oauth.v2.access", null, {
      params: {
        code,
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        redirect_uri: `${process.env.BACKEND_URL || "http://localhost:3001"}/api/integrations/slack/callback`,
      },
    });
    
    const userId = req.session.userId || "user-1";
    
    if (!userIntegrations[userId]) {
      userIntegrations[userId] = { 
        google: null, 
        slack: null, 
        notion: null,
        airtable: null,
        hubspot: null,
        salesforce: null
      };
    }
    
    userIntegrations[userId].slack = {
      ...response.data,
      connectedAt: new Date().toISOString()
    };
    
    res.send(`
      <html>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h2>✅ Slack Connected Successfully!</h2>
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
    console.error("Slack callback error:", error);
    res.status(500).send("❌ Failed to connect Slack account");
  }
});

//
// --- Notion Integration
//
app.post("/api/integrations/notion/connect", (req, res) => {
  try {
    const url = `https://api.notion.com/v1/oauth/authorize?owner=user&client_id=${process.env.NOTION_CLIENT_ID}&redirect_uri=${encodeURIComponent(`${process.env.BACKEND_URL || "http://localhost:3001"}/api/integrations/notion/callback`)}&response_type=code`;
    res.json({ url });
  } catch (error) {
    console.error("Notion OAuth error:", error);
    res.status(500).json({ error: "Failed to generate Notion OAuth URL" });
  }
});

app.get("/api/integrations/notion/callback", async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).send("❌ No authorization code received");
    }

    const response = await axios.post("https://api.notion.com/v1/oauth/token", {
      grant_type: "authorization_code",
      code,
      redirect_uri: `${process.env.BACKEND_URL || "http://localhost:3001"}/api/integrations/notion/callback`,
      client_id: process.env.NOTION_CLIENT_ID,
      client_secret: process.env.NOTION_CLIENT_SECRET,
    });
    
    const userId = req.session.userId || "user-1";
    
    if (!userIntegrations[userId]) {
      userIntegrations[userId] = { 
        google: null, 
        slack: null, 
        notion: null,
        airtable: null,
        hubspot: null,
        salesforce: null
      };
    }
    
    userIntegrations[userId].notion = {
      ...response.data,
      connectedAt: new Date().toISOString()
    };
    
    res.send(`
      <html>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h2>✅ Notion Connected Successfully!</h2>
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
    console.error("Notion callback error:", error);
    res.status(500).send("❌ Failed to connect Notion account");
  }
});

//
// --- Airtable Integration
//
app.post("/api/integrations/airtable/connect", (req, res) => {
  try {
    const url = `https://airtable.com/oauth2/v1/authorize?client_id=${process.env.AIRTABLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(`${process.env.BACKEND_URL || "http://localhost:3001"}/api/integrations/airtable/callback`)}&response_type=code&scope=data.records:read%20data.records:write%20schema.bases:read`;
    res.json({ url });
  } catch (error) {
    console.error("Airtable OAuth error:", error);
    res.status(500).json({ error: "Failed to generate Airtable OAuth URL" });
  }
});

app.get("/api/integrations/airtable/callback", async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).send("❌ No authorization code received");
    }

    const response = await axios.post("https://airtable.com/oauth2/v1/token", {
      grant_type: "authorization_code",
      code,
      redirect_uri: `${process.env.BACKEND_URL || "http://localhost:3001"}/api/integrations/airtable/callback`,
      client_id: process.env.AIRTABLE_CLIENT_ID,
      client_secret: process.env.AIRTABLE_CLIENT_SECRET,
    });
    
    const userId = req.session.userId || "user-1";
    
    if (!userIntegrations[userId]) {
      userIntegrations[userId] = { 
        google: null, 
        slack: null, 
        notion: null,
        airtable: null,
        hubspot: null,
        salesforce: null
      };
    }
    
    userIntegrations[userId].airtable = {
      ...response.data,
      connectedAt: new Date().toISOString()
    };
    
    res.send(`
      <html>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h2>✅ Airtable Connected Successfully!</h2>
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
    console.error("Airtable callback error:", error);
    res.status(500).send("❌ Failed to connect Airtable account");
  }
});

//
// --- HubSpot Integration
//
app.post("/api/integrations/hubspot/connect", (req, res) => {
  try {
    const url = `https://app.hubspot.com/oauth/authorize?client_id=${process.env.HUBSPOT_CLIENT_ID}&redirect_uri=${encodeURIComponent(`${process.env.BACKEND_URL || "http://localhost:3001"}/api/integrations/hubspot/callback`)}&scope=contacts%20content%20automation%20crm.objects.contacts.read%20crm.objects.contacts.write`;
    res.json({ url });
  } catch (error) {
    console.error("HubSpot OAuth error:", error);
    res.status(500).json({ error: "Failed to generate HubSpot OAuth URL" });
  }
});

app.get("/api/integrations/hubspot/callback", async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).send("❌ No authorization code received");
    }

    const response = await axios.post("https://api.hubapi.com/oauth/v1/token", {
      grant_type: "authorization_code",
      code,
      redirect_uri: `${process.env.BACKEND_URL || "http://localhost:3001"}/api/integrations/hubspot/callback`,
      client_id: process.env.HUBSPOT_CLIENT_ID,
      client_secret: process.env.HUBSPOT_CLIENT_SECRET,
    });
    
    const userId = req.session.userId || "user-1";
    
    if (!userIntegrations[userId]) {
      userIntegrations[userId] = { 
        google: null, 
        slack: null, 
        notion: null,
        airtable: null,
        hubspot: null,
        salesforce: null
      };
    }
    
    userIntegrations[userId].hubspot = {
      ...response.data,
      connectedAt: new Date().toISOString()
    };
    
    res.send(`
      <html>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h2>✅ HubSpot Connected Successfully!</h2>
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
    console.error("HubSpot callback error:", error);
    res.status(500).send("❌ Failed to connect HubSpot account");
  }
});

//
// --- Salesforce Integration
//
app.post("/api/integrations/salesforce/connect", (req, res) => {
  try {
    const url = `https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=${process.env.SALESFORCE_CLIENT_ID}&redirect_uri=${encodeURIComponent(`${process.env.BACKEND_URL || "http://localhost:3001"}/api/integrations/salesforce/callback`)}&scope=api%20refresh_token`;
    res.json({ url });
  } catch (error) {
    console.error("Salesforce OAuth error:", error);
    res.status(500).json({ error: "Failed to generate Salesforce OAuth URL" });
  }
});

app.get("/api/integrations/salesforce/callback", async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).send("❌ No authorization code received");
    }

    const response = await axios.post("https://login.salesforce.com/services/oauth2/token", {
      grant_type: "authorization_code",
      code,
      redirect_uri: `${process.env.BACKEND_URL || "http://localhost:3001"}/api/integrations/salesforce/callback`,
      client_id: process.env.SALESFORCE_CLIENT_ID,
      client_secret: process.env.SALESFORCE_CLIENT_SECRET,
    });
    
    const userId = req.session.userId || "user-1";
    
    if (!userIntegrations[userId]) {
      userIntegrations[userId] = { 
        google: null, 
        slack: null, 
        notion: null,
        airtable: null,
        hubspot: null,
        salesforce: null
      };
    }
    
    userIntegrations[userId].salesforce = {
      ...response.data,
      connectedAt: new Date().toISOString()
    };
    
    res.send(`
      <html>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h2>✅ Salesforce Connected Successfully!</h2>
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
    console.error("Salesforce callback error:", error);
    res.status(500).send("❌ Failed to connect Salesforce account");
  }
});

//
// --- Disconnect Integration
//
app.delete("/api/integrations/:service", (req, res) => {
  const userId = req.session.userId || "user-1";
  const service = req.params.service;
  
  if (userIntegrations[userId] && userIntegrations[userId][service]) {
    userIntegrations[userId][service] = null;
    res.json({ message: `${service} disconnected successfully` });
  } else {
    res.status(404).json({ error: "Integration not found" });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Server error:", error);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
});
