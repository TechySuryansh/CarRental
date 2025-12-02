import mongoose from 'mongoose';
import 'dotenv/config';
import Car from './models/Car.js';
import User from './models/User.js';
import Booking from './models/Booking.js';

const transferOwnership = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`);
        console.log('Connected to database\n');
        
        // Find Suryansh
        const suryansh = await User.findOne({ email: 'suryansh@gmail.com' });
        if (!suryansh) {
            console.log('❌ Suryansh not found');
            process.exit(1);
        }
        
        console.log(`Found user: ${suryansh.name} (${suryansh.email})`);
        
        // Make Suryansh an owner
        suryansh.role = 'owner';
        await suryansh.save();
        console.log('✅ Changed role to owner');
        
        // Transfer all cars to Suryansh
        const result = await Car.updateMany(
            {},
            { $set: { owner: suryansh._id } }
        );
        console.log(`✅ Transferred ${result.modifiedCount} cars to Suryansh`);
        
        // Update booking owner
        const bookingResult = await Booking.updateMany(
            {},
            { $set: { owner: suryansh._id } }
        );
        console.log(`✅ Updated ${bookingResult.modifiedCount} bookings`);
        
        console.log('\n🎉 Done! Now login as suryansh@gmail.com and go to /owner/manage-bookings');
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

transferOwnership();
