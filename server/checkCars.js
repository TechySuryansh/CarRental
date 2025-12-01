import mongoose from 'mongoose';
import 'dotenv/config';
import Car from './models/Car.js';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const checkCars = async () => {
    try {
        await connectDB();
        
        const allCars = await Car.find({});
        const availableCars = await Car.find({ isAvailable: true, owner: { $ne: null } });
        
        console.log('\n📊 Database Statistics:');
        console.log(`Total cars in database: ${allCars.length}`);
        console.log(`Available cars (with owner): ${availableCars.length}`);
        
        if (allCars.length > 0) {
            console.log('\n🚗 All Cars:');
            allCars.forEach((car, index) => {
                console.log(`${index + 1}. ${car.brand} ${car.model} - $${car.pricePerDay}/day - ${car.location}`);
                console.log(`   Owner: ${car.owner || 'NO OWNER'}, Available: ${car.isAvailable}`);
            });
        } else {
            console.log('\n⚠️  No cars found in database!');
        }
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkCars();
