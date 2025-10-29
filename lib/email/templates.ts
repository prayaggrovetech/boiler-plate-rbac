interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export function getPasswordResetEmail(resetUrl: string, userName?: string): EmailTemplate {
  const name = userName || "User"
  
  return {
    subject: "Reset Your Password - Micro SaaS",
    html: `
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
            <p style="font-size: 16px; margin-bottom: 20px;">Hi ${name},</p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              We received a request to reset your password. Click the button below to create a new password:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background: #667eea; color: white; padding: 14px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; font-size: 16px;">
                Reset Password
              </a>
            </div>
            
            <p style="font-size: 14px; color: #666; margin-top: 30px;">
              Or copy and paste this link into your browser:
            </p>
            <p style="font-size: 14px; color: #667eea; word-break: break-all;">
              ${resetUrl}
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
                <strong>⏰ This link will expire in 1 hour.</strong>
              </p>
              <p style="font-size: 14px; color: #666;">
                If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
              </p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
              <p style="font-size: 12px; color: #999;">
                © ${new Date().getFullYear()} Micro SaaS. All rights reserved.
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Hi ${name},

We received a request to reset your password.

Click the link below to create a new password:
${resetUrl}

This link will expire in 1 hour.

If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.

© ${new Date().getFullYear()} Micro SaaS. All rights reserved.
    `.trim(),
  }
}

export function getWelcomeEmail(userName: string, loginUrl: string): EmailTemplate {
  return {
    subject: "Welcome to Micro SaaS! 🎉",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Micro SaaS</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Micro SaaS! 🎉</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; margin-bottom: 20px;">Hi ${userName},</p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              Thank you for joining Micro SaaS! We're excited to have you on board.
            </p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              Your account has been successfully created. You can now log in and start exploring all the features we have to offer.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${loginUrl}" 
                 style="background: #667eea; color: white; padding: 14px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; font-size: 16px;">
                Go to Dashboard
              </a>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="font-size: 14px; color: #666;">
                If you have any questions or need assistance, feel free to reach out to our support team.
              </p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
              <p style="font-size: 12px; color: #999;">
                © ${new Date().getFullYear()} Micro SaaS. All rights reserved.
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Hi ${userName},

Thank you for joining Micro SaaS! We're excited to have you on board.

Your account has been successfully created. You can now log in and start exploring all the features we have to offer.

Visit: ${loginUrl}

If you have any questions or need assistance, feel free to reach out to our support team.

© ${new Date().getFullYear()} Micro SaaS. All rights reserved.
    `.trim(),
  }
}

export function getProfileUpdateEmail(userName: string, changes: string[]): EmailTemplate {
  const changesList = changes.map(change => `<li style="margin-bottom: 8px;">${change}</li>`).join("")
  
  return {
    subject: "Profile Updated - Micro SaaS",
    html: `
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
            <p style="font-size: 16px; margin-bottom: 20px;">Hi ${userName},</p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              Your profile has been successfully updated with the following changes:
            </p>
            
            <ul style="font-size: 16px; margin-bottom: 20px; padding-left: 20px;">
              ${changesList}
            </ul>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="font-size: 14px; color: #666;">
                If you didn't make these changes, please contact our support team immediately.
              </p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
              <p style="font-size: 12px; color: #999;">
                © ${new Date().getFullYear()} Micro SaaS. All rights reserved.
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Hi ${userName},

Your profile has been successfully updated with the following changes:

${changes.map(change => `- ${change}`).join("\n")}

If you didn't make these changes, please contact our support team immediately.

© ${new Date().getFullYear()} Micro SaaS. All rights reserved.
    `.trim(),
  }
}
