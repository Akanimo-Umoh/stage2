# Invoice App

A fully functional invoice management application built with React and TypeScript.

## Features

- **Create** invoices with full form validation
- **View** invoice list and detailed invoice pages
- **Edit** existing invoices (draft and pending only)
- **Delete** invoices with confirmation modal
- **Save drafts** for incomplete invoices
- **Mark invoices as paid** (pending invoices only)
- **Filter** invoices by status (Draft, Pending, Paid) with multi-select checkboxes
- **Light/Dark mode** toggle with preference persisted to localStorage
- **Fully responsive** layout for mobile (320px+), tablet (768px+), and desktop (1024px+)
- **Data persistence** via localStorage with JSON seed data on first load
- **Animated modals** with slide-in and scale-in transitions
- **Scroll to top** on page navigation

## Tech Stack

- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- React Router DOM v6
- date-fns
- Vite
- pnpm

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
pnpm install
pnpm approve-builds
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

## Status Rules

- **Draft** — can be edited and deleted. Cannot be marked as paid.
- **Pending** — can be edited, deleted, and marked as paid.
- **Paid** — can only be deleted. No editing allowed.

## Form Validation

Validation runs on submit and shows inline errors. Required fields show a red border and an error message next to the label. Two summary messages appear at the bottom of the form when applicable:

- _All fields must be added_ — when any required field is empty
- _An item must be added_ — when no invoice items have been added

Drafts skip field validation but still require at least one item.

## Accessibility

- Semantic HTML throughout
- All form fields have associated `<label>` elements
- All interactive elements use `<button>`
- Modals trap focus on open and release on close
- Modals close on `Escape` key
- Keyboard navigable — `Tab` and `Shift+Tab` cycle through modal focusable elements only
- `WCAG AA` color contrast in both light and dark modes
