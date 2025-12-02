import mongoose from 'mongoose';
import 'dotenv/config';
import User from './models/User.js';
import bcrypt from 'bcrypt';

const resetOwnerPassword = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`);
        console.log('Connected to database\n');
        
        // Find owner account
        const owner = await User.findOne({ email: 'owner@carrental.com' });
        
        if (!owner) {
            console.log('❌ Owner account not found!');
            console.log('Creating new owner account...\n');
            
            const hashedPassword = await bcrypt.hash('owner123', 10);
            const newOwner = await User.create({
                name: 'Car Rental Owner',
                email: 'owner@carrental.com',
                password: hashedPassword,
                role: 'owner'
            });
            
            console.log('✅ Created new owner account');
            console.log('\n🔐 LOGIN CREDENTIALS:');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('   Email:    owner@carrental.com');
            console.log('   Password: owner123');
            console.log('   Role:     owner');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        } else {
            console.log('Found owner account:', owner.email);
            console.log('Current role:', owner.role);
            
            // Reset password
            const hashedPassword = await bcrypt.hash('owner123', 10);
            owner.password = hashedPassword;
            owner.role = 'owner'; // Ensure role is owner
            await owner.save();
            
            console.log('✅ Password reset successfully!\n');
            console.log('🔐 LOGIN CREDENTIALS:');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('   Email:    owner@carrental.com');
            console.log('   Password: owner123');
            console.log('   Role:     owner');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
            
            // Test the password
            const isMatch = await bcrypt.compare('owner123', owner.password);
            console.log('Password verification test:', isMatch ? '✅ PASS' : '❌ FAIL');
        }
        
        // Also reset customer password
        const customer = await User.findOne({ email: 'customer@test.com' });
        if (customer) {
            const hashedPassword = await bcrypt.hash('customer123', 10);
            customer.password = hashedPassword;
            customer.role = 'user';
            await customer.save();
            console.log('\n✅ Customer password also reset');
            console.log('   Email:    customer@test.com');
            console.log('   Password: customer123');
        }
        
        console.log('\n🎉 All done! Try logging in now.');
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

resetOwnerPassword();
