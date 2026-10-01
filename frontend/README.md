# Velvet Pages Diary

Create a beautiful, modern frontend-only React website called “Diary” with a soft light-pink, white, cream, and subtle beige color palette. Make it feel cozy, elegant, romantic, and premium with a 3D animated diary aesthetic.

Main Requirements

Use React + React Router.

Use localStorage for login/register simulation and diary entries.

Fully responsive and optimized for mobile phones, tablets, laptops, and desktop PCs.

Use reusable components and clean project structure.

Use Framer Motion/CSS animations, smooth transitions, 3D effects, glassmorphism, shadows, and subtle floating elements.

Make every button and navigation link functional.

No backend.

Left Navigation

Create a fixed left sidebar with:
Diary logo → Home → Dashboard → Add Entry → Profile → Login
Highlight the active page and make the sidebar responsive on mobile/tablet with a hamburger menu.

Home Page

Create an immersive 3D animated diary story:

Show a cozy room with a girl near a door.

Animate the door opening and the girl walking inside.

Animate her sitting down and opening a beautiful 3D diary.

When the diary opens, smoothly reveal four quotes:

“Some memories deserve a place to stay.”

“Write what your heart cannot say.”

“Yesterday is a memory, today is a story.”

“Where thoughts become memories.”

Show a beautiful Get Started button.

Get Started:

Logged in → /add-entry

Not logged in → /login

Add subtle particles, floating flowers, page transitions, soft lighting, realistic shadows, and gentle 3D depth.

Login/Register

Create elegant animated forms.

Login: Email, Password, Login button, Register link.

Register: Full Name, Email, Password, Confirm Password, Diary Name, Register button.

Store user information and login state in localStorage.

Add Entry

Create a beautiful diary writing interface with:

Title

Content

Mood selector: 😊 😢 ❤️ ✨ 🌿 😠 💭

Save Entry button

Optional animated paper/pen effects.

Save title, content, mood, and date to localStorage, then navigate to Dashboard.

Dashboard

Create a premium diary dashboard showing saved entries as beautiful cards/list rows.

Each entry displays:
Date | Title | Mood

Instead of a permanent down-arrow button, make each entry expand/collapse when the user clicks the row or scrolls/interacts with it, revealing:

Full title

Full content

Mood

Date

Add smooth height/opacity animations when entries open and close.

If there are no entries, show:
“Your diary is waiting for its first story…”

Add Write Your First Entry button.

Profile

Display:

User name

Email

Diary name

Number of entries

Logout button

Logout removes the login state and redirects to Login/Home.

Protected Routes

Protect:
/dashboard
/add-entry
/profile

Unauthenticated users should automatically be redirected to /login.

Routes:
/ Home
/dashboard Dashboard
/add-entry Add Entry
/profile Profile
/login Login
/register Register

Extra Premium Features

Add tasteful features yourself to make the website feel production-quality:

Animated page transitions

3D diary/book opening effect

Floating flowers/hearts/paper particles

Soft background gradients

Hover/touch animations

Toast notification after saving an entry

Character counter for diary content

Current date/time display

Empty-state animation

Smooth scrolling

Responsive mobile bottom navigation or hamburger menu

Dark/light mode option while keeping the light-pink theme as the default

Beautiful loading animation

Micro-interactions for buttons, cards, inputs, and navigation

Important: Make the entire experience feel like a real interactive digital diary, not a basic CRUD website. Prioritize the 3D girl → door → room → sitting → diary opening animation on the Home page and ensure the complete experience works smoothly on phones, tablets, laptops, and desktop PCs.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/84c1a264-f4d4-41fd-908b-6256df63d8f3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
