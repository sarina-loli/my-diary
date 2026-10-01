# Diary website plan

## Experience
- Build a warm, premium diary app in blush pink, ivory, cream, and subtle beige, with elegant serif headings and soft glass surfaces.
- Create a responsive fixed sidebar on larger screens and a compact mobile header/menu on phones and tablets.
- Add a staged home illustration where a character approaches an opening door, settles into a cozy room, and opens a dimensional diary that reveals the four supplied quotes.
- Use restrained particles, flowers, lighting, shadows, page motion, touch feedback, and a theme switch while preserving the light-pink default.

## Pages and flows
- Home: animated room and diary sequence, current time, quotes, and a smart Get Started button.
- Login and Register: animated validated forms with local account storage and clear error feedback.
- Add Entry: title, writing area, mood picker, live character count, date display, and save confirmation.
- Dashboard: saved entries with click-to-expand rows, smooth reveal motion, and a polished empty state.
- Profile: account details, diary title, entry count, and logout.
- Redirect signed-out visitors from Dashboard, Add Entry, and Profile to Login.

## Implementation
- Use the existing TanStack React router (the project's supported React router) with separate files for all requested URLs and route-specific sharing metadata.
- Store the account, login state, theme, and entries in localStorage through a reusable client-side storage module.
- Add shared app shell, navigation, auth guard, page header, controls, toast system, and animated decorative elements.
- Define the full palette, typography, shadows, depth, and motion centrally in the design system.
- Verify registration, login, protected redirects, entry saving, dashboard expansion, profile counts, logout, and responsive layouts in the running app.
