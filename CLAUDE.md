# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A portfolio/CV management application built with React + TypeScript + Vite. Manages work experience, skills, projects, and education entries via a backend API. The UI language is Indonesian (Bahasa Indonesia).

## Development Commands

```bash
npm run dev          # Start dev server (Vite HMR)
npm run build        # Production build
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run format       # Prettier format all files
```

No test framework is configured. The backend API runs on `localhost:8080` and is proxied via Vite (`/api` → `http://localhost:8080`).

## Architecture

### Tech Stack

- **Vite 8** + **React 19** + **TypeScript** (strict mode)
- **MUI v7** (Material UI) with Emotion CSS-in-JS
- **React Router v7** (`createBrowserRouter`)
- **React Hook Form** + **Yup** for form validation
- **Day.js** with MUI X Date Pickers
- **react-hot-toast** for notifications

### Path Alias

`@/` maps to `src/` — configured in both `vite.config.ts` (resolve alias) and `tsconfig.json` (paths). Always use `@/` for imports from `src/`.

### Project Structure

```
src/
├── components/
│   ├── layouts/SidebarLayout/   # Main authenticated layout (sidebar + navbar)
│   ├── pages/                   # Page components organized by domain
│   │   ├── Auth/Login/, Auth/Register/
│   │   ├── Dashboard/
│   │   ├── Education/, Education/CreateUpdateEducation/
│   │   ├── Project/, Project/CreateUpdateProject/
│   │   ├── Skills/, Skills/CreateUpdateSkill/
│   │   ├── WorkExperience/
│   │   └── Settings/
│   └── ui/                      # Reusable UI components (MUI wrappers)
├── constants/routes.ts          # Centralized route path constants (ROUTES object)
├── services/
│   ├── index.ts                 # Aggregates all API modules
│   └── api/                     # API modules: auth, education, project, skills, work_experience
├── types/api.ts                 # Shared API response types
├── utils/
│   ├── network.ts               # Fetch-based HTTP client (auto-attaches Bearer token)
│   └── session.ts               # Token storage (localStorage)
├── App.tsx                      # Router config + theme + providers
└── main.tsx                     # Entry point
```

### Key Patterns

**Authentication**: Token-based auth stored via `session.ts`. Two route loaders enforce access:
- `sidebarLoader` — redirects unauthenticated users to `/login` (used by all protected pages)
- `authLoader` — redirects authenticated users away from login/register to `/`

**API Layer**: `utils/network.ts` is a custom fetch wrapper (not Axios). It provides `get`, `post`, `put`, `patch`, `delete` methods, auto-sets `Authorization: Bearer <token>`, and throws `NetworkError` on non-OK responses. On 401, the session is automatically cleared. Each domain API module (e.g., `services/api/project.ts`) co-locates its Yup validation schemas, TypeScript payload/response types, and API call functions.

**Layout System**: Authenticated pages wrap content in `SidebarLayout`, which provides a fixed 280px sidebar (hidden on mobile), top navbar, breadcrumbs, and page title. The sidebar collapses to a drawer below the `lg` breakpoint (1200px).

**Routing**: All route paths are defined as constants in `constants/routes.ts` via the `ROUTES` object. New routes must be added there and referenced by constant, not hardcoded strings.

**Form Pages**: CRUD pages follow a `CreateUpdate<Entity>` naming convention and handle both create and edit in one component. Forms use `react-hook-form` with `@hookform/resolvers` for Yup schema validation.

## Code Style

- ESLint enforces import ordering (builtin → external → internal → parent → sibling → index, alphabetically sorted within groups, newlines between groups)
- Prettier: semicolons, single quotes, trailing commas, 2-space indent
- Components use `React.FC<Props>` with TypeScript interfaces
- Default exports for components
- Unused variables prefixed with `_` are allowed; all others are errors

## Theming

- Font family: **Manrope** (not Roboto)
- Custom MUI theme defined in `App.tsx`
- `CssBaseline` applied globally
- `LocalizationProvider` with Day.js adapter wraps the app for date pickers
