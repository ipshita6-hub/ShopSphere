# ShopSphere Deployment Guide

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] No console errors/warnings
- [ ] Production build successful
- [ ] Environment variables configured
- [ ] Documentation updated
- [ ] Code reviewed
- [ ] Performance optimized

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Build Output
- JavaScript: 86.76 KB (gzipped)
- CSS: 2.05 KB (gzipped)
- Total: ~89 KB

## Deployment Platforms

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel auto-deploys on push
4. Set environment variables if needed

```bash
npm install -g vercel
vercel
```

### Netlify

1. Push code to GitHub
2. Connect repository to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
4. Deploy

### GitHub Pages

1. Add to package.json:
```json
"homepage": "https://yourusername.github.io/shopsphere"
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add scripts to package.json:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

4. Deploy:
```bash
npm run deploy
```

### AWS S3 + CloudFront

1. Build the project:
```bash
npm run build
```

2. Upload to S3:
```bash
aws s3 sync build/ s3://your-bucket-name
```

3. Invalidate CloudFront cache:
```bash
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

### Traditional Web Server

1. Build the project:
```bash
npm run build
```

2. Copy `build/` folder to server
3. Configure server to serve `index.html` for all routes
4. Set appropriate cache headers

## Environment Variables

Create `.env` file in root:

```
REACT_APP_API_URL=https://api.example.com
REACT_APP_STRIPE_KEY=pk_live_...
```

Access in code:
```javascript
const apiUrl = process.env.REACT_APP_API_URL;
```

## Performance Optimization

### Current Metrics
- Lighthouse Score: 90+
- Initial Load: < 2 seconds
- Time to Interactive: < 3 seconds

### Optimization Tips
- Enable gzip compression
- Set cache headers
- Use CDN for assets
- Minify CSS/JS
- Optimize images

## Security Considerations

### HTTPS
- Always use HTTPS in production
- Redirect HTTP to HTTPS

### Headers
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
```

### Environment Variables
- Never commit `.env` files
- Use platform-specific secret management
- Rotate keys regularly

## Monitoring & Analytics

### Error Tracking
- Sentry for error monitoring
- LogRocket for session replay

### Analytics
- Google Analytics
- Mixpanel
- Amplitude

### Performance Monitoring
- Web Vitals
- Lighthouse CI
- Datadog

## Rollback Procedure

### Vercel
- Automatic rollback available
- Revert to previous deployment

### Netlify
- Deploy history available
- One-click rollback

### Manual Rollback
1. Revert to previous commit
2. Rebuild and redeploy
3. Verify deployment

## Post-Deployment

1. Test all features
2. Check analytics
3. Monitor error logs
4. Verify performance
5. Update status page

## Continuous Deployment

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test -- --run
      - run: npm run build
      - uses: actions/upload-artifact@v2
        with:
          name: build
          path: build/
```

## Troubleshooting

### Build Fails
```bash
npm run build -- --verbose
```

### Deployment Fails
- Check build logs
- Verify environment variables
- Check disk space
- Review error messages

### Performance Issues
- Check bundle size
- Analyze slow routes
- Review database queries
- Check API response times

## Maintenance

### Regular Tasks
- Monitor error logs
- Review analytics
- Update dependencies
- Security patches
- Performance optimization

### Scheduled Maintenance
- Plan maintenance windows
- Notify users
- Backup data
- Test recovery

## Support

For deployment issues:
1. Check platform documentation
2. Review error logs
3. Check GitHub issues
4. Contact platform support
