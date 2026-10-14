# Responsive Portfolio Website

A responsive personal portfolio with a React frontend and a Node.js/Express backend. Visitors can read about me, see my skills and projects, and send a message through a contact form. Messages are stored in MongoDB.

Built for the **Cognevance Technologies** Full Stack Web Developer program (Level 1).

- Live site: https://cognevance-portfolio-website.vercel.app/
- API: _add your Render link_

## Features

- Sections: About, Skills, Projects, Contact
- Responsive layout with a mobile menu
- One hero entrance animation (disabled when the visitor prefers reduced motion)
- Light and dark mode that follow the system setting
- Contact form with validation on both the client and the server
- Messages saved to MongoDB, with rate limiting against spam
- Protected endpoint for the owner to read messages

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, Vite, plain CSS |
| Backend | Node.js, Express, Helmet, CORS, express-rate-limit |
| Database | MongoDB (Atlas) with Mongoose |
| Hosting | Vercel (frontend), Render (backend), MongoDB Atlas |

## Project structure

```
cognevance_portfolio-website/
├── client/                 React app
│   └── src/
│       ├── data.js         Edit this file to change your content
│       ├── App.jsx
│       ├── ContactForm.jsx
│       └── styles.css
├── server/                 Express API
│   ├── models/Message.js
│   ├── routes/contact.js
│   └── server.js
└── docs/                   Screenshots
```

## Setup

You need Node.js 18+ and a free MongoDB Atlas cluster.

### 1. Backend

```bash
cd server
npm install
cp .env.example .env     # then fill in the values
npm run dev
```

`.env` values:

| Variable | Meaning |
| --- | --- |
| `MONGODB_URI` | Connection string from MongoDB Atlas |
| `CLIENT_URL` | Frontend URL allowed by CORS (`http://localhost:5173` locally) |
| `ADMIN_KEY` | Long random string used to read saved messages |
| `PORT` | Server port (default 5000) |

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173. In development, Vite forwards `/api` requests to the backend on port 5000.

## API

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/health` | Health check |
| POST | `/api/contact` | Save a message. Body: `name`, `email`, `subject` (optional), `message` |
| GET | `/api/contact` | List messages. Requires header `x-admin-key` |

## Deployment

The frontend is deployed at https://cognevance-portfolio-website.vercel.app/. The Express API and MongoDB need separate hosting. GitHub Pages can also deploy the static frontend through `.github/workflows/deploy.yml`; set the repository Pages source to **GitHub Actions**. To enable contact form submissions, set the `VITE_API_URL` environment variable to the deployed API URL (without a trailing slash).
