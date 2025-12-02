import mongoose from 'mongoose';
import 'dotenv/config';
import User from './models/User.js';
import Car from './models/Car.js';
import Booking from './models/Booking.js';
import bcrypt from 'bcrypt';

const createTestOwner = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`);
        console.log('Connected to database\n');
        
        // Check if test owner exists
        let testOwner = await User.findOne({ email: 'testowner@test.com' });
        
        if (testOwner) {
            console.log('Test owner already exists');
        } else {
            // Create test owner
            const hashedPassword = await bcrypt.hash('test123', 10);
            testOwner = await User.create({
                name: 'Test Owner',
                email: 'testowner@test.com',
                password: hashedPassword,
                role: 'owner'
            });
            console.log('✅ Created test owner account');
        }
        
        console.log('\n📧 Login Credentials:');
        console.log('   Email: testowner@test.com');
        console.log('   Password: test123');
        console.log('   Role: owner');
        
        // Transfer all cars to test owner
        const carResult = await Car.updateMany({}, { $set: { owner: testOwner._id } });
        console.log(`\n✅ Transferred ${carResult.modifiedCount} cars to test owner`);
        
        // Update all bookings
        const bookingResult = await Booking.updateMany({}, { $set: { owner: testOwner._id } });
        console.log(`✅ Updated ${bookingResult.modifiedCount} bookings`);
        
        console.log('\n🎉 Ready! Login with testowner@test.com / test123');
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createTestOwner();
