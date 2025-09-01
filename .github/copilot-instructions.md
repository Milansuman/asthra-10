# Asthra 9 - Technical Fest Management System

## Architecture Overview

**Tech Stack**: Next.js 15 + React 19, tRPC, Drizzle ORM (PostgreSQL), NextAuth.js, TailwindCSS v4, Bun runtime

**Key Application Structure**:
- **App Router**: Uses Next.js 13+ app directory with route groups `(main)`, `(dashboard)`, `payment/`
- **tRPC API**: All backend logic in `server/api/routers/` with type-safe client/server communication
- **Database**: Drizzle ORM with schema in `server/db/schema.ts`, migrations in `drizzle/`
- **Authentication**: NextAuth.js with role-based access control (USER, COORDINATOR, MANAGEMENT, etc.)

## Development Workflow

**Environment Setup**:
```bash
bun install           # Install dependencies
bun run dev          # Start development server
bun run db:push      # Push schema changes to database
bun run db:studio    # Open Drizzle Studio for database management
```

**Key Commands**:
- `bun run check` - Biome linting and formatting (replaces ESLint/Prettier)
- `bun run start:email` - Run app with email dev server concurrently
- Database commands: `db:generate`, `db:migrate`, `db:push` for schema management

## Project-Specific Patterns

**tRPC Router Organization**:
- Routers are feature-based: `userRouter`, `eventRouter`, `asthraRouter`, etc.
- Each router exports procedures with role-based middleware
- Server-side API calls use `api` from `trpc/server.ts`, client-side use `api` from `trpc/react.tsx`

**tRPC Usage Examples**:

*Client-side queries/mutations:*
```tsx
// Simple query with loading state
const { data, isLoading } = api.event.getAll.useQuery()

// Query with input parameters and conditional enabling
const { data: isRegistered } = api.user.isRegisteredThisEvent.useQuery({
  eventId: event.id
}, {
  enabled: status === "authenticated" && valid,
})

// Mutations with error handling and callbacks
const { mutateAsync, isPending } = api.event.registerEvent.useMutation({
  onError: (error) => {
    toast.error(error.data?.code, {
      description: error.message,
    })
  },
  onSuccess: () => toast("Registration successful")
})

// Mutations with optimistic updates
const { mutate: editRole } = api.user.editUserRole.useMutation({
  onSuccess: () => {
    queryClient.invalidateQueries(['user', 'getUserList'])
  }
})
```

*Server-side usage in pages:*
```tsx
// Server components (app directory)
const event = await api.event.getSpecificCached({ id })
const user = await api.user.getUserForVerification({ id })

// With React cache for performance
const getEventData = reactCache(async (id: string) => {
  return await api.event.getSpecificCached({ id })
})
```

**Role-Based Procedures** (in `server/api/trpc.ts`):
```typescript
protectedProcedure        // Authenticated users only
validUserOnlyProcedure    // Users with complete profile
coordinatorProcedure      // COORDINATOR+ roles
managementProcedure       // MANAGEMENT+ roles
frontDeskProcedure        // DESK+ roles
```

**Database Schema Conventions**:
- All tables use `uuid` primary keys
- Enums defined with `pgEnum` for roles, departments, years, etc.
- Relations defined in separate `relations()` blocks
- User roles: `USER`, `STUDENT_COORDINATOR`, `FACULTY_COORDINATOR`, `MANAGEMENT`, `ADMIN`, `DESK`

**Route Group Structure**:
- `(main)/` - Public pages with Spline 3D background and main navigation
- `(dashboard)/` - Admin interface with role-based access and dock navigation
- `payment/` - Payment flow with different layout
- API routes in `api/trpc/[trpc]/route.ts` for tRPC handler

**Component Architecture**:
- `components/madeup/` - Custom project components (Dock, event forms, etc.)
- `components/ui/` - Shadcn UI components
- `components/magicui/` - Magic UI animation components
- Use `@/` path alias for all imports

**Key Business Logic** (in `logic/` directory):
- `ASTHRA` object defines the main event with special handling
- Department/role/year enums centralized in `logic/index.ts`
- Payment integration with Razorpay in `logic/payment.ts`
- Email templates and sending logic separated

**Styling Conventions**:
- TailwindCSS v4 with custom cursor variants and  effect classes
- Dark theme by default with custom CSS variables
- `ambit` font class for branding
- Custom background patterns and 3D Spline integration

**Authentication Flow**:
- Google OAuth and email providers configured
- Custom Drizzle adapter for NextAuth.js
- Session extended with full user object and role information
- Profile completion middleware for dashboard access

## Integration Points

**External Services**:
- **Razorpay**: Payment processing with order creation and signature verification
- **Email**: Nodemailer with template system in `components/mail/`
- **S3/CloudFlare**: File uploads (configured in env)
- **Spline**: 3D backgrounds (fallback to static images on mobile)

**Key Data Flows**:
- User registration → Profile completion → Event registration → Payment → Email confirmation
- Event creation (coordinators) → Approval (management) → Public listing
- QR scanning for attendance tracking via `@yudiel/react-qr-scanner`

**Environment Variables**: Managed via `@t3-oss/env-nextjs` in `env.js` with strict validation

**Deployment**: Configured for CloudFlare with `@opennextjs/cloudflare` - use `bun run deploy`
