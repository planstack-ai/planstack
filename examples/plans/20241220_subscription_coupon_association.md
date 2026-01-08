# Subscription Coupon Association and Order Creation Replication

## Overview

Link coupons (`Coupon`) to subscriptions (`Subscription`) via a join table, and automatically apply coupons when service orders (`ServiceOrder`) are created from subscriptions.

---

## Current State Analysis

### Current Data Structure

| Model | Coupon Related | Issue |
|-------|----------------|-------|
| Subscription | `coupon_code` (String) | Simple string storage, no FK relationship |
| Coupon | None | No reference to Subscription |
| ServiceOrder | ServiceOrderUsedCoupon join | Proper FK relationship exists |

### Reference: ServiceOrder and Coupon Relationship

```ruby
# ServiceOrderUsedCoupon (join table)
belongs_to :coupon
belongs_to :service_order

# ServiceOrder
has_many :service_order_used_coupons
has_many :coupons, through: :service_order_used_coupons
```

### Current Flow

```
Subscription (coupon_code: "ABC123" - string only)
    ↓
CreateSubscriptionOrderService
    ↓
ServiceOrder (no coupon applied)
```

### Target Flow

```
Subscription
    ↓ has_many :subscription_coupons (join table)
    ↓ has_many :coupons, through: :subscription_coupons
Coupon
    ↓
CreateSubscriptionOrderService
    ↓
ServiceOrder + ServiceOrderUsedCoupon (coupon auto-applied)
```

---

## Implementation Approach

### Phase 1: Add Data Structure

#### 1-1. Create Join Table `subscription_coupons`

Create with similar structure to `ServiceOrderUsedCoupon`.

```ruby
# db/migrate/YYYYMMDDHHMMSS_create_subscription_coupons.rb
class CreateSubscriptionCoupons < ActiveRecord::Migration[7.0]
  def change
    create_table :subscription_coupons do |t|
      t.references :subscription, null: false, foreign_key: true
      t.references :coupon, null: false, foreign_key: true
      t.datetime :deleted_at

      t.timestamps
    end

    add_index :subscription_coupons,
              [:subscription_id, :coupon_id],
              unique: true,
              where: "deleted_at IS NULL",
              name: "idx_subscription_coupon_unique"
  end
end
```

#### 1-2. Create Model `SubscriptionCoupon`

Similar structure to `ServiceOrderUsedCoupon`.

```ruby
# app/models/subscription_coupon.rb
class SubscriptionCoupon < ApplicationRecord
  include Discard::Model
  self.discard_column = :deleted_at

  belongs_to :subscription
  belongs_to :coupon
end
```

#### 1-3. Add Associations to Existing Models

**Subscription**

```ruby
# Add
has_many :subscription_coupons, dependent: :destroy
has_many :coupons, through: :subscription_coupons
```

**Coupon**

```ruby
# Add
has_many :subscription_coupons, dependent: :destroy
has_many :subscriptions, through: :subscription_coupons
```

### Phase 2: Apply Coupons on Order Creation

#### 2-1. Modify `CreateSubscriptionOrderService`

After order creation, create coupons linked to subscription as `ServiceOrderUsedCoupon`.

```ruby
# In create_order_and_assignments! method, apply coupons after order creation
def create_order_and_assignments!(day, subscription_frequency)
  service_order = build_order_from_subscription(day, subscription_frequency)

  CreateOrderService.new(
    service_order,
    @subscription.customer_location,
    nil
  ).call(perform_auto_matching: false, without_payment: true)

  # Apply coupons linked to subscription
  apply_subscription_coupons!(service_order)

  # ... existing staff assignment process
end

private

def apply_subscription_coupons!(service_order)
  @subscription.coupons.each do |coupon|
    # Check coupon validity period
    next unless coupon_valid_for_order?(coupon, service_order)

    # Skip if same coupon already applied (duplicate check)
    next if ServiceOrderUsedCoupon.exists?(service_order: service_order, coupon: coupon)

    ServiceOrderUsedCoupon.create!(
      service_order: service_order,
      coupon: coupon
    )
  end
end

def coupon_valid_for_order?(coupon, service_order)
  service_date = service_order.service_date

  # Check service period validity
  return false if coupon.service_start_date.present? && service_date < coupon.service_start_date
  return false if coupon.service_end_date.present? && service_date > coupon.service_end_date

  true
end
```

---

## Files to Modify

### New Files

| File | Description |
|------|-------------|
| `db/migrate/YYYYMMDDHHMMSS_create_subscription_coupons.rb` | Join table migration |
| `app/models/subscription_coupon.rb` | Join table model |
| `spec/models/subscription_coupon_spec.rb` | Model tests |
| `spec/factories/subscription_coupons.rb` | Factory |

### Modified Files

| File | Changes |
|------|---------|
| `app/models/coupon.rb` | Add `has_many :subscription_coupons` / `has_many :subscriptions, through:` |
| `app/models/subscription.rb` | Add `has_many :subscription_coupons` / `has_many :coupons, through:` |
| `app/services/create_subscription_order_service.rb` | Add coupon auto-apply logic |

### Tests

| File | Description |
|------|-------------|
| `spec/models/coupon_spec.rb` | Add association tests |
| `spec/models/subscription_spec.rb` | Add association tests |
| `spec/services/create_subscription_order_service_spec.rb` | Add coupon application tests |

---

## Discussion Points (Confirm Before Implementation)

### 1. Handling of Existing `coupon_code` Column

The current `coupon_code` (String) column can be ignored.
- Not used in new implementation
- Deletion to be considered separately (can be removed later if no data migration needed)

### 2. Behavior When Coupon Expires

Keep the association, skip application during order creation via validity check.
→ Check `service_start_date` / `service_end_date` in `coupon_valid_for_order?` method

### 3. Coupon Inheritance on Subscription Renewal

Copy coupons to new subscription in `Subscription::RenewalService`?
→ Needs confirmation

### 4. Can Multiple Coupons Be Linked to One Subscription?

Designed as `has_many`, so multiple coupon linking is possible.
However, verify consistency with existing `DiscountCouponService` logic (e.g., only one discount rate coupon allowed).

---

## Implementation Order

1. Create migration (`subscription_coupons` table)
2. Create `SubscriptionCoupon` model
3. Add association to `Coupon`
4. Add association to `Subscription`
5. Modify `CreateSubscriptionOrderService`
6. Create factory
7. Create and run tests
8. Format with linter

---

## Created

2025-12-20