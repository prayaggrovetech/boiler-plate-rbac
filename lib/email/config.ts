import nodemailer from "nodemailer"
import { prisma } from "@/lib/prisma"

// Get SMTP settings from database or fallback to env
async function getSmtpSettings() {
  try {
    const dbSettings = await prisma.smtpSettings.findFirst({
      where: { isActive: true },
    })

    if (dbSettings) {
      return {
        host: dbSettings.host,
        port: dbSettings.port,
        secure: dbSettings.secure,
        auth: {
          user: dbSettings.user,
          pass: dbSettings.password,
        },
        from: {
          name: dbSettings.fromName,
          email: dbSettings.fromEmail,
        },
      }
    }
  } catch (error) {
    console.warn("Failed to load SMTP settings from database, using env variables")
  }

  // Fallback to environment variables
  return {
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    from: {
      name: process.env.SMTP_FROM_NAME || "Micro SaaS",
      email: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || "noreply@example.com",
    },
  }
}

// Create transporter dynamically
export async function createTransporter() {
  const settings = await getSmtpSettings()
  const { from, ...transportConfig } = settings
  
  return {
    transporter: nodemailer.createTransport(transportConfig),
    from,
  }
}

// Verify transporter configuration
export async function verifyEmailConfig() {
  try {
    const { transporter } = await createTransporter()
    await transporter.verify()
    console.log("✅ Email server is ready to send messages")
    return true
  } catch (error) {
    console.error("❌ Email server verification failed:", error)
    return false
  }
}
