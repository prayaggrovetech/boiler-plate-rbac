# Email Configuration Guide

This project uses **Nodemailer** with **Gmail** for sending emails.

## Setup Instructions

### 1. Enable 2-Factor Authentication on Gmail

1. Go to your [Google Account Security Settings](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled

### 2. Generate an App Password

1. Visit [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Select **Mail** as the app
3. Select **Other (Custom name)** as the device
4. Enter a name like "Micro SaaS App"
5. Click **Generate**
6. Copy the 16-character password (it will look like: `xxxx xxxx xxxx xxxx`)

### 3. Update Environment Variables

Add these to your `.env` file:

```env
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-16-character-app-password"
SMTP_FROM_NAME="Micro SaaS"
SMTP_FROM_EMAIL="your-email@gmail.com"
```

**Important:** 
- Use the **App Password**, NOT your regular Gmail password
- Remove spaces from the app password when pasting

### 4. Test Email Configuration

You can test if emails are working by:

1. Using the forgot password feature
2. Creating a new user account
3. Updating your profile

## Email Templates

The following email templates are available:

### Password Reset Email
- **File:** `lib/email/templates.ts` → `getPasswordResetEmail()`
- **Triggered by:** Forgot password request
- **Contains:** Reset link with 1-hour expiration

### Welcome Email
- **File:** `lib/email/templates.ts` → `getWelcomeEmail()`
- **Triggered by:** New user registration
- **Contains:** Welcome message and login link

### Profile Update Email
- **File:** `lib/email/templates.ts` → `getProfileUpdateEmail()`
- **Triggered by:** Profile changes
- **Contains:** List of changes made

## Troubleshooting

### "Invalid login" error
- Make sure you're using an **App Password**, not your regular Gmail password
- Ensure 2-Factor Authentication is enabled on your Google account

### "Connection timeout" error
- Check your internet connection
- Verify Gmail SMTP is not blocked by your firewall
- Try using port 465 instead of 587 (requires SSL)

### Emails not being received
- Check spam/junk folder
- Verify the recipient email address is correct
- Check Gmail's sent mail to confirm the email was sent

## Gmail Limits

- **Free Gmail accounts:** 500 emails per day
- **Google Workspace accounts:** 2,000 emails per day

For higher volumes, consider using:
- **SendGrid** (100 emails/day free)
- **Resend** (3,000 emails/month free)
- **AWS SES** (62,000 emails/month free)

## Security Best Practices

1. ✅ Never commit `.env` file to version control
2. ✅ Use App Passwords instead of regular passwords
3. ✅ Rotate App Passwords periodically
4. ✅ Use different App Passwords for different applications
5. ✅ Revoke App Passwords when no longer needed

## Customizing Email Templates

Email templates are located in `lib/email/templates.ts`. Each template returns:

```typescript
{
  subject: string,  // Email subject line
  html: string,     // HTML version (styled)
  text: string      // Plain text version (fallback)
}
```

You can customize the styling, content, and branding to match your application.
