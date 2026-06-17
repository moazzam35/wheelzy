# TODO - Full-stack production-ready conversion (non-destructive)

## Plan
1. Add dependencies + Prisma + Auth.js + Stripe + Cloudinary config scaffolding.
2. Create requested folder structure (new files only; no overwrites to `app/(user)/**`).
3. Add `.env.example` and document required env vars.
4. Add Prisma schema + generate + migrations (PostgreSQL).
5. Add Prisma client singleton.
6. Implement Auth.js (NextAuth) with JWT session + bcrypt password hashing + role-based authorization.
7. Add middleware/guards to protect user/admin routes and API endpoints.
8. Implement API routes (App Router) for:
   - cars CRUD + search/filter/pagination
   - favorites
   - orders
   - stripe checkout + webhook verification
   - test drive bookings (approve/reject)
   - messaging (threads, admin replies)
   - admin endpoints (manage users/cars/orders/bookings)
9. Add Cloudinary upload service and optional image field updates.
10. Non-destructively connect backend to existing UI:
   - add hooks/helpers for fetching data
   - minimal wiring where existing pages already exist
11. Run build/test commands.

## Progress Tracking
- [ ] Step 1: Dependencies + tooling scaffolding
- [ ] Step 2: Create folder structure
- [ ] Step 3: Create `.env.example`
- [ ] Step 4: Prisma schema
- [ ] Step 5: Prisma client singleton
- [ ] Step 6: Auth.js setup + password hashing
- [ ] Step 7: Middleware/guards
- [ ] Step 8: API routes implemented
- [ ] Step 9: Cloudinary service
- [ ] Step 10: Non-destructive UI integration
- [ ] Step 11: Build/test

