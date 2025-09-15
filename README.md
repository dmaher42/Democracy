# Democracy - Year 9 Civics & Citizenship Unit Plan

A React application for managing Year 9 Civics & Citizenship unit plans with ACARA and South Australian Curriculum alignment.

## Features

- Interactive unit plan editor with curriculum alignment
- Support for both ACARA and SA curriculum views
- Export/import functionality for JSON data
- Print-friendly layouts
- Local storage for automatic saving
- Responsive design with Tailwind CSS

## Development

This project is built with Vite and React.

### Prerequisites

- Node.js 18+ 
- npm

### Getting Started

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Building for Production

\`\`\`bash
npm run build
\`\`\`

### Deployment

The app is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment workflow builds the app and publishes the `/dist` directory to the `gh-pages` branch.

## Project Structure

- `/src/App.jsx` - Main application component
- `/src/main.jsx` - Application entry point
- `/src/index.css` - Global styles with Tailwind CSS
- `/vite.config.js` - Vite configuration with GitHub Pages base path
- `/.github/workflows/deploy.yml` - GitHub Actions deployment workflow

## License

Educational use only.