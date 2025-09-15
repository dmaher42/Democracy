# Democracy - Year 9 Civics Unit Plan

A React-based interactive unit planning tool for Year 9 Civics & Citizenship education, designed for quick editing, printing, and curriculum alignment viewing.

## Features

- Interactive unit planning interface with tabbed navigation
- JSON export/import functionality for sharing and backup
- Print-friendly layout for documentation
- Local storage persistence
- SA/ACARA curriculum alignment toggle
- Responsive design with Tailwind CSS

## Live Demo

Visit the deployed application at: [https://dmaher42.github.io/Democracy/](https://dmaher42.github.io/Democracy/)

## Development

### Prerequisites

- Node.js 18+ 
- npm

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/dmaher42/Democracy.git
   cd Democracy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the `main` branch using GitHub Actions.

To deploy manually using gh-pages:

```bash
npm run deploy
```

## Technology Stack

- **React** - UI framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **GitHub Pages** - Hosting platform

## Project Structure

```
Democracy/
├── .github/workflows/     # GitHub Actions for deployment
├── src/                   # Source code
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # React entry point
│   └── index.css         # Tailwind CSS imports
├── public/               # Static assets
├── dist/                 # Built files (generated)
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── package.json          # Project dependencies
```

## Usage

The application provides an interactive interface for:

1. **Unit Overview** - View and edit learning intentions, success criteria, and pedagogy notes
2. **Sequence** - Browse the 8-week lesson sequence with activities and resources
3. **Assessment** - Review formative and summative assessment strategies
4. **Curriculum** - Toggle between SA and ACARA curriculum alignment views
5. **Differentiation** - Manage adjustments and differentiation strategies
6. **Resources** - Access teacher notes and implementation guidance

### Key Features

- **Export/Import**: Save your unit plan as JSON for backup or sharing
- **Print Support**: Generate clean printouts for documentation
- **Editable Lists**: Add, remove, and modify success criteria and pedagogy notes
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Author

Created by Daniel Maher for Murray Bridge High School (SA)