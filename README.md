# Personal Portfolio Website

A modern, responsive personal portfolio website built with React, TypeScript, and Vite. Features a unique dot-matrix inspired design aesthetic and smooth animations.

## Features

- 🎨 Modern, minimalist design with dot-matrix inspired elements
- ⚡ Built with Vite for lightning-fast development
- 🎭 Smooth animations powered by Framer Motion
- 📱 Fully responsive design
- 🎯 TypeScript for type safety
- 💅 Styled with Styled Components

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/personal-website.git
cd personal-website
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Project Structure

```
personal-website/
├── public/
│   └── fonts/
│       └── DotMatrix.css
├── src/
│   ├── components/
│   │   └── Navigation.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   └── Experience.tsx
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Customization

1. Update the content in the pages components to reflect your personal information
2. Modify the color scheme in `App.tsx` by updating the CSS variables
3. Add or remove sections as needed
4. Customize animations by modifying the Framer Motion parameters

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by Nothing's dot-matrix design aesthetic
- Built with React and modern web technologies
- Animations powered by Framer Motion 