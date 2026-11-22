# FocusBoard — Task Management Dashboard

A responsive single-user task management dashboard built with **React**, **Vite**, and **Tailwind CSS**.

## Setup & Local Development

```bash
npm install
npm run dev
```

## Features Implemented
- **Full CRUD Operations**: Create, read, edit, and delete tasks with confirmation dialogs and form validation.
- **Combined Search & Filtering**: Case-insensitive title search paired with status tabs (`All`, `To do`, `In progress`, `Completed`) and priority filtering (`High`, `Medium`, `Low`).
- **Dynamic Statistics**: Real-time calculation of total tasks, in-progress count, completed count, and completion percentage.
- **Focus Notes Carousel**: Three-slide interactive carousel with previous/next controls and active slide indicators.
- **Browser Persistence**: Tasks sync automatically to `localStorage` without overwriting user edits on page reload.
- **Responsive & Accessible**: Tested at `390px` (mobile), `768px` (tablet), and `1440px` (desktop) with semantic HTML, accessible labels, and keyboard navigation.

## State Management Choice
React Context (`TaskContext`) combined with `useState` and `useMemo` provides a clean single source of truth without unnecessary external dependencies, keeping derived statistics and filtered task lists synchronized automatically.

## Known Limitations
- Sidebar navigation items (`Categories`, `Schedule`) serve as visual navigation placeholders for the single-view dashboard scope.
