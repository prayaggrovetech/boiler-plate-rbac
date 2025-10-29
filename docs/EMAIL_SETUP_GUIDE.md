# Email System Setup Guide

## ✅ What's Been Implemented

### 1. **Dynamic SMTP Configuration**
- SMTP settings stored in database (not just .env)
- Admin can change email provider without code changes
- Automatic fallback to environment variables
- Support for Gmail, Mailgun, SendGrid, or any SMTP server

### 2. **Dynamic Email Templates**
- All email templates stored in database
- Admin can edit templates without deploying code
- Support for template variables ({{userName}}, {{resetUrl}}, etc.)
- HTML and plain text versions
- Active/inactive toggle for each template

### 3. **Admin UI**
- Beautiful settings page at `/admin/email-settings`
- Two tabs: SMTP Configuration & Email Templates
- Real-time template editing
- Test email functionality
- Gmail setup instructions included

## 🚀 How to Access

### For Admins:

1. **Login as Admin**
   - Go to `http://localhost:3000/login`
   - Use admin credentials

2. **Navigate to Email Settings**
   - Click on "Email Settings" in the sidebar (System section)
   - Or go directly to: `http://localhost:3000/admin/email-settings`

3. **Configure SMTP (First Time Setup)**
   - Click on "SMTP Configuration" tab
   - Fill in your Gmail credentials:
     - **SMTP Host:** smtp.gmail.com
     - **SMTP Port:** 587
     - **SMTP Username:** your-email@gmail.com
     - **SMTP Password:** your-app-password (see below)
     - **From Name:** Your App Name
     - **From Email:** your-email@gmail.com
   - Click "Save Settings"
   - Click "Send Test Email" to verify

4. **Edit Email Templates**
   - Click on "Email Templates" tab
   - Select a template from the list (Password Reset, Welcome, Profile Update)
   - Edit the subject, HTML content, or plain text
   - Use template variables like {{userName}}, {{resetUrl}}
   - Click "Save Template"

## 📧 Gmail App Password Setup

### Step-by-Step:

1. **Enable 2-Factor Authentication**
   - Go to: https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. **Generate App Password**
   - Visit: https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Select "Other (Custom name)" as the device
   - Enter "Micro SaaS" or your app name
   - Click "Generate"
   - Copy the 16-character password (format: xxxx xxxx xxxx xxxx)

3. **Use in Settings**
   - Paste the app password in the "SMTP Password" field
   - Remove spaces (or keep them, both work)
   - Save settings

## 🧪 Testing Email Functionality

### Method 1: Via Admin UI
1. Go to Email Settings → SMTP Configuration
2. Click "Send Test Email" button
3. Check your inbox for the test email

### Method 2: Via Forgot Password
1. Go to login page
2. Click "Forgot Password"
3. Enter your email
4. Check inbox for password reset email

### Method 3: Via CURL
```bash
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@gmail.com"}'
```

## 📝 Available Email Templates

### 1. Password Reset (`password_reset`)
- **Triggered by:** Forgot password request
- **Variables:** 
  - `{{userName}}` - User's name
  - `{{resetUrl}}` - Password reset link
  - `{{appName}}` - Application name
  - `{{currentYear}}` - Current year (auto)

### 2. Welcome Email (`welcome`)
- **Triggered by:** New user registration
- **Variables:**
  - `{{userName}}` - User's name
  - `{{loginUrl}}` - Login page URL
  - `{{appName}}` - Application name
  - `{{currentYear}}` - Current year (auto)

### 3. Profile Update (`profile_update`)
- **Triggered by:** Profile changes
- **Variables:**
  - `{{userName}}` - User's name
  - `{{changes}}` - List of changes (HTML list)
  - `{{appName}}` - Application name
  - `{{currentYear}}` - Current year (auto)

## 🔧 API Endpoints

### SMTP Settings
```bash
# Get SMTP settings
GET /api/admin/smtp-settings

# Save SMTP settings
POST /api/admin/smtp-settings
{
  "host": "smtp.gmail.com",
  "port": 587,
  "secure": false,
  "user": "your-email@gmail.com",
  "password": "your-app-password",
  "fromName": "Micro SaaS",
  "fromEmail": "your-email@gmail.com"
}

# Update SMTP settings
PATCH /api/admin/smtp-settings
```

### Email Templates
```bash
# Get all templates
GET /api/admin/email-templates

# Get single template
GET /api/admin/email-templates/password_reset

# Update template
PATCH /api/admin/email-templates/password_reset
{
  "subject": "Reset Your Password - {{appName}}",
  "htmlContent": "<html>...</html>",
  "textContent": "Plain text version...",
  "isActive": true
}
```

## 🎨 Customizing Templates

### Template Variables Syntax
Use double curly braces: `{{variableName}}`

### Example HTML Template:
```html
<!DOCTYPE html>
<html>
  <body>
    <h1>Hi {{userName}},</h1>
    <p>Click the link below:</p>
    <a href="{{resetUrl}}">Reset Password</a>
    <p>© {{currentYear}} {{appName}}</p>
  </body>
</html>
```

### Example Plain Text Template:
```
Hi {{userName}},

Click the link below to reset your password:
{{resetUrl}}

© {{currentYear}} {{appName}}
```

## 🔒 Security Notes

1. **App Passwords are Secure**
   - More secure than using your actual Gmail password
   - Can be revoked anytime without changing your main password
   - Specific to one application

2. **Database Storage**
   - SMTP passwords are stored in database
   - In production, consider encrypting sensitive fields
   - Use environment variables as fallback

3. **Admin-Only Access**
   - Only users with admin role can access email settings
   - API endpoints check for admin permissions
   - Regular users cannot view or modify settings

## 🐛 Troubleshooting

### "Invalid login" error
- ✅ Use App Password, not regular Gmail password
- ✅ Ensure 2FA is enabled on Google account
- ✅ Remove spaces from app password

### "Connection timeout" error
- ✅ Check internet connection
- ✅ Verify SMTP host and port are correct
- ✅ Try port 465 with SSL enabled

### Emails not received
- ✅ Check spam/junk folder
- ✅ Verify recipient email is correct
- ✅ Check Gmail sent mail to confirm email was sent
- ✅ Check Gmail daily sending limits (500/day for free accounts)

### Template variables not replaced
- ✅ Use correct syntax: `{{variableName}}`
- ✅ Check variable name matches available variables
- ✅ Ensure template is marked as active

## 📊 Gmail Sending Limits

- **Free Gmail:** 500 emails per day
- **Google Workspace:** 2,000 emails per day

For higher volumes, consider:
- **SendGrid:** 100 emails/day free
- **Resend:** 3,000 emails/month free
- **AWS SES:** 62,000 emails/month free

## 🎯 Next Steps

1. ✅ Configure SMTP settings in admin panel
2. ✅ Test email sending
3. ✅ Customize email templates to match your brand
4. ✅ Add your logo to email templates
5. ✅ Test all email flows (password reset, welcome, etc.)
6. 🔄 Consider adding more email templates (e.g., invoice, notification)
7. 🔄 Implement email encryption for production
8. 🔄 Add email analytics/tracking

## 💡 Pro Tips

1. **Branding:** Update email templates with your brand colors and logo
2. **Testing:** Always test emails before going to production
3. **Monitoring:** Check email delivery rates regularly
4. **Backup:** Keep a backup of your email templates
5. **Variables:** Use template variables for dynamic content
6. **Fallback:** Keep environment variables as backup SMTP config

---

**Need Help?** Check the logs in your terminal for detailed error messages when sending emails.
