# Example: docs/ Directory Structure Guide

This is a real-world example of how a 500-table Rails application organizes its `docs/` directory using Plan Stack methodology.

---

## Directory Structure

```
docs/
├── plans/                    # Implementation plans
│   ├── completed/            # Archived completed plans
│   └── (active plans here)
│
├── architecture/             # Design & architecture
│   ├── billing/              # Billing system design
│   └── kurakoma/             # Kurakoma service design
│
├── features/                 # Feature documentation
│   ├── house_cleaning/       # House cleaning service
│   ├── maid/                 # Maid service
│   └── kurakoma/             # Kurakoma service
│
├── guides/                   # Developer guides & how-tos
│
└── erd/                      # ERD (auto-generated)
```

---

## Directory Roles

### plans/ - Implementation Plans

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
- `YYYYMMDD_{feature_name}.md`
- Date prefix enables chronological sorting (similar to Rails migrations)
- Example: `20251218_annual_fee_target_service_plan.md`

### architecture/ - Design & Architecture

Store documents about system design, processing flows, and architectural decisions.

**What to include:**
- Processing flow explanations
- Design decisions and rationale
- Technical debt and known issues

**Organize by domain:**
- `architecture/billing/` - Billing & payments
- `architecture/auth/` - Authentication & authorization
- Create subdirectories as needed

### features/ - Feature Documentation

Store specifications, table structures, and API endpoints for each feature.

**What to include:**
- Feature overview and specifications
- Related table/model descriptions
- API endpoint specifications
- Rake task usage instructions

**Organizing by Domain:**

Domains are business-context clusters, not mechanical groupings by table prefix. Related functionality stays within each domain.

Example:
- `maid_staffs` and `maid_staff_salaries` belong in `maid/` domain (not a separate "staff" domain)
- `order_bills` relates to both maid/house_cleaning, but is documented within each service's billing section

**Domain examples:**

| Directory | Description |
|-----------|-------------|
| `features/maid/` | Maid service (orders, subscriptions, staff, plans) |
| `features/house_cleaning/` | House cleaning (orders, partners, vehicles) |
| `features/kurakoma/` | Kurakoma service |
| `features/crm/` | CRM tasks & customer support |

**Large domain structure (maid/ example):**

For larger domains, create subdirectories based on business flow:

```
features/maid/
├── order/                 # Order flow
│   └── (order → assignment → service → report)
│
├── subscription/          # Subscription flow
│   └── (application → hearing → contract → order generation)
│
├── staff/                 # Staff management
│   └── (staff → shift → payroll)
│
├── plan/                  # Plans & menus
│   └── (plan → menu → menu book)
│
├── coupon.md              # Coupons
├── bus_fee.md             # Transportation fees
└── ...
```

Create subdirectories as documentation needs grow.

### guides/ - Developer Guides

Store guides and how-to documents for developers.

**What to include:**
- Authentication & API key setup
- Account creation procedures
- Tool usage guides

---

## Documentation Guidelines

### File Format
- Use Markdown (`.md`)

### Recommended Structure
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
# {Feature Name} Implementation Plan

## Task Overview

## Research Findings
- Related models
- Existing processing flows

## Implementation Approach

## Files to Modify

## Considerations
```

---

## Adding New Directories

When new domains or features emerge, create subdirectories under the appropriate parent.

```bash
# Add a new feature domain
mkdir -p docs/features/new_domain/

# Add a new architecture category
mkdir -p docs/architecture/new_category/
```
