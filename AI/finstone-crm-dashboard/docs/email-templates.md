# Email Templates

This document contains ready-to-use email templates for the Finstone CRM system. These templates can be used for onboarding, outreach, and customer communication.

## Onboarding Templates

### 1. Welcome Email

**Subject:** Welcome to Finstone AI - Let's get started!

**Template:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome to Finstone AI</title>
</head>
<body style="font-family: Inter, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
        <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #3ABEFF 0%, #2563EB 100%); border-radius: 12px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 24px; font-weight: bold;">F</span>
        </div>
        <h1 style="color: #0B1C2C; margin: 0;">Welcome to Finstone AI!</h1>
    </div>

    <p>Hi {{customer_name}},</p>

    <p>Welcome to Finstone AI! We're excited to help you revolutionize your business with our AI workforce.</p>

    <p>Your account has been set up and you're ready to start your journey. Here's what happens next:</p>

    <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #0B1C2C; margin-top: 0;">Next Steps:</h3>
        <ol style="margin: 0; padding-left: 20px;">
            <li><strong>Kickoff Call</strong> - We'll schedule a 30-minute call to understand your needs</li>
            <li><strong>Integration Setup</strong> - Connect your existing tools and systems</li>
            <li><strong>Agent Provisioning</strong> - Deploy your custom AI agents</li>
            <li><strong>Training & Launch</strong> - Learn how to manage your AI workforce</li>
        </ol>
    </div>

    <p>Your dedicated success manager, {{success_manager}}, will be in touch within 24 hours to schedule your kickoff call.</p>

    <div style="text-align: center; margin: 30px 0;">
        <a href="{{dashboard_url}}" style="background: #3ABEFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block;">Access Your Dashboard</a>
    </div>

    <p>If you have any questions, don't hesitate to reach out to our support team at <a href="mailto:support@finstone.ai">support@finstone.ai</a>.</p>

    <p>Welcome aboard!</p>
    <p><strong>The Finstone AI Team</strong></p>

    <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
    <p style="font-size: 12px; color: #6B7280; text-align: center;">
        Finstone AI • Building the Future of Work<br>
        <a href="{{unsubscribe_url}}">Unsubscribe</a> | <a href="{{privacy_url}}">Privacy Policy</a>
    </p>
</body>
</html>
```

### 2. Kickoff Call Scheduled

**Subject:** Your Finstone AI kickoff call is scheduled

**Template:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Kickoff Call Scheduled</title>
</head>
<body style="font-family: Inter, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #0B1C2C; margin: 0;">Kickoff Call Scheduled! 🎉</h1>
    </div>

    <p>Hi {{customer_name}},</p>

    <p>Great news! Your kickoff call has been scheduled with {{success_manager}}.</p>

    <div style="background: #EBF8FF; border: 1px solid #3ABEFF; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #0B1C2C; margin-top: 0;">Call Details:</h3>
        <p><strong>Date:</strong> {{call_date}}</p>
        <p><strong>Time:</strong> {{call_time}} ({{timezone}})</p>
        <p><strong>Duration:</strong> 30 minutes</p>
        <p><strong>Meeting Link:</strong> <a href="{{meeting_url}}">{{meeting_url}}</a></p>
    </div>

    <p>During this call, we'll:</p>
    <ul>
        <li>Review your business goals and challenges</li>
        <li>Discuss which AI agents will work best for your needs</li>
        <li>Plan your integration and deployment timeline</li>
        <li>Answer any questions you have</li>
    </ul>

    <p>Please come prepared with:</p>
    <ul>
        <li>Your current workflow and pain points</li>
        <li>Key metrics you'd like to improve</li>
        <li>Any specific use cases you have in mind</li>
    </ul>

    <p>If you need to reschedule, please let us know at least 24 hours in advance.</p>

    <p>Looking forward to speaking with you!</p>
    <p><strong>{{success_manager}}</strong><br>Customer Success Manager</p>
</body>
</html>
```

### 3. Integration Setup Prompt

**Subject:** Time to connect your tools - Integration setup

