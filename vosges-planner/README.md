# Vosges Planner

A Next.js application for planning activities in the Vosges region.

## Features

- Add and view Vosges activities
- Redis-backed data persistence
- Next.js 14 with App Router
- Modern React with hooks

## Getting Started

### Prerequisites

- Node.js 18+
- Redis instance

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```
REDIS_URL=redis://localhost:6379
```

### Running the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
vosges-planner/
├── app/
│   ├── api/
│   │   └── plan/
│   │       └── route.js
│   ├── layout.jsx
│   ├── page.jsx
│   └── globals.css
├── components/
│   └── Planner.jsx
├── lib/
│   ├── redis.js
│   └── data.js
├── public/
├── package.json
├── jsconfig.json
└── README.md
```

## API Endpoints

- `GET /api/plan` - Retrieve all plans
- `POST /api/plan` - Add a new plan

## Development

This project uses:

- **Next.js 14** - React framework
- **Redis** - Data persistence
- **ESLint** - Code linting

## License

MIT
