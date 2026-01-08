# Directory Structure

Recommended directory structure for Plan Stack.

## Overview

```
your-project/
├── docs/
│   ├── plans/                # Implementation plans
│   │   ├── completed/        # Archived completed plans
│   │   └── (active plans here)
│   │
│   ├── architecture/         # Design & architecture docs
│   │   ├── auth/
│   │   ├── billing/
│   │   └── ...
│   │
│   ├── features/             # Feature documentation
│   │   ├── users/
│   │   ├── orders/
│   │   └── ...
│   │
│   ├── guides/               # Developer guides & how-tos
│   │
│   └── templates/            # Templates for plans and reviews
│
├── src/                      # Source code
└── ...
```

---

## Directory Roles

### `plans/` - Implementation Plans

Store implementation plans created before making changes to the codebase.

| Location | Purpose |
|----------|---------|
| `plans/` (root) | Active/in-progress plans |
| `plans/completed/` | Archived completed plans |

**Workflow:**
1. Create plan file in `plans/` before implementation
2. Get human approval before starting work
3. Implement following the approved plan
4. Move to `plans/completed/` after completion

**File Naming Convention:**

```
YYYYMMDD_feature_name.md
```

- Date prefix enables chronological sorting (similar to Rails migrations)
- Use `snake_case` for feature names
- Keep names concise but descriptive (2-4 words)

**Good examples:**
- `20250115_user_authentication.md`
- `20250120_payment_integration.md`
- `20250201_api_rate_limiting.md`
- `20250215_order_csv_export.md`

**Avoid:**
- Too vague: `20250115_fix.md`, `20250115_update.md`
- Too long: `20250115_add_user_authentication_with_oauth_and_jwt.md`
- No context: `20250115_api.md`

### `architecture/` - Design & Architecture

Store documents about system design, processing flows, and architectural decisions.

**What to include:**
- Processing flow explanations
- Design decisions and rationale
- Technical debt and known issues

**Organize by domain:**
- `architecture/auth/` - Authentication & authorization
- `architecture/billing/` - Billing & payments
- `architecture/api/` - API design
- Create subdirectories as needed

### `features/` - Feature Documentation

Store specifications, table structures, and API endpoints for each feature.

**What to include:**
- Feature overview and specifications
- Related table/model descriptions
- API endpoint specifications
- CLI/task usage instructions

**Organizing by Domain:**

Domains are business-context clusters, not mechanical groupings by table prefix. Related functionality stays within each domain.

Example structure:
```
features/
├── users/              # User management
│   ├── registration.md
│   ├── authentication.md
│   └── profiles.md
│
├── orders/             # Order management
│   ├── checkout.md
│   ├── fulfillment.md
│   └── refunds.md
│
├── subscriptions/      # Subscription management
│   ├── plans.md
│   ├── billing.md
│   └── cancellation.md
│
└── ...
```

**Larger Domains:**

For larger domains, create subdirectories based on business flow:

```
features/orders/
├── checkout/           # Checkout flow
│   └── (cart → payment → confirmation)
│
├── fulfillment/        # Fulfillment flow
│   └── (picking → shipping → delivery)
│
├── returns/            # Returns flow
│   └── (request → approval → refund)
│
└── ...
```

Create subdirectories as documentation needs grow.

### `guides/` - Developer Guides

Store guides and how-to documents for developers.

**What to include:**
- Environment setup instructions
- Authentication/API key configuration
- Tool usage guides
- Onboarding documentation

### `templates/` - Templates

Store templates for plans and reviews.

- `plan-template.md` - Template for creating new plans
- `review-template.md` - Template for conducting reviews

---

## Documentation Guidelines

### File Format
- Use Markdown (`.md`)

### Recommended Structure for Feature Docs
```markdown
# Title

## Overview
Brief description of what this document covers.

## Details
Main content.

## Related Files
References to relevant code files.
```

### Implementation Plan Structure
```markdown
# Feature Name - Implementation Plan

## Task Overview
What needs to be done and why.

## Research Findings
- Related models/components
- Existing processing flows
- Dependencies

## Implementation Approach
Chosen approach and rationale.

## Files to Modify
List of files that will be changed.

## Considerations
- Security implications
- Performance impact
- Backward compatibility
```

---

## Promotion Criteria

Most plans stay in `completed/`. Promote only the vital few.

| Destination | Criteria |
|-------------|----------|
| `architecture/` | Affects 3+ features or defines system boundaries |
| `features/` | Referenced by multiple future plans |

**Example:**
- A plan for "add user logout" → stays in `completed/`
- A plan that established the authentication architecture → promote to `architecture/auth/`

Don't over-organize. Promotion is optional, not required.

---

## Adding New Directories

When new domains or features emerge, create subdirectories under the appropriate parent.

```bash
# Add a new feature domain
mkdir -p docs/features/new_domain/

# Add a new architecture category
mkdir -p docs/architecture/new_category/

# Structure is flexible—create what you need
```

---

## Related Links

- [Getting Started](getting-started.md)
- [Templates](templates/)
