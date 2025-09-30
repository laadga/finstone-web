# n8n Integration Setup Guide

## 🚀 Complete Implementation Steps

### **Step 1: Environment Variables**
Create a `.env.local` file in your project root with:

```env
# n8n Configuration
N8N_API_KEY=your_n8n_api_key_here
N8N_BASE_URL=https://your-n8n-instance.com
NEXT_PUBLIC_API_URL=http://localhost:3000

# Database Configuration (if using a database)
DATABASE_URL=your_database_url_here

# Authentication (if using auth)
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### **Step 2: n8n Setup**

#### **2.1 Create Webhook Workflows**
For each agent in your marketplace:

1. **Go to your n8n instance**
2. **Create a new workflow** for each agent
3. **Add a Webhook trigger** as the first node
4. **Configure the webhook**:
   - Method: POST
   - Path: `/webhook/{agent-name}`
   - Authentication: API Key (optional)
5. **Add your automation logic** after the webhook
6. **Test the workflow** to get the webhook URL

#### **2.2 Update Webhook URLs**
In `src/lib/n8n-config.ts`, update the `webhookUrl` for each agent:

```typescript
{
  id: 'personal-ai-assistant',
  name: 'Personal AI Assistant',
  webhookUrl: 'https://YOUR-N8N-INSTANCE.com/webhook/personal-ai-assistant',
  // ... rest of config
}
```

### **Step 3: Database Setup (Optional)**

#### **3.1 Install Prisma (if using database)**
```bash
npm install prisma @prisma/client
npx prisma init
```

#### **3.2 Create Database Schema**
```prisma
// prisma/schema.prisma
model AgentDeployment {
  id          String   @id @default(cuid())
  agentId     String
  userId      String
  status      String   @default("deployed")
  deployedAt  DateTime @default(now())
  configuration Json
  n8nWorkflowId String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  deployments AgentDeployment[]
}
```

### **Step 4: Authentication Setup (Optional)**

#### **4.1 Install NextAuth.js**
```bash
npm install next-auth
```

#### **4.2 Create Auth Configuration**
```typescript
// src/lib/auth.ts
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async session({ session, token }) {
      return session
    }
  }
})
```

### **Step 5: Testing the Integration**

#### **5.1 Test Agent Deployment**
1. **Start your development server**: `npm run dev`
2. **Go to the marketplace**: `http://localhost:3000/saas/marketplace-new`
3. **Click on any agent** to open the detail modal
4. **Click "Start Using Agent"** to test deployment
5. **Check your n8n instance** to see if the webhook was triggered

#### **5.2 Test Webhook Endpoints**
```bash
# Test the deployment API
curl -X POST http://localhost:3000/api/agents/deploy \
  -H "Content-Type: application/json" \
  -d '{
    "agentId": "personal-ai-assistant",
    "userId": "test-user-123",
    "configuration": {
      "user_id": "test-user-123",
      "task_description": "Test task"
    }
  }'
```

### **Step 6: Production Deployment**

#### **6.1 Deploy to Vercel/Netlify**
1. **Push your code** to GitHub
2. **Connect to Vercel/Netlify**
3. **Add environment variables** in your hosting platform
4. **Deploy**

#### **6.2 Update n8n URLs**
Update all webhook URLs in `n8n-config.ts` to use your production domain.

### **Step 7: Monitoring & Analytics**

#### **7.1 Add Logging**
```typescript
// Add to your API routes
console.log('Agent deployment:', {
  agentId,
  userId,
  timestamp: new Date().toISOString(),
  status: 'success'
});
```

#### **7.2 Add Error Handling**
```typescript
// Add comprehensive error handling
try {
  const result = await deployAgent(agentId, userId, config);
  return NextResponse.json({ success: true, result });
} catch (error) {
  console.error('Deployment error:', error);
  return NextResponse.json(
    { error: 'Deployment failed', details: error.message },
    { status: 500 }
  );
}
```

## 🎯 What You Get

### **✅ Complete Integration**
- **Real agent deployment** to n8n workflows
- **Configuration modals** for each agent
- **User management** and deployment tracking
- **Error handling** and validation
- **Production-ready** code

### **✅ User Experience**
- **One-click deployment** for simple agents
- **Configuration forms** for complex agents
- **Real-time status** updates
- **Professional UI** with loading states

### **✅ Developer Experience**
- **Type-safe** TypeScript code
- **Modular architecture** for easy maintenance
- **Comprehensive error handling**
- **Easy to extend** with new agents

## 🔧 Next Steps

1. **Set up your n8n instance** and create webhook workflows
2. **Update the webhook URLs** in the config file
3. **Test the integration** with a few agents
4. **Add authentication** if needed
5. **Deploy to production**

## 📞 Support

If you need help with any step, I can:
- Help you set up specific n8n workflows
- Debug integration issues
- Add more features (user dashboard, analytics, etc.)
- Optimize the deployment process

Just let me know what you'd like to work on next!






