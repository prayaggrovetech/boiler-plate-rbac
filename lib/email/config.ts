import nodemailer from "nodemailer"

// Create reusable transporter
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

// Verify transporter configuration
export async function verifyEmailConfig() {
  try {
    await transporter.verify()
    console.log("✅ Email server is ready to send messages")
    return true
  } catch (error) {
    console.error("❌ Email server verification failed:", error)
    return false
  }
}

// Email configuration
export const emailConfig = {
  from: {
    name: process.env.SMTP_FROM_NAME || "Micro SaaS",
    email: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || "noreply@example.com",
  },
}
