# 🚀 AppDev Central

**AppDev Central** is a comprehensive internal management system designed for managing teams, operations, and user records. It features a modern tech stack centered around **Next.js 15**, **Laravel**, and **Ant Design**, providing a premium, fluid user experience with robust authentication and role-based access.

---

## ✨ Features

- 🔐 **OAuth2 Authentication**: Secure login via Google Authentication.
- 📊 **Dashboard Analytics**: Real-time overview of system statistics and latest user activity.
- 👥 **User Management**: Complete CRUD functionality with paginated tables, filtering, and bulk status updates.
- 🛡️ **Session Management**: Secure session handling with Laravel Sanctum and Next.js middleware.
- 🎨 **Modern UI/UX**: Built with Ant Design, Tailwind CSS, and Lucide icons for a sleek, premium feel.

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (App Router, TypeScript)
- **UI Components**: [Ant Design (antd)](https://ant.design/)
- **Icons**: [Lucide React](https://lucide.dev/), [Tech Stack Icons](https://www.tech-stack-icons.com/) (Google, etc.)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Laravel](https://laravel.com/) (API)

---

## 🏁 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A running [Laravel Backend](https://github.com/esurenajames/appdev-central-backend) (or equivalent local API)

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/esurenajames/appdev-central.git
cd appdev-central
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following configurations (refer to `.env.example`):

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
LARAVEL_API_URL=http://localhost:8000/api
```

### 4. Running the Project
Launch the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🏗️ Project Structure

- `/app`: Next.js App Router pages and layouts.
- `/components`: Reusable UI components (Navbar, Sidebar, etc.).
- `/hooks`: Custom React hooks (Auth, Users API queries).
- `/lib`: API configuration and axios instances.
- `/interface`: TypeScript interface definitions.
- `middleware.ts`: Authentication and routing protection (currently `proxy.ts`).

---

## 💡 Troubleshooting: HTTP 429 (Too Many Requests)

If you encounter an **HTTP 429 Status code**, it means your client (browser) is sending too many requests to the server (Google or the Backend) in a short period.

**Common causes & fixes:**
1. **API Rate Limiting**: Laravel defaults to 60 requests/min for API routes. Check your backend `RouteServiceProvider` or `api` middleware throttle settings.
2. **Infinite Re-renders**: Ensure you aren't causing infinite loops in `useEffect` or React Query fetches.
3. **Google Avatar Rate Limits**: If Google is returning 429 on your avatar URL, ensure you aren't reloading the page or the image component excessively during development (especially with hot-reloading).

---

## 🛡️ License

© 2026 AppDev Central. All rights reserved. Update
