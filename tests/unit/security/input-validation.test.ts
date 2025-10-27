import {
  validateInput,
  containsSqlInjection,
  containsXss,
  sanitizeEmail,
  sanitizeText,
  validateFileUpload
} from '@/lib/security/input-validation'

describe('Input Validation', () => {
  describe('containsSqlInjection', () => {
    it('should detect SQL injection attempts', () => {
      const maliciousInputs = [
        "'; DROP TABLE users; --",
        "1' OR '1'='1",
        "admin'/**/OR/**/1=1--",
        "UNION SELECT * FROM users"
      ]

      maliciousInputs.forEach(input => {
        expect(containsSqlInjection(input)).toBe(true)
      })
    })

    it('should allow safe inputs', () => {
      const safeInputs = [
        "john@example.com",
        "Hello World",
        "User123",
        "This is a normal sentence."
      ]

      safeInputs.forEach(input => {
        expect(containsSqlInjection(input)).toBe(false)
      })
    })
  })

  describe('containsXss', () => {
    it('should detect XSS attempts', () => {
      const maliciousInputs = [
        "<script>alert('xss')</script>",
        "javascript:alert('xss')",
        "<img onerror='alert(1)' src='x'>",
        "<iframe src='javascript:alert(1)'></iframe>"
      ]

      maliciousInputs.forEach(input => {
        expect(containsXss(input)).toBe(true)
      })
    })

    it('should allow safe HTML', () => {
      const safeInputs = [
        "Hello World",
        "Contact us at info@example.com",
        "Price: $29.99"
      ]

      safeInputs.forEach(input => {
        expect(containsXss(input)).toBe(false)
      })
    })
  })

  describe('sanitizeEmail', () => {
    it('should sanitize email addresses', () => {
      expect(sanitizeEmail('  JOHN@EXAMPLE.COM  ')).toBe('john@example.com')
      expect(sanitizeEmail('user+tag@domain.co.uk')).toBe('user+tag@domain.co.uk')
      expect(sanitizeEmail('test<script>@evil.com')).toBe('test@evil.com')
    })
  })

  describe('sanitizeText', () => {
    it('should remove HTML tags and limit length', () => {
      expect(sanitizeText('<script>alert("xss")</script>Hello')).toBe('alert("xss")Hello')
      expect(sanitizeText('  Hello World  ')).toBe('Hello World')
    })
  })

  describe('validateInput', () => {
    it('should validate and sanitize safe input', () => {
      const result = validateInput('Hello World', 'text')
      expect(result.isValid).toBe(true)
      expect(result.sanitized).toBe('Hello World')
      expect(result.errors).toHaveLength(0)
    })

    it('should detect and report malicious input', () => {
      const result = validateInput("'; DROP TABLE users; --", 'text')
      expect(result.isValid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })
  })

  describe('validateFileUpload', () => {
    it('should validate file size', () => {
      const largeFile = new File(['x'.repeat(10 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' })
      const result = validateFileUpload(largeFile, { maxSize: 5 * 1024 * 1024 })
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('File size exceeds 5MB limit')
    })

    it('should validate file type', () => {
      const invalidFile = new File(['content'], 'test.exe', { type: 'application/exe' })
      const result = validateFileUpload(invalidFile)
      
      expect(result.isValid).toBe(false)
      expect(result.errors.some(error => error.includes('not allowed'))).toBe(true)
    })

    it('should allow valid files', () => {
      const validFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
      const result = validateFileUpload(validFile)
      
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })
  })
})