# AI Tool Usage Disclosure

- **Tools Used**: AI coding assistant for boilerplate scaffolding and Tailwind CSS responsive layout verification.
- **Representative Prompts**:
  1. "Scaffold a React + Vite task dashboard structure with Context API state management and localStorage persistence."
  2. "Create an accessible three-slide Focus Notes carousel component with previous/next buttons and tab indicators."
- **AI-Assisted Areas**: Initial component file structure, sample task seed data, and responsive table-to-card breakpoints.
- **Verification & Adjustments**: Verified `localStorage` hydration so an empty array saved by the user does not fall back to sample seed data on refresh, and ensured all mobile controls meet 44x44px touch target sizing.
