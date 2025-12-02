import mongoose from 'mongoose';
import 'dotenv/config';
import Booking from './models/Booking.js';
import Car from './models/Car.js';
import User from './models/User.js';

const checkBookings = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`);
        console.log('Connected to database\n');
        
        const bookings = await Booking.find({}).populate('car').populate('user').populate('owner');
        
        console.log(`📊 Total bookings: ${bookings.length}\n`);
        
        if (bookings.length === 0) {
            console.log('⚠️  No bookings found in database!');
        } else {
            bookings.forEach((booking, index) => {
                console.log(`${index + 1}. Booking ID: ${booking._id}`);
                console.log(`   Car: ${booking.car?.brand} ${booking.car?.model}`);
                console.log(`   Customer: ${booking.user?.name} (${booking.user?.email})`);
                console.log(`   Owner: ${booking.owner?.name} (${booking.owner?.email})`);
                console.log(`   Status: ${booking.status}`);
                console.log(`   Price: $${booking.price}`);
                console.log(`   Dates: ${booking.pickupDate?.toLocaleDateString()} to ${booking.returnDate?.toLocaleDateString()}`);
                console.log('');
            });
        }
        
        // Check users
        const users = await User.find({});
        console.log(`\n👥 Total users: ${users.length}`);
        users.forEach((user, index) => {
            console.log(`${index + 1}. ${user.name} (${user.email}) - Role: ${user.role}`);
        });
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkBookings();
