# Accessibility Guide

ShopSphere is built with accessibility in mind to ensure all users can use the application.

## Accessibility Standards

ShopSphere follows:
- WCAG 2.1 Level AA guidelines
- Section 508 compliance
- ADA standards

## Keyboard Navigation

### Supported Keys
- **Tab**: Navigate between elements
- **Shift + Tab**: Navigate backwards
- **Enter**: Activate buttons/links
- **Space**: Toggle checkboxes
- **Arrow Keys**: Navigate lists

### Testing Keyboard Navigation
1. Disable mouse
2. Use Tab to navigate
3. Verify all elements are reachable
4. Check focus indicators

## Screen Reader Support

### Semantic HTML
```html
<!-- Good -->
<button>Add to Cart</button>
<label for="quantity">Quantity</label>
<input id="quantity" type="number" />

<!-- Avoid -->
<div onclick="addToCart()">Add to Cart</div>
<div>Quantity</div>
<div contenteditable></div>
```

### ARIA Attributes
```html
<button aria-label="Add to cart">
  <svg aria-hidden="true">...</svg>
</button>

<div role="alert">Item added to cart</div>

<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Products</a></li>
    <li><a href="/cart">Cart</a></li>
  </ul>
</nav>
```

### Testing with Screen Readers
- NVDA (Windows, free)
- JAWS (Windows, paid)
- VoiceOver (Mac, built-in)
- TalkBack (Android, built-in)

## Color Contrast

### Current Contrast Ratios
- Text on background: 7:1 (AAA)
- Buttons: 5:1 (AA)
- Links: 5:1 (AA)

### Testing Contrast
- Use WebAIM Contrast Checker
- Use Chrome DevTools
- Use Lighthouse audit

## Form Accessibility

### Labels
```html
<label for="email">Email Address</label>
<input id="email" type="email" required />
```

### Error Messages
```html
<input 
  id="email" 
  type="email" 
  aria-describedby="email-error"
/>
<span id="email-error" role="alert">
  Please enter a valid email
</span>
```

### Required Fields
```html
<label for="name">
  Name <span aria-label="required">*</span>
</label>
<input id="name" required />
```

## Images

### Alt Text
```html
<!-- Good -->
<img src="product.jpg" alt="Wireless Headphones - $79.99" />

<!-- Avoid -->
<img src="product.jpg" alt="image" />
<img src="product.jpg" alt="" /> <!-- Only if decorative -->
```

### Decorative Images
```html
<img src="icon.svg" alt="" aria-hidden="true" />
```

## Focus Management

### Focus Indicators
```css
button:focus {
  outline: 2px solid #4CAF50;
  outline-offset: 2px;
}
```

### Focus Trap (Modal)
```javascript
const handleKeyDown = (e) => {
  if (e.key === 'Tab') {
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      e.preventDefault();
    }
  }
};
```

## Motion and Animation

### Respect Prefers Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Text and Typography

### Font Size
- Minimum: 14px
- Recommended: 16px
- Headings: 24px+

### Line Height
- Minimum: 1.5
- Recommended: 1.6

### Letter Spacing
- Minimum: 0.12em

## Color Blindness

### Avoid Color-Only Indicators
```html
<!-- Good -->
<span style="color: red;">
  <span aria-label="error">✕</span> Error
</span>

<!-- Avoid -->
<span style="color: red;">Error</span>
```

### Test with Color Blindness Simulator
- Coblis: https://www.color-blindness.com/coblis-color-blindness-simulator/
- Chrome DevTools: Rendering > Emulate CSS media feature prefers-color-scheme

## Responsive Design

### Mobile Accessibility
- Touch targets: 44x44px minimum
- Readable text without zoom
- Responsive layout
- Orientation support

### Testing on Mobile
- iOS VoiceOver
- Android TalkBack
- Mobile browsers
- Screen readers

## Accessibility Checklist

- [ ] Semantic HTML used
- [ ] ARIA labels where needed
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Color contrast adequate
- [ ] Alt text on images
- [ ] Form labels present
- [ ] Error messages clear
- [ ] No color-only indicators
- [ ] Respects prefers-reduced-motion
- [ ] Touch targets 44x44px
- [ ] Screen reader tested
- [ ] Keyboard navigation tested
- [ ] Lighthouse audit passed

## Testing Tools

### Automated Testing
- Lighthouse (Chrome DevTools)
- axe DevTools
- WAVE
- Accessibility Insights

### Manual Testing
- Keyboard navigation
- Screen reader testing
- Color contrast checking
- Mobile testing

### Browser Extensions
- axe DevTools
- WAVE
- Lighthouse
- Accessibility Insights

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)

## Accessibility Statement

ShopSphere is committed to accessibility. If you encounter any accessibility issues, please contact us at accessibility@shopsphere.com.

## Continuous Improvement

- Regular accessibility audits
- User feedback incorporation
- Latest standards compliance
- Ongoing testing and updates

## Future Enhancements

- [ ] High contrast mode
- [ ] Text size adjustment
- [ ] Language selection
- [ ] Captions for videos
- [ ] Transcripts for audio
- [ ] Enhanced keyboard shortcuts
- [ ] Voice control support
