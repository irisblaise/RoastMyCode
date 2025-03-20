# RoastMyCode

Get your code roasted by AI with style! A Next.js application that provides humorous and insightful code reviews.

## Features

- 🔍 AI-powered code analysis with OpenAI
- 🎨 Beautiful gradient-based UI with modern design
- 📊 Interactive shame score visualization
- 🚀 Real-time code roasting
- ✨ Responsive and accessible design

## CI/CD Status

This project uses GitHub Actions for continuous integration and deployment:
- ⚡️ Automated testing with Jest
- 🔬 Code quality checks with ESLint
- 📦 Automatic deployment to Vercel

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run linting
npm run lint
```

## Environment Variables

Required environment variables:
- `OPENAI_API_KEY`: Your OpenAI API key
- `VERCEL_TOKEN`: Vercel deployment token
- `VERCEL_ORG_ID`: Vercel organization ID
- `VERCEL_PROJECT_ID`: Vercel project ID

## Design System

The project uses a consistent design system featuring:
- Gradient backgrounds for visual depth
- Text gradients with bg-clip-text
- Backdrop blur effects for modern UI
- Responsive layouts with Tailwind CSS
- Animated UI components

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
