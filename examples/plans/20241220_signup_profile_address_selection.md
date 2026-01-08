# Add Profile Address as Option in Service Location Selection Screen

## Task Overview

When new users register via the website, display the address entered during profile registration as a selectable option on the service location selection screen.
Keep the existing "Enter new address" option.

## Current State Analysis

### Related Components & Pages

1. **Profile Registration Screen**
   - `app/signup/input_customer_info/page.tsx`
   - Address fields: `postal_code`, `prefecture`, `city/town`, `street_name`, `building_name`

2. **Service Location Selection Screen**
   - Service spot: `app/service/spot_menus/[menu_id]/(authenticated)/select_location/page.tsx`
   - Service subscription: `app/service/subscription_menus/[menu_id]/(authenticated)/select_location/page.tsx`
   - Service trial: `app/service/trial_menus/[menu_id]/(authenticated)/select_location/page.tsx`
   - Cleaning service: `app/cleaning/select_location/page.tsx`

3. **Related Hooks**
   - `useSpotCustomerLocations()`: Fetch existing locations list
   - `useProfile()`: Fetch profile information (including address)

### Related Data Structures

**Profile Type** (`types/Profile.ts`)
```typescript
interface Profile {
  postal_code: string
  prefecture: string
  city: string
  town: string
  street_name: string
  building_name: string
  full_address: string
  // ...
}
```

**Location Type** (existing options)
```typescript
interface Location {
  id: string
  name: string
  postalCode: string
  prefecture: string
  cityTown: string
  streetName: string
  buildingName: string
  // ...
}
```

### Current Screen Layout

Current service location selection screen structure:
1. List of existing registered locations (radio button format)
2. "Enter new address" card (expands form on click)

### Requirements Summary

- **Add** profile registration address as a selectable option
- When selected, use that address info to create new CustomerLocation
- **Keep** "Enter new address" option as-is

## Implementation Approach

### Approach A (Recommended): Add Profile Address as Option

1. **UI Modification**
   - Add "Use profile address" card after existing locations list
   - Add `'profile'` as selection state (existing: location ID or `'new'`)

2. **Data Fetching**
   - Use `useProfile()` hook to fetch profile information
   - Hide option if profile address is empty

3. **Selection Handling**
   - When profile address selected, display form for additional required info (household composition, floor plan, etc.)
   - After input completion, call CustomerLocation API to create new service location

### Display Order (Top to Bottom)

1. Existing registered locations
2. **[New] Use profile registration address**
3. Enter new address

## Files to Modify

### Frontend

| File | Changes |
|------|---------|
| `app/service/spot_menus/[menu_id]/(authenticated)/select_location/page.tsx` | Add profile address option |
| `app/service/subscription_menus/[menu_id]/(authenticated)/select_location/page.tsx` | Same as above |
| `app/service/trial_menus/[menu_id]/(authenticated)/select_location/page.tsx` | Same as above |
| `app/cleaning/select_location/page.tsx` | Same as above |

### Common Components (Under Consideration)

| File | Changes |
|------|---------|
| `components/common/ProfileAddressCard.tsx` (new) | Profile address card component |
| `components/common/ProfileLocationForm.tsx` (new) | Additional info form when profile address selected |

## Detailed Implementation

### 1. Add Profile Address Card

```tsx
// State for profile address selection
const [selectedAddress, setSelectedAddress] = useState('')
// 'profile' | 'new' | location.id

// Fetch profile info
const { profile, loading: profileLoading } = useProfile()

// Check if profile has address
const hasProfileAddress = profile?.postal_code && profile?.street_name
```

### 2. UI Addition

```tsx
{/* Profile Address Card */}
{hasProfileAddress && (
  <div
    onClick={() => setSelectedAddress('profile')}
    className={`relative mb-4 block w-full rounded-md bg-white p-5 text-left ${
      selectedAddress === 'profile'
        ? 'border-2 border-primary'
        : 'border-2 border-transparent'
    }`}
  >
    <div className='flex items-center justify-between'>
      <div>
        <p className='mb-1 text-base font-bold'>
          Use profile registration address
        </p>
        <p className='text-sm text-gray-700'>
          〒{profile.postal_code}
          <br />
          {profile.full_address || `${profile.prefecture}${profile.city}${profile.town}${profile.street_name}`}
        </p>
      </div>
    </div>
    {selectedAddress === 'profile' && (
      <span className='badge-primary absolute right-2 top-2'>
        Selected
      </span>
    )}
  </div>
)}

{/* Additional info form when profile address selected */}
{selectedAddress === 'profile' && (
  <ProfileLocationForm
    profile={profile}
    register={register}
    errors={errors}
    watch={watch}
    setValue={setValue}
    // ... required props
  />
)}
```

### 3. Submit Handler Addition

```tsx
const onSubmit = handleSubmit(async (data) => {
  if (selectedAddress === 'profile') {
    // Create new location using profile address
    await handleProfileLocationSubmit(data)
  } else if (selectedAddress !== 'new') {
    await handleExistingLocationSubmit()
  } else {
    await handleNewLocationSubmit(data)
  }
})

const handleProfileLocationSubmit = async (data: LocationFormValues) => {
  // Service area check
  const serviceAreaResponse = await checkServiceArea(profile.postal_code)
  if (!serviceAreaResponse.is_service_area) {
    setShowModal(true)
    return
  }

  // Create location with profile address + additional input info
  const locationData = {
    ...data,
    postalCode: profile.postal_code,
    prefecture: profile.prefecture,
    cityTown: `${profile.city}${profile.town}`,
    streetName: profile.street_name,
    buildingName: profile.building_name || '',
  }

  const result = await saveLocationToAPI(locationData)
  // ...
}
```

## Notes

1. **Profile Address Completeness Check**
   - Only show option when both `postal_code` and `street_name` exist
   - Display appropriate error message if outside service area

2. **Additional Info Input**
   - Info not in profile (household composition, floor plan, phone number, etc.) needs separate form input
   - Consider default value "Home" for location name

3. **Address Format**
   - Profile has `city` + `town` for city/town (separate fields)
   - Location has `cityTown` as combined field → concatenate for use

4. **Sync Across 4 Screens**
   - Same modifications needed for service spot, service subscription, service trial, and cleaning service screens
   - Consider extracting to common component

## Test Cases

1. When profile has address, option is displayed
2. When profile has no address, option is not displayed
3. When profile address selected, additional info form is displayed
4. When profile address is outside service area, appropriate error is displayed
5. New location is created successfully and navigates to next screen
6. "Enter new address" option continues to work