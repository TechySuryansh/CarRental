# Testing Checklist

## Backend-Frontend Integration Testing

### ✅ User Authentication
- [ ] Register new user
- [ ] Login with credentials
- [ ] Token stored in localStorage
- [ ] Logout clears token
- [ ] Protected routes require authentication

### ✅ Public Pages
- [ ] Homepage loads
- [ ] Featured cars display (max 6)
- [ ] Navigate to Cars page
- [ ] Search cars by brand/model/location
- [ ] Click on car card navigates to details

### ✅ Car Details & Booking
- [ ] Car details page loads with correct data
- [ ] All car information displays correctly
- [ ] Date picker works (pickup/return)
- [ ] Return date cannot be before pickup date
- [ ] Booking requires login
- [ ] Booking creation succeeds
- [ ] Redirects to My Bookings after booking

### ✅ My Bookings Page
- [ ] Displays all user bookings
- [ ] Shows correct car details
- [ ] Displays booking status
- [ ] Shows rental period
- [ ] Shows total price
- [ ] Empty state when no bookings

### ✅ Owner Dashboard
- [ ] Dashboard loads statistics
- [ ] Shows total cars count
- [ ] Shows total bookings count
- [ ] Shows pending bookings count
- [ ] Shows monthly revenue
- [ ] Displays recent bookings table

### ✅ Add Car (Owner)
- [ ] Form loads correctly
- [ ] Image upload works
- [ ] Image preview displays
- [ ] All fields validate
- [ ] Car creation succeeds
- [ ] Redirects to Manage Cars
- [ ] New car appears in list

### ✅ Manage Cars (Owner)
- [ ] Lists all owner's cars
- [ ] Toggle availability works
- [ ] Availability status updates in UI
- [ ] Delete car works
- [ ] Confirmation dialog appears
- [ ] Car removed from list
- [ ] Empty state when no cars

### ✅ Manage Bookings (Owner)
- [ ] Lists all bookings for owner's cars
- [ ] Filter by status works (all/pending/confirmed/completed/cancelled)
- [ ] Approve booking changes status to confirmed
- [ ] Reject booking changes status to cancelled
- [ ] Mark complete changes status to completed
- [ ] Status updates reflect immediately
- [ ] Shows customer information
- [ ] Shows car information
- [ ] Shows rental dates and price

### ✅ API Integration
- [ ] All API calls use centralized service
- [ ] Token automatically included in protected requests
- [ ] Error handling works
- [ ] Loading states display
- [ ] Success/error messages show

### ✅ Data Consistency
- [ ] Cars added by owner appear in public listings
- [ ] Unavailable cars don't show in public listings
- [ ] Bookings link correct user, car, and owner
- [ ] Booking dates prevent double-booking
- [ ] Price calculated correctly based on days

### ✅ Edge Cases
- [ ] Accessing protected routes without login redirects
- [ ] Invalid car ID shows error
- [ ] Booking unavailable car shows error
- [ ] Overlapping booking dates prevented
- [ ] Image upload size/type validation
- [ ] Form validation on all inputs

## Performance Checks
- [ ] Pages load within 2 seconds
- [ ] Images load properly
- [ ] No console errors
- [ ] No memory leaks
- [ ] Smooth navigation between pages

## Browser Compatibility
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## Mobile Responsiveness
- [ ] Homepage responsive
- [ ] Cars page responsive
- [ ] Car details responsive
- [ ] Booking form responsive
- [ ] Owner dashboard responsive
- [ ] Navigation menu works on mobile

## Security
- [ ] JWT tokens expire appropriately
- [ ] Protected routes require valid token
- [ ] Users can only see their own bookings
- [ ] Owners can only manage their own cars
- [ ] Owners can only manage bookings for their cars
- [ ] No sensitive data in localStorage except token

## Notes
- Mark items as complete with [x]
- Document any issues found
- Test with multiple users/owners
- Test with various car types and bookings
