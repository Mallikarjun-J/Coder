# Sens-AI 

An AI-powered career coaching platform that helps professionals accelerate their job search with intelligent resume building, interview preparation, cover letter generation, and real-time industry insights.

---

##  Features

- **AI-Powered Career Guidance** — Personalized career advice tailored to your industry and skill set using Google Gemini AI.
- **Smart Resume Builder** — Generate ATS-optimized resumes with AI assistance and export them to PDF.
- **Interview Preparation** — Practice with dynamically generated, role-specific quiz questions and receive instant feedback and improvement tips.
- **Cover Letter Generator** — Create tailored cover letters for specific companies and job titles in seconds.
- **Industry Insights Dashboard** — Stay ahead with weekly-refreshed salary data, market outlook, growth rates, top skills, and key trends for your industry.

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | JavaScript / JSX |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| Authentication | [Clerk](https://clerk.com/) |
| Database | PostgreSQL via [Prisma ORM](https://www.prisma.io/) |
| AI | [Google Gemini 2.5 Flash](https://ai.google.dev/) |
| Background Jobs | [Inngest](https://www.inngest.com/) |
| Charts | [Recharts](https://recharts.org/) |
| Forms | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| PDF Export | [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) |

---

##  Project Structure

```
sens-ai/
├── app/
│   ├── (auth)/              # Sign-in and sign-up pages (Clerk)
│   ├── (main)/              # Protected app routes
│   │   ├── dashboard/       # Industry insights & career overview
│   │   ├── resume/          # AI resume builder
│   │   ├── ai-cover-letter/ # Cover letter generator & list
│   │   ├── interview/       # Mock interview quizzes & performance
│   │   └── onboarding/      # User profile setup (industry, skills)
│   ├── api/inngest/         # Inngest background job handler
│   └── page.js              # Public landing page
├── actions/                 # Next.js Server Actions
│   ├── user.js
│   ├── resume.js
│   ├── cover-letter.js
│   ├── interview.js
│   └── dashboard.js
├── components/              # Shared UI components
├── data/                    # Static data (features, FAQs, industries)
├── hooks/                   # Custom React hooks
├── lib/
│   ├── inngest/             # Background job definitions (weekly AI insights)
│   ├── prisma.ts            # Prisma client
│   └── checkUser.js         # Auth & user sync helper
└── prisma/
    └── schema.prisma        # Database schema
```

---

##  Database Schema

The app uses PostgreSQL with five core models:

- **User** — Profile, industry, skills, and years of experience (synced from Clerk)
- **Resume** — Markdown content, ATS score, and AI feedback (one per user)
- **CoverLetter** — Per-application cover letters with company and job title
- **Assessment** — Interview quiz results, scores, and AI improvement tips
- **IndustryInsight** — Salary ranges, growth rates, market outlook, and top skills (refreshed weekly via Inngest)

---

##  Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Accounts for: [Clerk](https://clerk.com/), [Google AI Studio](https://aistudio.google.com/), [Inngest](https://www.inngest.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/sens-ai.git
cd sens-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Inngest (Background Jobs)
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

### 4. Set Up the Database

```bash
npx prisma migrate dev --name init
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Run Inngest Dev Server (for background jobs)

In a separate terminal:

```bash
npx inngest-cli@latest dev
```

---

##  Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |

---

##  Background Jobs

Industry insights are refreshed automatically every **Sunday at midnight** via an Inngest cron job. The job fetches each industry stored in the database, calls Gemini AI for the latest salary ranges, growth rates, top skills, and market trends, and updates the `IndustryInsight` records accordingly.

To trigger this manually during development, use the [Inngest Dev Server UI](http://localhost:8288).

---

##  Deployment

The easiest way to deploy is via [Vercel](https://vercel.com/):

1. Push your code to GitHub.
2. Import the repository in Vercel.
3. Add all environment variables from your `.env` file in the Vercel dashboard.
4. Deploy — Vercel handles the rest.

For the Inngest background jobs to run in production, make sure the `/api/inngest` endpoint is reachable and your Inngest signing keys are correctly set.

---



