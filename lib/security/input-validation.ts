import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export function sanitizeHtml(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
    ALLOWED_ATTR: []
  })
}

/**
 * Sanitize plain text input
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .slice(0, 1000) // Limit length
}

/**
 * Validate and sanitize email
 */
export function sanitizeEmail(email: string): string {
  return email
    .toLowerCase()
    .trim()
    .replace(/[^\w@.-]/g, '') // Only allow word chars, @, ., -
}

/**
 * Validate SQL injection patterns
 */
export function containsSqlInjection(input: string): boolean {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i,
    /(--|\/\*|\*\/|;|'|")/,
    /(\bOR\b|\bAND\b).*[=<>]/i
  ]
  
  return sqlPatterns.some(pattern => pattern.test(input))
}

/**
 * Validate NoSQL injection patterns
 */
export function containsNoSqlInjection(input: string): boolean {
  const noSqlPatterns = [
    /\$where/i,
    /\$ne/i,
    /\$gt/i,
    /\$lt/i,
    /\$regex/i,
    /\$or/i,
    /\$and/i
  ]
  
  return noSqlPatterns.some(pattern => pattern.test(input))
}

/**
 * Check for common XSS patterns
 */
export function containsXss(input: string): boolean {
  const xssPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /eval\(/i,
    /expression\(/i
  ]
  
  return xssPatterns.some(pattern => pattern.test(input))
}

/**
 * Comprehensive input validation
 */
export function validateInput(input: string, type: 'text' | 'email' | 'html' = 'text'): {
  isValid: boolean
  sanitized: string
  errors: string[]
} {
  const errors: string[] = []
  let sanitized = input

  // Check for injection attacks
  if (containsSqlInjection(input)) {
    errors.push('Input contains potential SQL injection')
  }

  if (containsNoSqlInjection(input)) {
    errors.push('Input contains potential NoSQL injection')
  }

  if (containsXss(input)) {
    errors.push('Input contains potential XSS attack')
  }

  // Sanitize based on type
  switch (type) {
    case 'email':
      sanitized = sanitizeEmail(input)
      break
    case 'html':
      sanitized = sanitizeHtml(input)
      break
    case 'text':
    default:
      sanitized = sanitizeText(input)
      break
  }

  return {
    isValid: errors.length === 0,
    sanitized,
    errors
  }
}

/**
 * Validate file upload
 */
export function validateFileUpload(file: File, options: {
  maxSize?: number // in bytes
  allowedTypes?: string[]
  allowedExtensions?: string[]
} = {}): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf']
  } = options

  // Check file size
  if (file.size > maxSize) {
    errors.push(`File size exceeds ${maxSize / 1024 / 1024}MB limit`)
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type ${file.type} is not allowed`)
  }

  // Check file extension
  const extension = '.' + file.name.split('.').pop()?.toLowerCase()
  if (!allowedExtensions.includes(extension)) {
    errors.push(`File extension ${extension} is not allowed`)
  }

  // Check for potentially dangerous file names
  const dangerousPatterns = [
    /\.\./,
    /[<>:"|?*]/,
    /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i
  ]

  if (dangerousPatterns.some(pattern => pattern.test(file.name))) {
    errors.push('File name contains invalid characters')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}