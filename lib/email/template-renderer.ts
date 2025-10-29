import { prisma } from "@/lib/prisma"

interface TemplateVariables {
  [key: string]: string | string[]
}

/**
 * Replace template variables with actual values
 * Supports: {{variableName}} syntax
 */
function replaceVariables(content: string, variables: TemplateVariables): string {
  let result = content

  // Add default variables
  const allVariables = {
    ...variables,
    currentYear: new Date().getFullYear().toString(),
    appName: process.env.SMTP_FROM_NAME || "Micro SaaS",
  }

  // Replace each variable
  Object.entries(allVariables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, "g")
    
    if (Array.isArray(value)) {
      // For arrays (like changes list), join with HTML list items
      const listItems = value.map(item => `<li style="margin-bottom: 8px;">${item}</li>`).join("")
      result = result.replace(regex, `<ul style="padding-left: 20px;">${listItems}</ul>`)
    } else {
      result = result.replace(regex, value || "")
    }
  })

  return result
}

/**
 * Get and render an email template from database
 */
export async function renderEmailTemplate(
  templateName: string,
  variables: TemplateVariables
) {
  try {
    const template = await prisma.emailTemplate.findUnique({
      where: { name: templateName, isActive: true },
    })

    if (!template) {
      throw new Error(`Email template '${templateName}' not found or inactive`)
    }

    return {
      subject: replaceVariables(template.subject, variables),
      html: replaceVariables(template.htmlContent, variables),
      text: replaceVariables(template.textContent, variables),
    }
  } catch (error) {
    console.error(`Error rendering template '${templateName}':`, error)
    throw error
  }
}

/**
 * Get all available email templates
 */
export async function getAllEmailTemplates() {
  return await prisma.emailTemplate.findMany({
    orderBy: { name: "asc" },
  })
}

/**
 * Get a single email template by name
 */
export async function getEmailTemplate(name: string) {
  return await prisma.emailTemplate.findUnique({
    where: { name },
  })
}

/**
 * Update an email template
 */
export async function updateEmailTemplate(
  name: string,
  data: {
    subject?: string
    htmlContent?: string
    textContent?: string
    isActive?: boolean
  }
) {
  return await prisma.emailTemplate.update({
    where: { name },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  })
}
