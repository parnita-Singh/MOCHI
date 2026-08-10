<p align="center">
<img width="347" height="262" alt="image" src="https://github.com/user-attachments/assets/b741f18d-7b8d-4625-a12e-d11236a027c7" />
</p>

# Mochi

An AI powered budget tracker built for Gen Z and Alpha. Mochi helps young, first time earners understand and manage their money in a way that actually feels approachable, not clinical.

**Live app:** https://main.d3bxx53jps67fn.amplifyapp.com/
**Status:** Top 5 of 216 teams, AWS Student Builder Cohort

## What Mochi Does

Most young people never learn practical money habits growing up, and existing finance apps are built for adults managing mortgages, not someone getting their first paycheck. Mochi closes that gap by turning everyday spending into personalized, plain language financial guidance.

* Track spending and budgets in a clean, simple interface
* Get AI generated insights on your spending patterns, powered by AWS Bedrock
* Set and work toward monthly and yearly financial goals
* Sign in securely through NextAuth

## Tech Stack

* **Framework:** Next.js 15
* **Styling:** Tailwind CSS
* **Auth:** NextAuth.js
* **Database:** AWS DynamoDB
* **AI:** AWS Bedrock
* **Hosting / Deployment:** AWS Amplify

## AWS Services Used

| Service | Role |
|---|---|
| AWS DynamoDB | Fully managed NoSQL database storing user transactions and budget data |
| AWS Bedrock | Powers Mochi's AI driven insights, turning raw spending data into personalized guidance |
| AWS Amplify | Handles hosting and deployment, keeping Mochi live and accessible |

## Project Structure

\```
app/
  sign-in/
    page.jsx        # Authentication entry point (NextAuth)
  dashboard/
    page.jsx         # Main budget overview and spending visualization
  mochi-ai/
    page.jsx         # AI powered insights and guidance, backed by AWS Bedrock
\```

More routes and components will be added as the financial learning module is built out.

## Getting Started

Clone the repository and install dependencies:

\```bash
git clone https://github.com/parnita-Singh/MOCHI.git
cd MOCHI
npm install
\```

Set up your environment variables in a `.env.local` file. You will need credentials for:

* AWS DynamoDB
* AWS Bedrock
* AWS Amplify
* NextAuth (client ID, secret, and callback URL for your provider)

Then run the development server:

\```bash
npm run dev
\```

The app will be available at `http://localhost:3000`.

## Roadmap

* Dedicated financial budgeting learning module, in active development
* Bank and transaction app integration, so Mochi can flag impulse purchases and surface course correcting guidance automatically
* Goal based savings recommendations
* A dedicated mobile app
* Exploring real bank data integrations

## Team

Built by Parnita Singh as part of the AWS Student Builder Cohort.

## License

This project is currently unlicensed. Add a license file before public reuse or distribution.

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

🔗 [MOCHI](https://main.d3bxx53jps67fn.amplifyapp.com/)


## Team

| Name | GitHub |
|---|---|
| Parnita Singh | [@PARNITA-SINGH](https://github.com/PARNITA-SINGH) |
| Prachi Mann | [@prachimann](http://www.github.com/prachimaan) |

---
