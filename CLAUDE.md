# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript project management application built with Vite, Material-UI (MUI), and React Router. The codebase is currently being migrated from JavaScript to TypeScript.

## Development Commands

### Essential Commands

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Format code with Prettier
npm run format
```

## Architecture

### Technology Stack

- **Build Tool**: Vite 8.0 with @vitejs/plugin-react (using Oxc)
- **Framework**: React 19.2 with TypeScript
- **UI Library**: Material-UI (MUI) v7
- **Routing**: React Router v7
- **Forms**: React Hook Form v7
- **Date Handling**: Day.js with MUI Date Pickers
- **Styling**: Emotion (CSS-in-JS via MUI)

### Project Structure

```
src/
├── component/
│   ├── layouts/
│   │   └── SidebarLayout/     # Main layout with sidebar and navbar
│   │       ├── SidebarLayout.tsx
│   │       ├── Sidebar/
│   │       └── Navbar/
│   ├── pages/                  # Page components
│   │   ├── Auth/Login/
│   │   ├── Dashboard/
│   │   └── Project/DetailProject/
│   └── ui/                     # Reusable UI components
│       ├── Avatar/
│       ├── Forms/
│       │   ├── DatePicker/
│       │   ├── Dropdown/
│       │   ├── Select/
│       │   └── TextField/
│       ├── Modal/
│       ├── Pagination/
│       └── Table/
├── App.tsx                     # Router configuration
└── main.tsx                    # Application entry point
```

### Key Architectural Patterns

**Layout System**: Pages use the `SidebarLayout` component which provides:

- Fixed sidebar navigation
- Top navbar
- Breadcrumb support via `breadcrumbs` prop (array of `{label, href}` objects)
- Page title via `pageTitle` prop
- Main content area with proper margins (30px left margin for sidebar)

**Routing**: Configured in `App.tsx` using `createBrowserRouter`:

- `/` - Dashboard (main page)
- `/login` - Login page
- `/projects/:id` - Project detail page

**Theming**: Custom MUI theme configured in `App.tsx`:

- Default font: Roboto
- Wrapped with `LocalizationProvider` (Day.js adapter for date components)
- `CssBaseline` applied for consistent base styles

**Component Pattern**: Components follow TypeScript interface-based props with `React.FC<Props>` pattern.

## Code Style and Linting

### ESLint Configuration

The project uses a comprehensive ESLint setup (eslint.config.js) with:

- React 17+ JSX transform (no need to import React in scope)
- React Hooks rules enforced
- JSX accessibility (a11y) rules
- Import order enforcement:
  - Groups: builtin → external → internal → parent → sibling → index
  - Alphabetical sorting within groups
  - Newlines between groups required
- Console.log statements trigger warnings
- Unused variables are errors (except those prefixed with `_`)
- Self-closing components enforced
- Prop-types validation disabled (using TypeScript instead)

### Prettier Configuration

Configured in `.prettier.json`:

- Semicolons: required
- Single quotes: true (note: config has typo "singleQuota" instead of "singleQuote")
- Trailing commas: all
- Tab width: 2

## TypeScript Migration Notes

The codebase is actively being migrated from JavaScript to TypeScript:

- Source files use `.tsx` extension for components
- Strict mode enabled in tsconfig.json
- Target: ESNext with react-jsx transform
- Many components already have proper TypeScript interfaces

When adding new components:

- Define interface for props with descriptive names (e.g., `SidebarLayoutProps`)
- Use `React.FC<PropsInterface>` for function components
- Define interfaces for data structures (e.g., `BreadcrumbsItem`)
- Explicitly type useState hooks when needed

## Component Development

### Reusable UI Components

All reusable components live in `src/component/ui/`. These are custom wrappers around MUI components. When creating new components:

- Place in appropriate subdirectory under `ui/`
- Export as default from the component file
- Use TypeScript interfaces for props
- Follow Material-UI theming patterns

### Forms

Form components in `src/component/ui/Forms/` include:

- TextField - Text input wrapper
- Select - Dropdown select wrapper
- DatePicker - Date picker using MUI X Date Pickers
- Dropdown - Custom dropdown component

Project uses `react-hook-form` for form state management.

## Important Notes

- The sidebar layout applies `marginLeft: 30` (30px) to the main content area to account for the fixed sidebar
- Breadcrumbs are rendered inside the `SidebarLayout` component via the `renderBreadcrumbs()` function
- Router uses React Router v7 `createBrowserRouter` API (not the legacy BrowserRouter)
- MUI components require the `LocalizationProvider` wrapper for date pickers to function
