# Shopping-website — E-Commerce Portfolio Site

A full-stack e-commerce web app built as a personal portfolio project to learn and practice production-level patterns in authentication, state management, and full-stack architecture with Next.js.

Live site: [shopping-website-eight-xi.vercel.app]

video:
[![Watch the demo](https://img.youtube.com/vi/eLg7qiOBKnA/maxresdefault.jpg)](https://youtu.be/eLg7qiOBKnA)

---

## Screenshots
<img width="786" height="516" alt="Screenshot 2026-08-01 112041" src="https://github.com/user-attachments/assets/040249cb-b89e-43c7-96de-b44fd100688d" />

<img width="1360" height="600" alt="Screenshot 2026-08-01 112030" src="https://github.com/user-attachments/assets/2358a7c4-f123-4b0d-a9ff-774dbfa8b116" />

<img width="1333" height="626" alt="Screenshot 2026-08-01 112016" src="https://github.com/user-attachments/assets/ebbf708e-b25a-4b01-ac40-a2f515ea33b4" />

<img width="959" height="629" alt="Screenshot 2026-08-01 112001" src="https://github.com/user-attachments/assets/f1175a71-b17c-4c23-90c7-29c18376fd3e" />

<img width="1336" height="640" alt="Screenshot 2026-08-01 111940" src="https://github.com/user-attachments/assets/ccc59349-7912-4d5b-befe-c8d74040b0ff" />

<img width="1341" height="639" alt="Screenshot 2026-08-01 111923" src="https://github.com/user-attachments/assets/5e05d0f1-1a17-4373-a653-c1577c8369a8" />

---

## About This Project

This project started as a way to move beyond tutorials and build a real, working online store from the ground up — including writing my own authentication system instead of using a library like NextAuth, so I could understand exactly how login sessions, password security, and protected routes actually work under the hood.

It began as a React + Vite app and was later migrated to Next.js (App Router) to take advantage of server-side rendering, API routes, and a more production-realistic project structure.

## Tech Stack

- **Framework:** Next.js (App Router), TypeScript
- **Database:** MongoDB with Mongoose
- **Auth:** Custom-built with bcrypt (password hashing) and JWT (session tokens, stored in httpOnly cookies)
- **State Management:** Zustand (cart, liked items, auth state), with localStorage + database persistence
- **Data Fetching:** TanStack Query
- **Styling:** Tailwind CSS v4
- **Carousel:** Swiper.js
- **Deployment:** Vercel

## Key Features

- **Custom authentication system** — built from scratch rather than using an auth library, including:
  - Password hashing with bcrypt and hardened Mongoose schemas
  - JWT-based sessions stored in httpOnly cookies for security
  - Protected account routes with server-side token verification
- **Persistent cart & liked items** — synced to the user's database record (not just localStorage), so a signed-in user's cart follows them across devices and doesn't leak into a shared/guest browser session
- **Guest-friendly cart** — cart works without logging in, following standard e-commerce UX, while account pages remain protected
- **Product browsing** — hero carousel, product modals, search, and a product grid powered by the Escuela JS API

## Challenges & What I Learned

- Debugged a subtle bug where cart/liked items persisted in `localStorage` across different user sessions on the same browser, and fixed it by moving cart/liked state to sync with the database and clearing local state on logout.
- Diagnosed and fixed hydration errors caused by duplicate `<html>`/`<body>` tags across nested layouts in the Next.js App Router.
- Worked through several rounds of MongoDB Atlas connectivity issues (DNS resolution failures, IP allowlist configuration) to get both local development and the production Vercel deployment reliably connecting to the database.
- Learned firsthand why authentication is hard to get right — from hashing and token storage to making sure logout actually clears all relevant client and server state.

## Running Locally

```bash
git clone https://github.com/Alina-ahmad/shopping-website.git
cd shopping-website
npm install
```

Create a `.env.local` file in the root with:

```
MongoURL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Then run:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

---

Built by Alina Ahmad as a self-directed learning project.

