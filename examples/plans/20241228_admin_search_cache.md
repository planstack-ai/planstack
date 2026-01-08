# Admin Panel Search Condition Redis Cache Feature

## Task Overview

Save search conditions entered by users on admin panel list screens to Redis, and automatically restore search conditions when revisiting the screen.

**Example URL**: `admin/service_assignments?staff_id=&staff_name=&units%5B%5D=16&statuses%5B%5D=&service_start_at=2025-12-28...`

## Current State Analysis

### 1. Existing Search Implementation Pattern

Admin panel lists are implemented with the following common pattern:

```ruby
# Controller
def index
  @records = Model.search_by_params(search_params)
    .order(...)
    .page(page).per(per_page)
end

def search_params
  params.permit(:field1, :field2, array_field: [])
end
```

### 2. Redis/Cache Configuration (Existing)

- **production/development**: `Rails.cache` → Redis cache store
- **namespace**: `app_#{Rails.env}`
- **Existing usage example**: `ServiceOrderCart` - Session ID + Redis cache combination

### 3. Authentication Mechanism

- Authentication in `Admin::AdminController`
- Get logged-in user via `current_admin_user`
- Sessions use encrypted cookie method

## Implementation Approach

### Architecture

```
┌─────────────────┐     ┌──────────────────────┐     ┌───────────┐
│  Admin Panel UI │────▶│  Admin Controller    │────▶│  Redis    │
│  (Search Form)  │     │  + SearchCacheable   │     │  Cache    │
└─────────────────┘     └──────────────────────┘     └───────────┘
         │                        │
         │  On search             │  Save: Key = admin_search:{user_id}:{controller}
         │  ─────────────▶       │  Value = { parameter Hash }
         │                        │  TTL = 24 hours
         │  On revisit            │
         │  (no params)           │  Restore and redirect
         │  ◀─────────────        │
```

### Key Design

```
admin_search_cache:{admin_user_id}:{controller_name}
```

Example: `admin_search_cache:123:service_assignments`

### Operation Flow

1. **On search execution** (with parameters)
   - Execute search
   - Save search parameters to Redis (TTL: 24 hours)

2. **On screen revisit** (no parameters)
   - Retrieve saved parameters from Redis
   - If parameters exist, redirect to URL with those parameters
   - If no parameters, display default (normal)

3. **On search clear**
   - Explicit clear button, or submit with empty parameters
   - Delete Redis cache

## Files to Modify

### New Files

1. `app/controllers/concerns/admin/search_cacheable.rb`
   - Implement search condition save/restore logic as Concern

### Modified Files

2. `app/controllers/admin/admin_controller.rb`
   - Include `SearchCacheable` concern

3. Each admin panel controller (opt-in as needed)
   - Define target parameters with `cache_search_params` class method

### Target Controllers (Phased Introduction)

First verify with:
- `Admin::ServiceAssignmentsController`
- `Admin::ServiceOrdersController`
- `Admin::CustomersController`
- `Admin::StaffsController`

## Implementation Details

### SearchCacheable Concern

```ruby
# app/controllers/concerns/admin/search_cacheable.rb
module Admin
  module SearchCacheable
    extend ActiveSupport::Concern

    CACHE_TTL = 24.hours
    CACHE_KEY_PREFIX = "admin_search_cache"

    included do
      before_action :restore_search_params, only: [:index]
      after_action :save_search_params, only: [:index]
    end

    class_methods do
      # Define cache target parameters in controller
      # Example: cache_search_params :staff_id, :staff_name, statuses: []
      def cache_search_params(*keys)
        @cached_search_param_keys = keys
      end

      def cached_search_param_keys
        @cached_search_param_keys || []
      end
    end

    private

    def search_cache_key
      "#{CACHE_KEY_PREFIX}:#{current_admin_user.id}:#{controller_name}"
    end

    def restore_search_params
      return unless self.class.cached_search_param_keys.any?
      return if has_search_params? # Skip if parameters already exist
      return if request.format.turbo_stream? # Skip Turbo Stream requests

      cached = Rails.cache.read(search_cache_key)
      return unless cached.present?

      # Redirect with cached parameters
      redirect_to url_for(cached.merge(only_path: true))
    end

    def save_search_params
      return unless self.class.cached_search_param_keys.any?
      return unless has_search_params?

      # Extract and save search parameters
      search_params = extract_cacheable_params
      if search_params.values.any?(&:present?)
        Rails.cache.write(search_cache_key, search_params, expires_in: CACHE_TTL)
      else
        Rails.cache.delete(search_cache_key)
      end
    end

    def has_search_params?
      # Check if any search parameter exists
      self.class.cached_search_param_keys.any? do |key|
        param_key = key.is_a?(Hash) ? key.keys.first : key
        params[param_key].present?
      end
    end

    def extract_cacheable_params
      permitted = params.permit(*self.class.cached_search_param_keys)
      permitted.to_h.compact_blank
    end
  end
end
```

### Controller Usage Example

```ruby
# app/controllers/admin/service_assignments_controller.rb
class Admin::ServiceAssignmentsController < Admin::AdminController
  include Admin::SearchCacheable

  cache_search_params :staff_id, :staff_name, :service_start_at, :service_end_at,
                      statuses: [], units: [], missing_start_report: [],
                      overdue_start_report: [], missing_end_report: [], include_canceled: []

  def index
    # Existing process (no changes)
  end
end
```

## Notes

### 1. Turbo Stream Support
- Don't redirect on Turbo Stream requests (prevent infinite loop)
- Check with `request.format.turbo_stream?`

### 2. Browser Back Support
- Cache valid for 24 hours
- Browser back button uses normal browser cache

### 3. Security
- Include user ID in cache key, preventing access to other users' data
- Only save search parameters (no sensitive data)

### 4. Phased Introduction
- Only controllers that define `cache_search_params` are affected
- Without definition, works as before

### 5. Search Clear Feature (Optional)
- Add "Clear Search Conditions" button as needed
- Submit empty parameters on clear to delete cache

## Test Approach

1. **Unit tests**: `SearchCacheable` concern tests
2. **Integration tests**: E2E tests with `ServiceAssignmentsController`
   - With parameters → cache saved
   - Visit without parameters → redirect
   - Different user → cache isolated

## Future Enhancements

- Search history feature (save multiple search conditions)
- Favorite registration for frequently used search conditions