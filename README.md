# 🌿 The Wild Oasis – Public Website (Next.js + Supabase)

##  Overview

This is the **public-facing booking site** for **The Wild Oasis**, a vacation rental platform featuring real-time availability, dynamic pricing, and a smooth reservation flow.

Built with **Next.js** and styled using **Tailwind CSS**, it connects to a **shared Supabase backend** (also used by the admin dashboard) to display live cabin data and manage bookings securely.

---

##  Features

- 👉 **Live Cabin Listings**  
  Cabins are fetched from **Supabase** with real-time updates and dynamic rendering.

- 👉 **Cabin Details Pages**  
  Full cabin descriptions, capacities, prices, discounts, and availability.

- 👉 **Reservation Flow**  
  Users can start the booking process via intuitive UI components.

- 👉 **Shared Supabase Backend**  
  Fully integrated with the **admin dashboard** using a common Supabase project for seamless data sync.

- 👉 **Next.js Performance**  
  Static site generation (SSG) and dynamic routes ensure fast load times and smooth UX.

- 👉 **Mobile-First Design**  
  Fully responsive layout built with **Tailwind CSS**.

---

##  Tech Stack

| Tool             | Purpose                                     |
|------------------|---------------------------------------------|
| **Next.js**      | React framework for routing and rendering   |
| **Tailwind CSS** | Utility-first CSS styling                   |
| **Supabase**     | Database, auth, and real-time API backend   |
| **Vercel**       | Hosting and CI/CD                           |

---



##  Architecture

- Uses **Supabase tables** to fetch:
  - Cabin data (`cabins`)
  - Reservation or guest data (`bookings`, if applicable)
- Same Supabase instance as the [admin dashboard](https://github.com/MehdiBouchachi/the-wild-oasis)  
- Public routes consume only **read-access data** (no dashboard privileges exposed)

---

##  Getting Started

```bash
npm install
npm run dev


