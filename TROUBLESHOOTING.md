# Troubleshooting Guide

Common issues and solutions for ShopSphere.

## Installation Issues

### Issue: npm install fails

**Error**: `npm ERR! code ERESOLVE`

**Solution**:
```bash
npm install --legacy-peer-deps
```

### Issue: Node version incompatible

**Error**: `Node version X.X.X is not compatible`

**Solution**:
```bash
# Check Node version
node --version

# Install Node 14+
# Download from https://nodejs.org/
```

## Development Server Issues

### Issue: Port 3000 already in use

**Error**: `Something is already listening on port 3000`

**Solution (Windows)**:
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Solution (Mac/Linux)**:
```bash
lsof -i :3000
kill -9 <PID>
```

### Issue: Hot reload not working

**Solution**:
1. Clear node_modules: `rm -rf node_modules`
2. Reinstall: `npm install`
3. Restart dev server: `npm start`

### Issue: Module not found

**Error**: `Cannot find module 'react-router-dom'`

**Solution**:
```bash
npm install react-router-dom
npm start
```

## Build Issues

### Issue: Build fails

**Error**: `npm ERR! code ELIFECYCLE`

**Solution**:
```bash
npm run build -- --verbose
```

Check the error message and fix accordingly.

### Issue: Build size too large

**Solution**:
```bash
npm run build
npm install -g serve
serve -s build
```

Analyze bundle:
```bash
npm install --save-dev webpack-bundle-analyzer
```

## Testing Issues

### Issue: Tests not running

**Error**: `Cannot find module 'jest'`

**Solution**:
```bash
npm install --save-dev jest
npm test -- --run
```

### Issue: Tests failing

**Solution**:
1. Check error message
2. Review test file
3. Check Redux store setup
4. Verify mock data

### Issue: Test timeout

**Solution**:
```javascript
jest.setTimeout(10000); // Increase timeout
```

## Runtime Issues

### Issue: Blank white screen

**Causes**:
- JavaScript error
- Redux store not initialized
- Router not configured

**Solution**:
1. Open browser console (F12)
2. Check for errors
3. Review error message
4. Fix the issue

### Issue: Products not displaying

**Causes**:
- Mock data not loaded
- Redux state not updated
- Component not rendering

**Solution**:
1. Check Redux DevTools
2. Verify state shape
3. Check component props
4. Review console errors

### Issue: Cart not updating

**Causes**:
- Redux action not dispatched
- Reducer not updating state
- Component not re-rendering

**Solution**:
1. Check Redux DevTools
2. Verify action dispatch
3. Check reducer logic
4. Verify component subscription

### Issue: Filters not working

**Causes**:
- Filter state not updating
- Products not filtering
- Selector not working

**Solution**:
1. Check filter state in Redux
2. Verify filter logic
3. Check product data
4. Review console errors

### Issue: Routing not working

**Causes**:
- Router not configured
- Route path incorrect
- Link href incorrect

**Solution**:
1. Check App.js routing
2. Verify route paths
3. Check Link components
4. Review console errors

## Performance Issues

### Issue: Slow initial load

**Causes**:
- Large bundle size
- Unoptimized images
- Blocking scripts

**Solution**:
1. Run Lighthouse audit
2. Analyze bundle size
3. Optimize images
4. Enable code splitting

### Issue: Slow interactions

**Causes**:
- Expensive re-renders
- Large lists
- Complex calculations

**Solution**:
1. Use React DevTools Profiler
2. Identify slow components
3. Implement memoization
4. Optimize calculations

### Issue: High memory usage

**Causes**:
- Memory leaks
- Large data structures
- Uncleared timers

**Solution**:
1. Check for memory leaks
2. Clear timers in cleanup
3. Paginate large lists
4. Use DevTools memory profiler

## Browser Issues

### Issue: Not working in Safari

**Solution**:
1. Check browser compatibility
2. Use polyfills if needed
3. Test in Safari
4. Check console errors

### Issue: Not working in IE11

**Solution**:
- IE11 not supported
- Use modern browser
- Or use polyfills

### Issue: Mobile not working

**Solution**:
1. Test on mobile device
2. Check responsive design
3. Test touch interactions
4. Check mobile browser console

## API Issues

### Issue: API calls failing

**Error**: `Failed to fetch`

**Solution**:
1. Check API URL
2. Verify API is running
3. Check CORS configuration
4. Check network tab

### Issue: CORS error

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
1. Check backend CORS config
2. Verify API URL
3. Check request headers
4. Review browser console

### Issue: Timeout error

**Error**: `Request timeout`

**Solution**:
1. Increase timeout
2. Check network speed
3. Verify API response
4. Check server logs

## Git Issues

### Issue: Git not initialized

**Solution**:
```bash
git init
git add .
git commit -m "Initial commit"
```

### Issue: Cannot push to GitHub

**Solution**:
1. Check GitHub credentials
2. Verify remote URL
3. Check SSH keys
4. Review error message

## Environment Issues

### Issue: Environment variables not loading

**Solution**:
1. Create .env file
2. Add variables
3. Restart dev server
4. Verify in code

### Issue: Sensitive data exposed

**Solution**:
1. Remove from code
2. Add to .env
3. Add .env to .gitignore
4. Commit .env.example instead

## Deployment Issues

### Issue: Deployment fails

**Solution**:
1. Check build logs
2. Verify environment variables
3. Check disk space
4. Review error message

### Issue: App not loading after deployment

**Solution**:
1. Check deployment logs
2. Verify build output
3. Check server configuration
4. Review browser console

## Getting Help

### Resources
1. Check documentation
2. Search GitHub issues
3. Check Stack Overflow
4. Review error messages

### Reporting Issues
1. Describe the problem
2. Include error message
3. Provide steps to reproduce
4. Include environment info

### Debug Mode
```javascript
// Enable debug logging
localStorage.setItem('debug', 'shopsphere:*');
```

## Common Error Messages

### "Cannot find module"
- Install missing package
- Check import path
- Verify package.json

### "Unexpected token"
- Check syntax
- Verify file encoding
- Check for typos

### "Maximum call stack exceeded"
- Check for infinite loops
- Verify recursion
- Check Redux selectors

### "TypeError: Cannot read property"
- Check object exists
- Verify property name
- Check null/undefined

## Performance Debugging

### Chrome DevTools
1. Open DevTools (F12)
2. Go to Performance tab
3. Record interaction
4. Analyze results

### React DevTools
1. Install extension
2. Open React tab
3. Inspect components
4. Check props/state

### Redux DevTools
1. Install extension
2. Open Redux tab
3. View state
4. Replay actions

## Checklist for Troubleshooting

- [ ] Check error message
- [ ] Review console logs
- [ ] Check Redux state
- [ ] Verify network requests
- [ ] Test in different browser
- [ ] Clear cache
- [ ] Restart dev server
- [ ] Reinstall dependencies
- [ ] Check documentation
- [ ] Search for similar issues

## Still Having Issues?

1. Review this guide
2. Check documentation
3. Search GitHub issues
4. Create new issue with:
   - Error message
   - Steps to reproduce
   - Environment info
   - Screenshots/logs
