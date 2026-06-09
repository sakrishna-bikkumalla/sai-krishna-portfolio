# Sai Krishna Bikkumalla — Portfolio

Personal portfolio website for **Sai Krishna Bikkumalla**, an aspiring AI/ML Engineer specializing in Machine Learning, Deep Learning, and Generative AI.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS** — styling
- **shadcn/ui** — component library (Radix UI primitives)
- **Framer Motion** — animations and scroll-triggered transitions
- **React Router DOM** — routing

## Sections

| Section | Description |
|---|---|
| Hero | Intro with profile photo and social links |
| About | Interest areas: Full Stack, Cloud, Blockchain, AI/ML |
| Skills | Technical and soft skills |
| Projects | 8 featured projects with GitHub/demo links |
| Open Source | Merge requests grouped by project (code.swecha.org) |
| Viswam AI Contributions | Stats dashboard — projects, MRs, issues, commits with drill-down dialog |
| Experience & Education | Work history, academic background, certifications |
| Contact | Location, LinkedIn, email CTA |

## Getting Started

**Prerequisites:** Node.js 18+ or Bun

```sh
# Clone the repository
git clone https://github.com/sakrishna-bikkumalla/sai-krishna-portfolio.git
cd sai-krishna-portfolio

# Install dependencies
npm install
# or
bun install

# Start the development server
npm run dev
# or
bun dev
```

The app runs at `http://localhost:5173` by default.

## Available Scripts

```sh
npm run dev        # Start development server
npm run build      # Production build
npm run build:dev  # Development build
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

## Project Structure

```
src/
├── assets/          # Static assets (profile image)
├── components/
│   ├── ui/          # shadcn/ui primitive components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── OpenSource.tsx
│   ├── ViswamContributions.tsx
│   ├── Experience.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── CustomCursor.tsx
├── data/
│   └── viswam.json  # Open-source contribution data
├── pages/
│   ├── Index.tsx    # Main page (composes all sections)
│   └── NotFound.tsx
├── hooks/
├── lib/
├── App.tsx
├── main.tsx
└── index.css        # Global styles and Tailwind utilities
```

## Features

- Dark mode by default with light/dark toggle
- Custom animated cursor with spring physics and color trail (desktop only)
- Scroll-triggered entrance animations via Framer Motion
- Fully responsive — mobile hamburger menu, adaptive grid layouts
- Searchable and filterable contribution explorer dialog

## Contact

- **Email:** saikrishnabikkumala@gmail.com
- **LinkedIn:** [bikkumalla-sai-krishna](https://www.linkedin.com/in/bikkumalla-sai-krishna)
- **GitHub:** [sakrishna-bikkumalla](https://github.com/sakrishna-bikkumalla)
