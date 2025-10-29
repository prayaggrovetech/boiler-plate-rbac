import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const defaultTemplates = [
  {
    name: "password_reset",
    subject: "Reset Your Password - {{appName}}",
    description: "Email sent when user requests password reset",
    variables: ["userName", "resetUrl", "appName"],
    htmlContent: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 28px;">Password Reset Request</h1>
    </div>
    
    <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
      <p style="font-size: 16px; margin-bottom: 20px;">Hi {{userName}},</p>
      
      <p style="font-size: 16px; margin-bottom: 20px;">
        We received a request to reset your password. Click the button below to create a new password:
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{{resetUrl}}" 
           style="background: #667eea; color: white; padding: 14px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; font-size: 16px;">
          Reset Password
        </a>
      </div>
      
      <p style="font-size: 14px; color: #666; margin-top: 30px;">
        Or copy and paste this link into your browser:
      </p>
      <p style="font-size: 14px; color: #667eea; word-break: break-all;">
        {{resetUrl}}
      </p>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
          <strong>⏰ This link will expire in 1 hour.</strong>
        </p>
        <p style="font-size: 14px; color: #666;">
          If you didn't request a password reset, you can safely ignore this email.
        </p>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
        <p style="font-size: 12px; color: #999;">
          © {{currentYear}} {{appName}}. All rights reserved.
        </p>
      </div>
    </div>
  </body>
</html>
    `,
    textContent: `
Hi {{userName}},

We received a request to reset your password.

Click the link below to create a new password:
{{resetUrl}}

This link will expire in 1 hour.

If you didn't request a password reset, you can safely ignore this email.

© {{currentYear}} {{appName}}. All rights reserved.
    `,
  },
  {
    name: "welcome",
    subject: "Welcome to {{appName}}! 🎉",
    description: "Email sent to new users after registration",
    variables: ["userName", "loginUrl", "appName"],
    htmlContent: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to {{appName}}! 🎉</h1>
    </div>
    
    <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
      <p style="font-size: 16px; margin-bottom: 20px;">Hi {{userName}},</p>
      
      <p style="font-size: 16px; margin-bottom: 20px;">
        Thank you for joining {{appName}}! We're excited to have you on board.
      </p>
      
      <p style="font-size: 16px; margin-bottom: 20px;">
        Your account has been successfully created. You can now log in and start exploring.
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{{loginUrl}}" 
           style="background: #667eea; color: white; padding: 14px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; font-size: 16px;">
          Go to Dashboard
        </a>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
        <p style="font-size: 12px; color: #999;">
          © {{currentYear}} {{appName}}. All rights reserved.
        </p>
      </div>
    </div>
  </body>
</html>
    `,
    textContent: `
Hi {{userName}},

Thank you for joining {{appName}}! We're excited to have you on board.

Your account has been successfully created. You can now log in and start exploring.

Visit: {{loginUrl}}

© {{currentYear}} {{appName}}. All rights reserved.
    `,
  },
  {
    name: "profile_update",
    subject: "Profile Updated - {{appName}}",
    description: "Email sent when user updates their profile",
    variables: ["userName", "changes", "appName"],
    htmlContent: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile Updated</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 28px;">Profile Updated</h1>
    </div>
    
    <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
      <p style="font-size: 16px; margin-bottom: 20px;">Hi {{userName}},</p>
      
      <p style="font-size: 16px; margin-bottom: 20px;">
        Your profile has been successfully updated with the following changes:
      </p>
      
      <div style="font-size: 16px; margin-bottom: 20px;">
        {{changes}}
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p style="font-size: 14px; color: #666;">
          If you didn't make these changes, please contact support immediately.
        </p>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
        <p style="font-size: 12px; color: #999;">
          © {{currentYear}} {{appName}}. All rights reserved.
        </p>
      </div>
    </div>
  </body>
</html>
    `,
    textContent: `
Hi {{userName}},

Your profile has been successfully updated with the following changes:

{{changes}}

If you didn't make these changes, please contact support immediately.

© {{currentYear}} {{appName}}. All rights reserved.
    `,
  },
]

async function seedEmailTemplates() {
  console.log("🌱 Seeding email templates...")

  for (const template of defaultTemplates) {
    await prisma.emailTemplate.upsert({
      where: { name: template.name },
      update: {},
      create: template,
    })
    console.log(`✅ Created/Updated template: ${template.name}`)
  }

  console.log("✨ Email templates seeded successfully!")
}

seedEmailTemplates()
  .catch((e) => {
    console.error("❌ Error seeding email templates:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
