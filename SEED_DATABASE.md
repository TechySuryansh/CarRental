# Seed Database with Dummy Cars

## Overview
This script adds 12 dummy cars to your database so customers can immediately browse and book cars.

## Dummy Cars Included

1. **Toyota Camry** - $45/day - New York (Sedan, Petrol, 5 seats)
2. **Honda CR-V** - $65/day - Los Angeles (SUV, Hybrid, 7 seats)
3. **Tesla Model 3** - $85/day - San Francisco (Sedan, Electric, 5 seats)
4. **BMW X5** - $95/day - Chicago (SUV, Diesel, 5 seats)
5. **Ford Mustang** - $75/day - Miami (Coupe, Petrol, 4 seats)
6. **Mercedes-Benz C-Class** - $80/day - Boston (Sedan, Petrol, 5 seats)
7. **Jeep Wrangler** - $70/day - Denver (SUV, Petrol, 5 seats)
8. **Audi A4** - $72/day - Seattle (Sedan, Petrol, 5 seats)
9. **Chevrolet Tahoe** - $90/day - Dallas (SUV, Petrol, 8 seats)
10. **Hyundai Elantra** - $40/day - Phoenix (Sedan, Petrol, 5 seats)
11. **Volkswagen Tiguan** - $60/day - Portland (SUV, Diesel, 5 seats)
12. **Nissan Altima** - $42/day - Atlanta (Sedan, Petrol, 5 seats)

## How to Run

### Step 1: Make sure you have a user account
The script needs at least one user in the database to assign as the owner of these cars.

**If you don't have a user yet:**
1. Go to your app: http://localhost:5173
2. Click "Login"
3. Register a new account
4. The script will automatically make this user an owner

### Step 2: Run the seed script

```bash
cd server
npm run seed
```

### Expected Output:
```
MongoDB Connected for seeding
Made user an owner: your@email.com
✅ Successfully seeded database with dummy cars!
📊 Total cars added: 12
👤 Owner: Your Name (your@email.com)

Cars added:
1. Toyota Camry - $45/day - New York
2. Honda CR-V - $65/day - Los Angeles
3. Tesla Model 3 - $85/day - San Francisco
...
🎉 Database seeding completed!
```

## What Happens

1. **Connects to MongoDB** using your `.env` configuration
2. **Finds or creates an owner** - Uses existing owner or promotes a user
3. **Adds 12 cars** to the database with realistic data
4. **All cars are available** for immediate booking

## Features of Dummy Cars

✅ **Realistic Data**
- Real car brands and models
- Varied categories (Sedan, SUV, Coupe)
- Different fuel types (Petrol, Diesel, Electric, Hybrid)
- Various locations across the US
- Competitive pricing ($40-$95/day)

✅ **High-Quality Images**
- Professional car photos from Unsplash
- Properly formatted and optimized

✅ **Complete Information**
- Detailed descriptions
- Seating capacity
- Transmission type
- All required fields filled

✅ **Ready to Book**
- All cars marked as available
- Can be booked immediately
- Show up in search and filters

## After Seeding

### Test the Flow:

1. **Homepage**
   - Visit http://localhost:5173
   - See featured cars (first 6)

2. **Browse All Cars**
   - Click "Explore All Cars"
   - See all 12 cars
   - Try searching by brand, location, etc.

3. **View Car Details**
   - Click on any car
   - See full details
   - Select dates

4. **Book a Car**
   - Choose pickup/return dates
   - Click "Book Now"
   - Booking created!

5. **View Bookings**
   - Go to "My Bookings"
   - See your booking

### As Owner:

1. **View Dashboard**
   - Go to `/owner`
   - See statistics

2. **Manage Cars**
   - Go to "Manage Cars"
   - See all 12 dummy cars
   - Toggle availability
   - Delete if needed

3. **Manage Bookings**
   - Go to "Manage Bookings"
   - See customer bookings
   - Approve/reject requests

## Customization

### To Add More Cars:
Edit `server/seed.js` and add more objects to the `dummyCars` array:

```javascript
{
    brand: "Your Brand",
    model: "Your Model",
    year: 2024,
    category: "Sedan",
    seating_capacity: 5,
    fuel_type: "Petrol",
    pricePerDay: 50,
    transmission: "Automatic",
    image: "https://your-image-url.com",
    location: "Your City",
    description: "Your description",
    isAvailable: true
}
```

### To Clear Existing Cars:
Uncomment these lines in `seed.js`:
```javascript
await Car.deleteMany({});
console.log('Cleared existing cars');
```

### To Use Different Images:
Replace the Unsplash URLs with:
- Your own ImageKit URLs
- Other image hosting services
- Local images (after uploading)

## Troubleshooting

### Error: "No users found in database"
**Solution**: Register a user through the app first, then run the seed script.

### Error: "MongoDB connection error"
**Solution**: Check your `MONGODB_URI` in `server/.env`

### Cars not showing up
**Solution**: 
1. Refresh your browser
2. Check if backend is running
3. Check browser console for errors

### Want to re-seed
**Solution**: 
1. Uncomment the `deleteMany` line to clear old data
2. Run `npm run seed` again

## Benefits

✅ **Instant Demo** - Show off your app immediately
✅ **Testing** - Test booking flow without manual data entry
✅ **Development** - Develop features with realistic data
✅ **Presentation** - Impress clients/users with populated app

## Notes

- Cars are assigned to the first owner found in database
- All cars are marked as available by default
- Images are from Unsplash (free to use)
- You can edit/delete these cars through the owner dashboard
- Script is safe to run multiple times (adds new cars each time)

## Next Steps

After seeding:
1. ✅ Browse cars as a customer
2. ✅ Book a car
3. ✅ View bookings
4. ✅ Manage cars as owner
5. ✅ Add your own real cars

Enjoy your populated car rental app! 🚗✨
