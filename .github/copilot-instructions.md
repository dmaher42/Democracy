# Democracy - Education Unit Planning Application

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Application Overview

Democracy is a single-file React application designed for creating and editing Year 9 Civics & Citizenship education unit plans. The application features:
- Interactive curriculum planning with ACARA/SA alignment viewing
- Export/import functionality (JSON)
- Print-friendly layouts
- Local storage for persistence
- Tailwind CSS styling

## Working Effectively

### Bootstrap and Build (REQUIRED)
Run these commands in sequence to set up the development environment:

1. **Install dependencies:** 
   ```bash
   npm install
   ```
   - Time: ~18 seconds
   - NEVER CANCEL: Set timeout to 60+ seconds
   - Downloads all required build tools (Babel, Tailwind CSS, etc.)

2. **Build the application:**
   ```bash
   npm run build
   ```
   - Time: ~2 seconds 
   - NEVER CANCEL: Set timeout to 30+ seconds
   - Compiles `app.jsx` → `app.js` and `src/input.css` → `styles.css`

### Individual Build Commands
If you need to build components separately:

```bash
# Build JavaScript only
npm run build:js  # Compiles app.jsx with Babel

# Build CSS only  
npm run build:css  # Processes Tailwind CSS
```

### Development and Testing
1. **Serve the application locally:**
   ```bash
   # Option 1: Using serve (install if needed)
   npm install --save-dev serve  # ~5 seconds, only needed once
   npx serve .
   
   # Option 2: Using Python (if available)
   python3 -m http.server 8080
   ```

2. **Access the application:**
   - Navigate to `http://localhost:8080` in a browser
   - **IMPORTANT**: External CDN dependencies may be blocked in some environments
   - The application should display an education unit planning interface

### Validation Scenarios
After making changes, ALWAYS test these scenarios:

1. **Build Verification:**
   - Run `npm run build` successfully
   - Verify `app.js` and `styles.css` are updated with recent timestamps
   - Check file sizes: `app.js` should be >70KB, `styles.css` should be >1KB

2. **Functional Testing:**
   - Open the application in a browser
   - Verify the title "Year 9 Civics & Citizenship – Healthy Democracy" displays
   - Test tab navigation (Overview, Sequence, Assessment, Curriculum, etc.)
   - Try adding a learning intention or success criterion
   - Test export/import functionality
   - Verify print preview works

3. **Code Quality:**
   - No JavaScript syntax errors in browser console
   - All React components render without errors
   - Tailwind classes apply correctly
   
**Note:** External CDN dependencies may be blocked in restricted environments, causing a blank page. This is expected in sandboxed environments but does not indicate build failure.

## Project Structure

### Key Files
```
/home/runner/work/Democracy/Democracy/
├── app.jsx              # Main React application source
├── app.js               # Compiled JavaScript (generated)
├── index.html           # Main HTML file with CDN dependencies
├── styles.css           # Compiled Tailwind CSS (generated)
├── src/input.css        # Tailwind source file
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
└── postcss.config.js    # PostCSS configuration
```

### Build Process
1. **Babel** transforms JSX in `app.jsx` → `app.js`
2. **Tailwind CSS** processes `src/input.css` → `styles.css`
3. **HTML** loads React/ReactDOM from CDN and compiled files

## Common Tasks

### Modifying the Application
- Edit `app.jsx` for React component changes
- Edit `src/input.css` for custom CSS (rare - uses Tailwind classes)
- Always run `npm run build` after changes
- Test in browser to verify changes work

### Adding New Features
- All React code is in `app.jsx` (single-file architecture)
- Use existing patterns for new components
- Maintain Tailwind CSS class usage
- Update DEFAULT_PLAN object for data structure changes

### Debugging Issues
- Check browser console for JavaScript errors
- Verify build completed without errors
- Ensure file timestamps updated after build
- Test with `npx serve .` for local development

## Current Limitations

### No Testing Framework
- No automated tests configured
- Manual testing required for all changes
- Use browser console and visual inspection

### No Linting/Formatting
- No ESLint or Prettier configured
- Follow existing code style in `app.jsx`
- Ensure consistent indentation and naming

### External Dependencies
- React, ReactDOM, Babel loaded from CDN
- May fail in restricted network environments
- Application still builds but may not run without internet access

## Timing Expectations

| Command | Expected Time | Timeout Setting |
|---------|---------------|-----------------|
| `npm install` | ~18 seconds | 60+ seconds |
| `npm run build` | ~2 seconds | 30+ seconds |
| `npm run build:js` | ~1 second | 30+ seconds |
| `npm run build:css` | ~1 second | 30+ seconds |
| Starting server | Instant | 10+ seconds |

## Build Output Validation

After successful build, verify these files:
- `app.js`: Should be ~30KB and contain compiled React code
- `styles.css`: Should be ~10KB and contain Tailwind utility classes  
- Both files should have recent modification timestamps

Quick validation commands:
```bash
ls -la app.js styles.css  # Check timestamps and sizes
wc -c app.js styles.css   # Verify file sizes
```

## Development Workflow

1. Make changes to `app.jsx`
2. Run `npm run build`
3. Start local server with `npx serve .`
4. Test application functionality in browser
5. Verify all features work as expected
6. Check browser console for any errors

## Quick Validation Commands

For rapid development validation:
```bash
# Full build and size check
npm run build && ls -la app.js styles.css && wc -c app.js styles.css

# Start development server
npx serve . 

# Check for common issues
grep -n "export\|import" app.jsx || echo "No ES6 modules (good)"
```

Always build and test your changes thoroughly before considering them complete.