**Template:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Integration Setup</title>
</head>
<body style="font-family: Inter, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #0B1C2C; margin: 0;">Let's Connect Your Tools 🔗</h1>
    </div>

    <p>Hi {{customer_name}},</p>

    <p>Now that we've completed your kickoff call, it's time to connect your existing tools and systems to Finstone AI.</p>

    <p>Based on our discussion, we recommend connecting these integrations:</p>

    <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #0B1C2C; margin-top: 0;">Recommended Integrations:</h3>
        <ul style="margin: 0; padding-left: 20px;">
            {{#each recommended_integrations}}
            <li><strong>{{name}}</strong> - {{description}}</li>
            {{/each}}
        </ul>
    </div>

    <div style="text-align: center; margin: 30px 0;">
        <a href="{{integrations_url}}" style="background: #3ABEFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block;">Set Up Integrations</a>
    </div>

    <p><strong>Need help?</strong> Our integration specialists are standing by to assist you. Simply reply to this email or schedule a quick call.</p>

    <p>Once your integrations are connected, we'll move on to provisioning your AI agents!</p>

    <p>Best regards,<br><strong>The Finstone AI Team</strong></p>
</body>
</html>
```

### 4. Agent Provisioning Complete

**Subject:** Your AI agents are ready! 🚀

**Template:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Agents Ready</title>
</head>
<body style="font-family: Inter, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #0B1C2C; margin: 0;">Your AI Agents Are Live! 🤖</h1>
    </div>

    <p>Hi {{customer_name}},</p>

    <p>Exciting news! Your AI agents have been successfully provisioned and are now ready to work for your business.</p>

    <div style="background: #ECFDF5; border: 1px solid #10B981; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #0B1C2C; margin-top: 0;">Deployed Agents:</h3>
        {{#each deployed_agents}}
        <div style="margin: 10px 0; padding: 10px; background: white; border-radius: 6px;">
            <strong>{{type}}</strong> - {{status}}<br>
            <small style="color: #6B7280;">{{description}}</small>
        </div>
        {{/each}}
    </div>

    <p>Your agents are now:</p>
    <ul>
        <li>✅ Connected to your integrated systems</li>
        <li>✅ Trained on your business processes</li>
        <li>✅ Ready to handle tasks 24/7</li>
        <li>✅ Monitored for optimal performance</li>
    </ul>

    <div style="text-align: center; margin: 30px 0;">
        <a href="{{dashboard_url}}" style="background: #3ABEFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block;">Manage Your Agents</a>
    </div>

    <p><strong>What's next?</strong></p>
    <p>We'll schedule a training session to show you how to monitor, manage, and optimize your AI workforce. You'll also receive your first performance report in 7 days.</p>

    <p>Welcome to the future of work!</p>
    <p><strong>The Finstone AI Team</strong></p>
</body>
</html>
```

## Outreach Templates

### 5. Cold Outreach - LinkedIn

**Subject:** Quick question about your {{company}} operations

**Template:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Cold Outreach</title>
</head>
<body style="font-family: Inter, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <p>Hi {{prospect_name}},</p>

    <p>I noticed {{company}} is growing rapidly - congratulations on the success!</p>

    <p>I'm reaching out because I work with companies like yours to solve a common challenge: scaling operations without proportionally scaling headcount.</p>

    <p>Many of our clients have found that AI agents can handle routine tasks like:</p>
    <ul>
        <li>Customer support inquiries</li>
        <li>Lead qualification and follow-up</li>
        <li>Data entry and reporting</li>
        <li>Appointment scheduling</li>
    </ul>

    <p>This frees up their human team to focus on strategy, relationships, and high-value activities.</p>

    <p>Would you be interested in a 15-minute call to discuss how this might apply to {{company}}?</p>

    <p>I can share some specific examples of how similar companies have implemented AI agents to scale their operations.</p>

    <p>Best regards,<br><strong>{{sender_name}}</strong><br>Finstone AI</p>

    <p style="font-size: 12px; color: #6B7280;">
        P.S. If this isn't relevant right now, no worries - just let me know and I'll remove you from future outreach.
    </p>
</body>
</html>
```

### 6. Follow-up Email

**Subject:** Following up on our conversation about AI agents

**Template:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Follow-up</title>
</head>
<body style="font-family: Inter, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <p>Hi {{prospect_name}},</p>

    <p>I wanted to follow up on our conversation about implementing AI agents at {{company}}.</p>

    <p>I've put together a quick case study that might be relevant to your situation:</p>

    <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #0B1C2C; margin-top: 0;">Case Study: {{similar_company}}</h3>
        <p><strong>Challenge:</strong> {{challenge}}</p>
        <p><strong>Solution:</strong> {{solution}}</p>
        <p><strong>Results:</strong> {{results}}</p>
    </div>

    <p>I think {{company}} could see similar benefits, particularly in {{specific_area}}.</p>

    <p>Would you be available for a brief 20-minute demo next week? I can show you exactly how this would work for your use case.</p>

    <p>Here are some times that work for me:</p>
    <ul>
        <li>Tuesday, 2:00 PM EST</li>
        <li>Wednesday, 10:00 AM EST</li>
        <li>Thursday, 3:00 PM EST</li>
    </ul>

    <p>Or feel free to suggest a time that works better for you.</p>

    <p>Best,<br><strong>{{sender_name}}</strong></p>
</body>
</html>
```

### 7. Demo Invitation

**Subject:** Demo invitation - See AI agents in action

**Template:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Demo Invitation</title>
</head>
<body style="font-family: Inter, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #0B1C2C; margin: 0;">Demo Invitation 🎯</h1>
    </div>

    <p>Hi {{prospect_name}},</p>

    <p>Thank you for your interest in Finstone AI! I'm excited to show you how AI agents can transform your business operations.</p>

    <div style="background: #EBF8FF; border: 1px solid #3ABEFF; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #0B1C2C; margin-top: 0;">Demo Details:</h3>
        <p><strong>Date:</strong> {{demo_date}}</p>
        <p><strong>Time:</strong> {{demo_time}} ({{timezone}})</p>
        <p><strong>Duration:</strong> 30 minutes</p>
        <p><strong>Meeting Link:</strong> <a href="{{meeting_url}}">{{meeting_url}}</a></p>
    </div>

    <p>During the demo, I'll show you:</p>
    <ul>
        <li>Live AI agents handling real tasks</li>
        <li>How to set up and manage your AI workforce</li>
        <li>Integration with your existing tools</li>
        <li>Performance metrics and reporting</li>
        <li>ROI calculations specific to {{company}}</li>
    </ul>

    <p>I'll also prepare a customized proposal based on your specific needs and use cases.</p>

    <p>Looking forward to showing you the future of work!</p>

    <p>Best regards,<br><strong>{{sender_name}}</strong><br>Sales Director, Finstone AI</p>

    <div style="text-align: center; margin: 30px 0;">
        <a href="{{calendar_url}}" style="background: #3ABEFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block;">Add to Calendar</a>
    </div>
</body>
</html>
```

### 8. Proposal Follow-up

**Subject:** Your custom AI agent proposal is ready

**Template:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Proposal Ready</title>
</head>
<body style="font-family: Inter, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #0B1C2C; margin: 0;">Your Proposal is Ready 📋</h1>
    </div>

    <p>Hi {{prospect_name}},</p>

    <p>Thank you for the great demo session! I've prepared a customized proposal for implementing AI agents at {{company}}.</p>

    <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #0B1C2C; margin-top: 0;">Proposal Highlights:</h3>
        <ul style="margin: 0; padding-left: 20px;">
            <li><strong>Recommended Agents:</strong> {{agent_types}}</li>
            <li><strong>Implementation Timeline:</strong> {{timeline}}</li>
            <li><strong>Expected ROI:</strong> {{roi}}</li>
            <li><strong>Monthly Investment:</strong> {{investment}}</li>
        </ul>
    </div>

    <p>The proposal includes:</p>
    <ul>
        <li>Detailed implementation plan</li>
        <li>Custom agent configurations</li>
        <li>Integration roadmap</li>
        <li>Training and support plan</li>
        <li>Success metrics and KPIs</li>
    </ul>

    <div style="text-align: center; margin: 30px 0;">
        <a href="{{proposal_url}}" style="background: #3ABEFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 500; display: inline-block;">View Full Proposal</a>
    </div>

    <p>I'm available to discuss any questions you have about the proposal. Would you like to schedule a brief call to go through it together?</p>

    <p>I'm confident this solution will help {{company}} scale efficiently while maintaining the quality your customers expect.</p>

    <p>Looking forward to your thoughts!</p>

    <p>Best regards,<br><strong>{{sender_name}}</strong><br>Sales Director, Finstone AI</p>

    <p style="font-size: 12px; color: #6B7280; text-align: center; margin-top: 30px;">
        Questions? Reply to this email or call {{phone_number}}
    </p>
</body>
</html>
```

## Template Variables

All templates use the following variable system:

### Customer Variables
- `{{customer_name}}` - Customer's name
- `{{company}}` - Company name
- `{{success_manager}}` - Assigned success manager
- `{{dashboard_url}}` - Link to customer dashboard

### Meeting Variables
- `{{call_date}}` - Scheduled call date
- `{{call_time}}` - Scheduled call time
- `{{timezone}}` - Timezone
- `{{meeting_url}}` - Meeting link

### Integration Variables
- `{{integrations_url}}` - Link to integrations page
- `{{recommended_integrations}}` - Array of recommended integrations

### Agent Variables
- `{{deployed_agents}}` - Array of deployed agents
- `{{agent_types}}` - Types of agents recommended

### Sales Variables
- `{{prospect_name}}` - Prospect's name
- `{{sender_name}}` - Sender's name
- `{{demo_date}}` - Demo date
- `{{demo_time}}` - Demo time
- `{{proposal_url}}` - Link to proposal
- `{{calendar_url}}` - Calendar link

## Usage Instructions

1. **Copy the template** you need
2. **Replace variables** with actual data using your email system
3. **Customize content** based on your specific use case
4. **Test thoroughly** before sending to customers
5. **Track performance** and iterate based on results

## Best Practices

- **Personalize** each email with specific details
- **Keep subject lines** under 50 characters
- **Use clear CTAs** with prominent buttons
- **Include unsubscribe** links for compliance
- **Test on mobile** devices
- **Track open and click** rates
- **Follow up** appropriately based on engagement





















