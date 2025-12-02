import mongoose from 'mongoose';
import 'dotenv/config';
import Car from './models/Car.js';

const updateMustang = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`);
        console.log('Connected to database');
        
        const result = await Car.updateOne(
            { brand: "Ford", model: "Mustang" },
            { $set: { image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop&q=80" } }
        );
        
        if (result.modifiedCount > 0) {
            console.log('✅ Mustang image updated successfully!');
        } else {
            console.log('⚠️  Mustang not found or already has this image');
        }
        
        const mustang = await Car.findOne({ brand: "Ford", model: "Mustang" });
        if (mustang) {
            console.log('\nMustang details:');
            console.log(`Brand: ${mustang.brand}`);
            console.log(`Model: ${mustang.model}`);
            console.log(`Image: ${mustang.image}`);
        }
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

updateMustang();
