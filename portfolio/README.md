# Portfolio

This is a Next.js portfolio with a Medium writing profile and contact form.

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

## Local development

Create `.env` with the values required by the contact form:

```env
EMAIL_USER="your-gmail-address"
EMAIL_PASS="your-gmail-app-password"
```

Then run:

```bash
npm install
npm run dev
```

## Deploy from GitHub

The included workflow deploys the app to Vercel whenever `main` is updated.

1. Import this GitHub repository into Vercel and create the project.
2. Add `EMAIL_USER` and `EMAIL_PASS` as production environment variables in Vercel.
3. In the GitHub repository settings, create a `production` environment and add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` as secrets.
4. Push to `main`, or start `Deploy to Vercel` from the Actions tab.

The Blog navigation item and the `blogs` terminal command open [Shlok Koirala on Medium](https://medium.com/@shlokkoirala19).
