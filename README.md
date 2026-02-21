# Enterprise SaaS Dashboard

## Overview

This project is a production-grade frontend-only SaaS dashboard built using React, TypeScript (strict mode), and Tailwind CSS.

All API calls, asynchronous delays, failures, polling, pagination, filtering, and mutations are fully simulated within the frontend application. No external backend or third-party API is used.

The architecture is designed to demonstrate scalable frontend engineering patterns suitable for enterprise applications.

---

## Tech Stack

- React (Vite)
- TypeScript (Strict Mode)
- Tailwind CSS
- React Query (server-state management & async simulation)
- Zustand (global UI state)
- Recharts (performance charts)

---

## Architecture

The application follows a **feature-based folder architecture**:


src/  
app/  
features/  
campaigns/  
jobs/  
shared/  
store/  
lib/  

Each feature module contains:
- Components
- Hooks
- Service layer
- Types

This separation ensures:
- Clear domain boundaries
- Scalability
- Testability
- Maintainability

---

## Data Simulation Design

All data interactions are simulated via a dedicated service layer.

Key characteristics:

- Artificial delay using `setTimeout`
- Simulated failure states
- In-memory data persistence
- Pagination handled in service layer
- Filtering & sorting handled in service layer
- Polling lifecycle simulation for jobs

Example lifecycle:

Pending → Processing → Completed / Failed


All UI components remain free from business logic.  
Async logic lives in hooks + services.

---

## Campaign Management Module

### Features Implemented

- Sortable table (Name, Status, Budget)
- Multi-filter panel (Status, Min Budget, Max Budget)
- Debounced search input
- Pagination
- Bulk selection
- Query-based filtering
- Error state handling
- Empty state handling
- KPI summary cards

---

## Campaign Detail Page

- Tab-based navigation
- Overview section (form-ready structure)
- Assets section (upload simulation placeholder)
- Performance section (chart-ready structure)

---

## Job Simulation Engine

- Polling implemented using React Query
- Clean abstraction in service layer
- Status lifecycle simulation
- Automatic polling stop on completion/failure

---

## State Management Strategy

### React Query
Used for:
- Async simulation
- Caching
- Refetching
- Pagination handling
- Optimistic update groundwork

### Zustand
Used for:
- Bulk selection state
- UI-specific shared state

This separation avoids mixing server-state with UI-state.

---

## Performance Considerations

- Debounced search & filters
- Query caching via React Query
- `keepPreviousData` to prevent UI flicker
- Service-layer sorting & filtering
- Minimal re-renders via structured state usage

---

## UX & Edge Case Handling

- Loading states
- Empty states
- Error states
- Disabled buttons
- Controlled pagination boundaries

---

## Deployment

Deployed via Vercel.

To run locally:

~~~bash
npm install
npm run dev
~~~

To build:
~~~bash
npm run build
~~~
