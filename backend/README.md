# Backend OAuth Integration Server

This backend server handles OAuth integrations for your clients, so they don't need to manage API keys themselves. The server acts as a proxy between your frontend and various third-party services.

## Features

- **Google OAuth**: Calendar, Gmail, and Drive access
- **Slack OAuth**: Channels, chat, users, and files access
- **Notion OAuth**: Database and page access
- **Session Management**: Secure cookie-based sessions
- **CORS Support**: Configured for frontend communication
- **Error Handling**: Comprehensive error handling and logging

## Setup

### 1. Environment Configuration

Copy the environment template and configure your OAuth credentials:

```bash
cp env.template .env
```

Edit `.env` with your actual OAuth credentials:

```env
# Server Configuration
PORT=3001
NODE_ENV=development
SESSION_SECRET=your-super-secret-session-key-here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Backend URL (for OAuth callbacks)
BACKEND_URL=http://localhost:3001

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Slack OAuth Configuration
SLACK_CLIENT_ID=your-slack-client-id
SLACK_CLIENT_SECRET=your-slack-client-secret

# Notion OAuth Configuration
NOTION_CLIENT_ID=your-notion-client-id
NOTION_CLIENT_SECRET=your-notion-client-secret
```

### 2. OAuth App Setup

#### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select existing one
3. Enable Google Calendar API, Gmail API, and Google Drive API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3001/api/integrations/google/callback`

#### Slack OAuth Setup
1. Go to [Slack API](https://api.slack.com/apps)
2. Create a new app
3. Go to OAuth & Permissions
4. Add redirect URL: `http://localhost:3001/api/integrations/slack/callback`
5. Add scopes: `channels:read`, `chat:write`, `users:read`, `files:read`

#### Notion OAuth Setup
1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Create a new integration
3. Add redirect URI: `http://localhost:3001/api/integrations/notion/callback`

### 3. Running the Server

#### Development Mode
```bash
# Run backend only
npm run backend:dev

# Run both frontend and backend
npm run dev:full
```

#### Production Mode
```bash
npm run backend
```

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Integrations
- `GET /api/integrations` - Get all integrations status
- `GET /api/integrations/:service` - Get specific integration status
- `DELETE /api/integrations/:service` - Disconnect integration

### OAuth Connect
- `POST /api/integrations/google/connect` - Initiate Google OAuth
- `POST /api/integrations/slack/connect` - Initiate Slack OAuth
- `POST /api/integrations/notion/connect` - Initiate Notion OAuth

### OAuth Callbacks
- `GET /api/integrations/google/callback` - Google OAuth callback
- `GET /api/integrations/slack/callback` - Slack OAuth callback
- `GET /api/integrations/notion/callback` - Notion OAuth callback

## Frontend Integration

Your frontend can connect to integrations like this:

```javascript
// Connect to Google
const response = await fetch('http://localhost:3001/api/integrations/google/connect', {
  method: 'POST',
  credentials: 'include'
});
const { url } = await response.json();
window.open(url, '_blank');

// Check integration status
const statusResponse = await fetch('http://localhost:3001/api/integrations', {
  credentials: 'include'
});
const integrations = await statusResponse.json();
```

## Security Features

- **Session Management**: Secure cookie-based sessions
- **CORS Protection**: Configured for specific frontend origins
- **Environment Variables**: All sensitive data in environment variables
- **Error Handling**: No sensitive data exposed in error messages
- **HTTPS Ready**: Configured for production HTTPS deployment

## Production Deployment

1. Set `NODE_ENV=production`
2. Use strong `SESSION_SECRET`
3. Configure proper `FRONTEND_URL` and `BACKEND_URL`
4. Use HTTPS for OAuth callbacks
5. Consider using a proper database instead of in-memory storage

## Database Integration

Currently uses in-memory storage for demo purposes. For production, integrate with:
- PostgreSQL
- MongoDB
- Redis
- Any other database of your choice

The integration data structure:
```javascript
{
  "user-id": {
    "google": { access_token, refresh_token, connectedAt },
    "slack": { access_token, team_id, connectedAt },
    "notion": { access_token, workspace_id, connectedAt }
  }
}
```







