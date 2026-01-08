# Security Guide

ShopSphere implements security best practices to protect user data and application integrity.

## Security Principles

1. **Input Validation**: Validate all user input
2. **Output Encoding**: Encode output to prevent XSS
3. **Authentication**: Secure user authentication
4. **Authorization**: Proper access control
5. **Data Protection**: Encrypt sensitive data
6. **Error Handling**: Secure error messages

## Input Validation

### Form Validation
```javascript
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validateZipCode = (zipCode) => {
  return /^\d{5}(-\d{4})?$/.test(zipCode);
};
```

### Sanitization
```javascript
import DOMPurify from 'dompurify';

const sanitizeInput = (input) => {
  return DOMPurify.sanitize(input);
};
```

## XSS Prevention

### React Auto-Escaping
```javascript
// React automatically escapes content
<div>{userInput}</div> // Safe

// Avoid dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userInput }} /> // Unsafe
```

### Content Security Policy
```html
<meta 
  http-equiv="Content-Security-Policy" 
  content="default-src 'self'; script-src 'self' 'unsafe-inline'"
/>
```

## CSRF Protection

### Token-Based Protection
```javascript
// Backend generates token
const csrfToken = generateToken();

// Frontend includes token in requests
const headers = {
  'X-CSRF-Token': csrfToken,
};

fetch('/api/orders', {
  method: 'POST',
  headers,
  body: JSON.stringify(data),
});
```

## Authentication

### Secure Password Storage
```javascript
// Backend: Hash passwords with bcrypt
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(password, 10);

// Never store plain passwords
```

### JWT Tokens
```javascript
// Store token securely
localStorage.setItem('token', jwtToken); // Use httpOnly cookie instead

// Include in requests
const headers = {
  'Authorization': `Bearer ${token}`,
};
```

## HTTPS

### Enforce HTTPS
```javascript
// Redirect HTTP to HTTPS
if (window.location.protocol !== 'https:') {
  window.location.href = 'https:' + window.location.href.substring(5);
}
```

### HSTS Header
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## Environment Variables

### Secure Configuration
```
# .env (never commit)
REACT_APP_API_URL=https://api.shopsphere.com
REACT_APP_STRIPE_KEY=pk_live_...

# .env.example (commit this)
REACT_APP_API_URL=
REACT_APP_STRIPE_KEY=
```

### Access Environment Variables
```javascript
const apiUrl = process.env.REACT_APP_API_URL;
// Never expose sensitive keys in frontend
```

## Dependency Security

### Check for Vulnerabilities
```bash
npm audit
npm audit fix
```

### Keep Dependencies Updated
```bash
npm update
npm outdated
```

### Use Trusted Packages
- Check package popularity
- Review package source
- Check maintenance status
- Read security advisories

## API Security

### Rate Limiting
```javascript
// Backend implementation
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### CORS Configuration
```javascript
// Backend
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
```

### API Key Protection
```javascript
// Never expose API keys in frontend
// Use backend proxy for API calls

// Frontend
fetch('/api/proxy/external-api', {
  method: 'POST',
  body: JSON.stringify(data),
});

// Backend
app.post('/api/proxy/external-api', (req, res) => {
  // Use API key from environment variable
  const apiKey = process.env.EXTERNAL_API_KEY;
  // Make request with API key
});
```

## Data Protection

### Encryption
```javascript
// Use HTTPS for all data in transit
// Encrypt sensitive data at rest

// Example: Encrypt user data
const crypto = require('crypto');

const encrypt = (text, key) => {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};
```

### Data Minimization
- Only collect necessary data
- Delete data when no longer needed
- Anonymize data when possible

## Error Handling

### Secure Error Messages
```javascript
// Good: Generic error message
catch (error) {
  console.error(error); // Log full error
  res.status(500).json({ message: 'An error occurred' }); // Generic response
}

// Avoid: Exposing sensitive information
catch (error) {
  res.status(500).json({ message: error.message }); // Exposes details
}
```

## Security Headers

### Recommended Headers
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Security Checklist

- [ ] HTTPS enabled
- [ ] Input validation implemented
- [ ] Output encoding used
- [ ] CSRF protection enabled
- [ ] XSS prevention in place
- [ ] Authentication secure
- [ ] Authorization implemented
- [ ] API keys protected
- [ ] Dependencies updated
- [ ] No sensitive data in logs
- [ ] Error messages generic
- [ ] Security headers set
- [ ] Rate limiting enabled
- [ ] CORS configured
- [ ] Data encrypted in transit
- [ ] Passwords hashed
- [ ] Tokens secure
- [ ] Environment variables protected

## Security Testing

### Automated Testing
```bash
npm audit
npm audit fix
```

### Manual Testing
- Test input validation
- Test authentication
- Test authorization
- Test error handling
- Test API security

### Tools
- OWASP ZAP
- Burp Suite
- npm audit
- Snyk

## Incident Response

### If Breach Occurs
1. Identify affected data
2. Notify users immediately
3. Secure the system
4. Investigate root cause
5. Implement fixes
6. Monitor for further issues

## Compliance

### GDPR
- User consent for data collection
- Right to access data
- Right to delete data
- Data portability

### CCPA
- Privacy policy
- Opt-out mechanism
- Data deletion requests

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [npm Security](https://docs.npmjs.com/cli/v8/commands/npm-audit)

## Security Policy

For security issues, please email security@shopsphere.com instead of using the issue tracker.

## Continuous Security

- Regular security audits
- Dependency updates
- Security training
- Incident response planning
- Compliance monitoring
