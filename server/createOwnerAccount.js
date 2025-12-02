import mongoose from 'mongoose';
import 'dotenv/config';
import User from './models/User.js';
import Car from './models/Car.js';
import Booking from './models/Booking.js';
import bcrypt from 'bcrypt';

const createOwnerAccount = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`);
        console.log('Connected to database\n');
        
        // Create dedicated owner account
        const ownerEmail = 'owner@carrental.com';
        let owner = await User.findOne({ email: ownerEmail });
        
        if (owner) {
            console.log('Owner account already exists');
            // Make sure it has owner role
            owner.role = 'owner';
            await owner.save();
        } else {
            const hashedPassword = await bcrypt.hash('owner123', 10);
            owner = await User.create({
                name: 'Car Rental Owner',
                email: ownerEmail,
                password: hashedPassword,
                role: 'owner'
            });
            console.log('✅ Created new owner account');
        }
        
        console.log('\n🔐 OWNER LOGIN CREDENTIALS:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('   Email:    owner@carrental.com');
        console.log('   Password: owner123');
        console.log('   Role:     Owner');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        // Transfer all cars to this owner
        const carResult = await Car.updateMany({}, { $set: { owner: owner._id } });
        console.log(`✅ Assigned ${carResult.modifiedCount} cars to owner`);
        
        // Update all bookings to this owner
        const bookingResult = await Booking.updateMany({}, { $set: { owner: owner._id } });
        console.log(`✅ Updated ${bookingResult.modifiedCount} bookings\n`);
        
        // Create a regular customer account for testing
        const customerEmail = 'customer@test.com';
        let customer = await User.findOne({ email: customerEmail });
        
        if (!customer) {
            const hashedPassword = await bcrypt.hash('customer123', 10);
            customer = await User.create({
                name: 'Test Customer',
                email: customerEmail,
                password: hashedPassword,
                role: 'user'
            });
            console.log('✅ Created customer account for testing');
        }
        
        console.log('\n🔐 CUSTOMER LOGIN CREDENTIALS:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('   Email:    customer@test.com');
        console.log('   Password: customer123');
        console.log('   Role:     Customer (User)');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        console.log('📝 HOW IT WORKS:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('1. Login as CUSTOMER to:');
        console.log('   - Browse cars');
        console.log('   - Book cars');
        console.log('   - View bookings at /my-bookings');
        console.log('   - CANNOT access /owner dashboard\n');
        console.log('2. Login as OWNER to:');
        console.log('   - Access /owner dashboard');
        console.log('   - Add/manage cars');
        console.log('   - Approve/reject bookings');
        console.log('   - View all bookings\n');
        
        console.log('🎉 Setup complete!');
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createOwnerAccount();
