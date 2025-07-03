# Paradox Merch Website

An interactive, modern merch and experiences platform built for **Paradox**, powered by **Next.js 15**, **Tailwind CSS 4**, and a **Go + GraphQL backend**.

This platform allows users to explore exclusive merchandise, book time slots for experiences like **Lazer Tag** and **LinkedIn Headshots**, and enjoy a seamless, beautiful UI throughout their shopping journey.

---
![image](https://github.com/user-attachments/assets/53be7395-5fab-490b-8375-37bad1dcb69c)


## 🚀 Tech Stack

- **Frontend:** [Next.js 15](https://nextjs.org/), [Tailwind CSS 4](https://tailwindcss.com/)
- **Backend:** Go (Golang) with [GraphQL](https://graphql.org/)
- **Deployment:** Vercel 

---

## ✨ Features

### 🖥️ Modern Responsive Design

<p align="center">
  <img src="https://github.com/user-attachments/assets/d5b61acd-416a-4c77-80ff-e0330cdf54a8" alt="Responsive Design 1" height="500" />
  <img src="https://github.com/user-attachments/assets/f7814283-2276-47b4-b3c9-844fa3fdda0a" alt="Responsive Design 2" height="500" />
</p>


- Fully responsive design optimized for mobile, tablet, and desktop
- Tailwind CSS 4 with system-based theming and utility-first design
- Smooth animations and dark/light mode support

### 👕 Dynamic Experiences and Merch Section
![image](https://github.com/user-attachments/assets/286dbc46-15fd-4a8e-87bf-9136ea24dec4)

- Live merch listings fetched via GraphQL
- Categories, price filtering, and detail pages for each product

### 🎯 Experiences Booking
![image](https://github.com/user-attachments/assets/9ee5b7b0-cd98-49a9-a362-03f36d4e2a73)

- Dedicated section for experiences like:
  - **Lazer Tag**
  - **LinkedIn Headshots**
- **Time Slot Management System** to prevent overbooking
- Auto-updated availability shown to users

### 🖼️ Beautiful Gallery Page
![image](https://github.com/user-attachments/assets/e25630e3-129c-4a14-88c9-19c8b7e203f2)

- Showcases all merchandise in a visual-first layout
- High-quality product images and grid-based display
- Optimized for performance and lazy loading

### 🛒 Elegant Cart Experience
![image](https://github.com/user-attachments/assets/ff6669ba-2ea6-459a-8473-1adafad7b338)

- Add merch and experiences to a unified cart
- Intuitive cart drawer or dedicated cart page
- Quantity management, subtotal calculation, and checkout CTA

---

## 🙌 Contributors

Built with the help of Sales & Merch Team and Tech Leads at **Paradox 25**, with inputs from multiple departments and stakeholders.

---

## 🏁 Getting Started

1. Clone the repository  
2. Set up Firebase config in `.env.local`
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   NEXT_PUBLIC_FIREBASE_PROJECT_ID
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   NEXT_PUBLIC_FIREBASE_APP_ID
   NEXT_PUBLIC_GRAPHQL_URL
   NEXT_PUBLIC_BACKEND_URL
   ```
4. Run locally:

```bash
npm install
npm run dev
```
