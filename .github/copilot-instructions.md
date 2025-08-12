# Copilot Instructions for ezy_expense

## Project Overview
- **ezy_expense** is a full-stack expense and budget management app built with Next.js (App Router), TypeScript, and MongoDB (via Mongoose).
- The app uses NextAuth for authentication (email/password, Google), Redux Toolkit for client state, and Zod for validation.
- Major features: user auth, session management, CRUD for budgets/expenses, dashboard UI, RESTful API routes, and custom React components.

## Architecture & Data Flow
- **App Directory Structure:**
  - `app/` contains all Next.js routes, layouts, API endpoints, and dashboard pages.
  - `models/` defines Mongoose schemas for users, budgets, and expenses.
  - `lib/` holds DB connection logic, session utilities, and validation schemas.
  - `redux/` manages client-side state (store, slices).
  - `components/` contains reusable UI components.
- **API:**
  - All API routes are under `app/api/` (e.g., `budgets`, `expenses`, `user`).
  - Session and authentication logic is handled in `app/api/auth/[...nextauth]/route.ts` and `lib/session.ts`.
- **Data Flow:**
  - Client interacts with API routes for CRUD operations.
  - Server actions in `action/` and `app/actions/` handle business logic.
  - Redux is used for local state, especially user/session info.

## Developer Workflows
- **Start Dev Server:**
  - Use `pnpm dev` (or `npm run dev`, `yarn dev`, `bun dev`).
- **Linting:**
  - Run `pnpm lint` (uses ESLint, see `eslint.config.mjs`).
- **Build:**
  - Use `pnpm build` for production builds.
- **Testing:**
  - No explicit test setup found; add tests in a `__tests__` or `tests/` directory if needed.
- **Debugging:**
  - Use Next.js/React DevTools and inspect API route handlers for backend issues.

## Project-Specific Patterns
- **Session Handling:**
  - Session is managed via JWT cookies, with helpers in `lib/session.ts` and `lib/sessionFunctions.ts`.
- **Validation:**
  - All input validation uses Zod schemas in `lib/zod.ts`.
- **Redux:**
  - User state is managed in `redux/slice/userSlice.ts` and provided via `redux/providers.tsx`.
- **Component Structure:**
  - Dashboard UI is modular: see `app/dashboard/budgets/_components/` and `app/dashboard/expenses/components/`.
- **API Security:**
  - Middleware in `app/middleware.ts` protects routes requiring authentication.

## Integration Points
- **NextAuth:**
  - Configured in `auth.ts` and `app/api/auth/[...nextauth]/route.ts`.
- **MongoDB:**
  - Connection logic in `lib/db.ts`, models in `models/`.
- **Redux:**
  - Store setup in `redux/store.ts`.

## Examples
- To add a new budget API route: create a file in `app/api/budgets/` and use Mongoose models from `models/budgets.model.ts`.
- To add a new dashboard component: place it in the appropriate `app/dashboard/*/components/` folder and import it in the relevant page.

---

For more, see `README.md` and explore the `app/`, `models/`, and `lib/` directories.
