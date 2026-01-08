# Staff Message Feature Implementation Plan

## Overview

Implement two types of staff communication features: "Menu Message" linked to menu master (`ServicePlanMenu`) and "Staff Notes" configurable per service order (`ServiceOrder`). Display these in the staff mobile app to communicate necessary information to service staff.

## Feature Requirements

### Two Types of Messages

| Type | Configuration Location | Input Method | Editable | Purpose |
|------|------------------------|--------------|----------|---------|
| **Menu Message** | Menu Master | Direct input | Not editable in service details | Menu-specific mandatory notes |
| **Staff Notes** | Service Details | Template selection or free input | Editable | Service-specific instructions |

### Example Notes

- Post-ticket collection instructions
- Entry procedures
- Work content instructions
- Checkout report method
- Paper confirmation instructions
- Same-day service confirmation instructions

### Out of Scope

- Customer-facing notes (not implemented this time)
- Multiple messages per menu

### Relationship with Existing Columns

The `service_orders` table has an existing `order_remarks` column. The difference from the new `staff_message` column:

| Column | Japanese Name | Purpose | Target |
|--------|---------------|---------|--------|
| `order_remarks` | Special Notes | General internal notes about the order | Internal operators |
| `staff_message` | Staff Notes | Specific instructions for service staff | Service staff |

**Notes:**
- `order_remarks` is edited in the existing "Special Notes Edit" screen in admin
- `staff_message` is the new column being added, set via template selection or free input
- Both are used for different purposes, so they are managed separately

---

## Data Model Design

### ER Diagram

```
┌──────────────────────────┐
│ staff_message_templates  │  ← New table
│  - id                    │
│  - name                  │
│  - content               │
│  - active                │
└──────────────────────────┘
            │
            │ (Used as selection options for Staff Notes)
            ▼
┌──────────────────────────┐
│    service_plan_menus    │
│  + menu_message (text)   │  ← New column: Menu Message
└──────────────────────────┘
            │
            ▼
┌──────────────────────────┐
│      service_orders      │
│  + staff_message (text)  │  ← New column: Staff Notes
└──────────────────────────┘
```

### 1. Template Master (New Table)

```ruby
# staff_message_templates table
create_table :staff_message_templates do |t|
  t.string :name, null: false, comment: "Template name"
  t.text :content, null: false, comment: "Template content"
  t.boolean :active, default: true, null: false, comment: "Active flag"
  t.timestamps
end

add_index :staff_message_templates, :active
```

### 2. Menu Master Extension (Existing Table)

```ruby
# Add column to service_plan_menus table
add_column :service_plan_menus, :menu_message, :text, comment: "Menu message (fixed message to staff)"
```

### 3. Service Extension (Existing Table)

```ruby
# Add column to service_orders table
add_column :service_orders, :staff_message, :text, comment: "Notes for staff"
```

---

## Implementation Phases

### Phase 1: Database & Models

**Migration files:**
- `db/migrate/YYYYMMDDHHMMSS_create_staff_message_templates.rb`
- `db/migrate/YYYYMMDDHHMMSS_add_menu_message_to_service_plan_menus.rb`
- `db/migrate/YYYYMMDDHHMMSS_add_staff_message_to_service_orders.rb`

**Model files:**
- `app/models/staff_message_template.rb` (new)
- `app/models/service_plan_menu.rb` (no changes, column addition only)
- `app/models/service_order.rb` (no changes, column addition only)

### Phase 2: Template Management (Admin Panel)

**Features:**
- Template CRUD
- Enable/disable toggle
- List display & search

**Files to modify:**
- `app/controllers/admin/staff_message_templates_controller.rb` (new)
- `app/views/admin/staff_message_templates/` (new)
- Add routing

### Phase 3: Menu Master Admin Extension

**Features:**
- Add "Menu Message" input field
- Direct input (text area)

**Files to modify:**
- `app/controllers/admin/service_plan_menus_controller.rb`
- `app/views/admin/service_plan_menus/_form.html.erb`

### Phase 4: Service Details Admin Extension

**Features:**
- Display menu message (read-only)
- Staff notes input
  - Template selection dropdown
  - Free input text area
  - Edit & save

**Files to modify:**
- `app/controllers/admin/service_orders_controller.rb`
- `app/views/admin/service_orders/` related views

### Phase 5: Staff Mobile App API

**Display locations:**
1. Assignment details screen
2. Pre-service confirmation screen
3. Pre-completion confirmation screen

**Modifications:**
- Staff app API endpoints
- Add `menu_message` and `staff_message` to response

---

## Display Logic

### Methods to Add to ServiceOrder

```ruby
# Menu message (read-only)
def menu_message_for_display
  service_plan_menu&.menu_message
end

# Staff notes (editable)
def staff_message_for_display
  staff_message
end
```

### Staff App Display

```
┌─────────────────────────────────┐
│ Menu Message                    │
│ *Menu-specific notes            │
├─────────────────────────────────┤
│ [Content set in menu master]    │
│ (Not editable)                  │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ Staff Notes                     │
├─────────────────────────────────┤
│ [Content set in service details]│
│ (Editable)                      │
└─────────────────────────────────┘
```

---

## Test Cases

### Model Tests
- `StaffMessageTemplate` validation
- `ServicePlanMenu#menu_message` save/retrieve
- `ServiceOrder#staff_message` save/retrieve

### Controller Tests
- Template CRUD operations
- Menu message registration/update
- Staff notes registration/update

### Integration Tests
- Menu message displays on service details screen
- Staff notes can be edited on service details screen
- Both messages returned in staff app API

---

## Open Questions

1. **Migration of existing templates**: How to migrate existing templates from legacy system?
2. **Staff app API specification**: How to add to existing API response?
3. **Permission management**: Who should have permission to edit templates?

---

## Related Files

- `app/models/service_plan_menu.rb` - Menu master model
- `app/models/service_order.rb` - Service order model

---

## Change History

| Date | Changes |
|------|---------|
| 2024-12-18 | Initial version |