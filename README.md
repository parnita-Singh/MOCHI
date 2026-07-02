
# Mochi 🍡

An AI-powered budgeting and expense tracking app built for people who want to understand their spending without being judged for it.

Built as part of the **AWS Student Builder Cohort 2026** (AI + Cloud Track, Team Beach).

---

## What it does

- Track expenses across categories
- View a running total of spending
- AI-powered spending insights *(in progress)*
- Clean, kawaii-inspired interface built for Gen Z

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, Tailwind CSS |
| Database | AWS DynamoDB |
| Deployment | AWS Amplify |
| AI (planned) | AWS Bedrock |

---

## Getting Started

**Prerequisites:** Node.js (v18+), an AWS account

**1. Clone the repo**
```bash
git clone https://github.com/PARNITA-SINGH/MOCHI.git
cd MOCHI
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**

Create a `.env.local` file in the root folder:

**4. Run locally**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## Live Demo

🔗 [MOCHI](https://wally-silk.vercel.app/)

---

## Project Structure
---

MOCHI/
├── app/
│   ├── api/
│   │   └── expenses/
│   │       └── route.js
│   ├── layout.js
│   ├── page.js
│   └── globals.css
│
├── components/
│        │   └──sections/
│        │        └──Hero.jsx
│        │
│        ├── NavBar.jsx
│        ├── Mascot.jsx
│        ├──RainbowFloat.jsx
├── public/
│   └── MOCHI/
└── README.md

## Team

| Name | GitHub |
|---|---|
| Parnita Singh | [@PARNITA-SINGH](https://github.com/PARNITA-SINGH) |
| Prachi Mann | ([@prachimann](http://www.github.com/prachimaan)) |

---

## Weekly Progress

**Week 1:** Project concept, branding, landing page scaffold, initial deployment.

**Week 2:** Visual redesign (black background, unisex palette), custom mascot, floating hero animation, Sign In/Sign Up flow.

**Week 3:** Working MVP with DynamoDB integration, API routes, expense tracking functionality.
=======

