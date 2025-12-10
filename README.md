# CareerFlow AI

Full-stack SaaS application for AI-powered CV, LinkedIn, and GitHub optimization.

## Features

- **CV Optimization**: Upload PDF/DOCX, get ATS score and improvements.
- **LinkedIn Booster**: Optimize "About" section and get post ideas.
- **GitHub Audit**: Analyze repositories and generate portfolio.
- **AI Integration**: Supports both OpenAI and Google Gemini.

## Project Structure

- `/frontend`: Next.js 14 + TailwindCSS
- `/backend`: Node.js + Express
- `/docker-compose.yml`: Deployment config

## Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API Key OR Google Gemini API Key

### Setup

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your API keys
   npm start
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Docker Setup**
   ```bash
   docker-compose up --build
   ```

## API Endpoints

- `POST /api/cv/upload`
- `POST /api/cv/optimize`
- `POST /api/linkedin/optimize-about`
- `POST /api/github/audit`

## Tech Stack

- **Frontend**: Next.js, Tailwind v4, Framer Motion
- **Backend**: Express, Multer, PDF-Parse, OpenAI/Gemini SDK
