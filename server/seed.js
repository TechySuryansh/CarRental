import mongoose from 'mongoose';
import 'dotenv/config';
import Car from './models/Car.js';
import User from './models/User.js';

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`);
        console.log('MongoDB Connected for seeding (car-rental database)');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const dummyCars = [
    {
        brand: "Toyota",
        model: "Camry",
        year: 2023,
        category: "Sedan",
        seating_capacity: 5,
        fuel_type: "Petrol",
        pricePerDay: 45,
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop",
        location: "New York",
        description: "Comfortable and reliable sedan perfect for city driving and long trips. Features modern amenities and excellent fuel efficiency.",
        isAvailable: true
    },
    {
        brand: "Honda",
        model: "CR-V",
        year: 2024,
        category: "SUV",
        seating_capacity: 7,
        fuel_type: "Hybrid",
        pricePerDay: 65,
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop",
        location: "Los Angeles",
        description: "Spacious SUV with hybrid technology. Perfect for families and road trips with ample cargo space.",
        isAvailable: true
    },
    {
        brand: "Tesla",
        model: "Model 3",
        year: 2024,
        category: "Sedan",
        seating_capacity: 5,
        fuel_type: "Electric",
        pricePerDay: 85,
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop",
        location: "San Francisco",
        description: "Premium electric sedan with autopilot features. Zero emissions and cutting-edge technology.",
        isAvailable: true
    },
    {
        brand: "BMW",
        model: "X5",
        year: 2023,
        category: "SUV",
        seating_capacity: 5,
        fuel_type: "Diesel",
        pricePerDay: 95,
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop",
        location: "Chicago",
        description: "Luxury SUV with premium features and powerful performance. Ideal for business trips and special occasions.",
        isAvailable: true
    },
    {
        brand: "Ford",
        model: "Mustang",
        year: 2023,
        category: "Coupe",
        seating_capacity: 4,
        fuel_type: "Petrol",
        pricePerDay: 75,
        transmission: "Manual",
        image: "https://images.unsplash.com/photo-1584345604476-8ec5f5d3e0c0?w=800&auto=format&fit=crop",
        location: "Miami",
        description: "Iconic sports car with thrilling performance. Perfect for weekend getaways and special events.",
        isAvailable: true
    },
    {
        brand: "Mercedes-Benz",
        model: "C-Class",
        year: 2024,
        category: "Sedan",
        seating_capacity: 5,
        fuel_type: "Petrol",
        pricePerDay: 80,
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop",
        location: "Boston",
        description: "Elegant luxury sedan with sophisticated design and advanced safety features.",
        isAvailable: true
    },
    {
        brand: "Jeep",
        model: "Wrangler",
        year: 2023,
        category: "SUV",
        seating_capacity: 5,
        fuel_type: "Petrol",
        pricePerDay: 70,
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop",
        location: "Denver",
        description: "Rugged off-road SUV perfect for adventure seekers. Great for mountain trips and outdoor activities.",
        isAvailable: true
    },
    {
        brand: "Audi",
        model: "A4",
        year: 2024,
        category: "Sedan",
        seating_capacity: 5,
        fuel_type: "Petrol",
        pricePerDay: 72,
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop",
        location: "Seattle",
        description: "Premium sedan with cutting-edge technology and refined performance.",
        isAvailable: true
    },
    {
        brand: "Chevrolet",
        model: "Tahoe",
        year: 2023,
        category: "SUV",
        seating_capacity: 8,
        fuel_type: "Petrol",
        pricePerDay: 90,
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop",
        location: "Dallas",
        description: "Full-size SUV with maximum space and comfort. Perfect for large families and group trips.",
        isAvailable: true
    },
    {
        brand: "Hyundai",
        model: "Elantra",
        year: 2024,
        category: "Sedan",
        seating_capacity: 5,
        fuel_type: "Petrol",
        pricePerDay: 40,
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop",
        location: "Phoenix",
        description: "Affordable and efficient sedan with modern features. Great value for daily rentals.",
        isAvailable: true
    },
    {
        brand: "Volkswagen",
        model: "Tiguan",
        year: 2023,
        category: "SUV",
        seating_capacity: 5,
        fuel_type: "Diesel",
        pricePerDay: 60,
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop",
        location: "Portland",
        description: "Compact SUV with European styling and excellent fuel economy.",
        isAvailable: true
    },
    {
        brand: "Nissan",
        model: "Altima",
        year: 2024,
        category: "Sedan",
        seating_capacity: 5,
        fuel_type: "Petrol",
        pricePerDay: 42,
        transmission: "Automatic",
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop",
        location: "Atlanta",
        description: "Reliable mid-size sedan with spacious interior and smooth ride.",
        isAvailable: true
    }
];

const seedDatabase = async () => {
    try {
        await connectDB();

        // Find a user to be the owner (or create a dummy owner)
        let owner = await User.findOne({ role: 'owner' });
        
        if (!owner) {
            // If no owner exists, find any user and make them owner
            owner = await User.findOne();
            if (owner) {
                console.log('Found user:', owner.email);
                owner.role = 'owner';
                await owner.save();
                console.log('✅ Made user an owner:', owner.email);
            } else {
                // Create a dummy owner for seeding purposes
                console.log('No users found. Creating a dummy owner...');
                const bcrypt = await import('bcrypt');
                const hashedPassword = await bcrypt.default.hash('password123', 10);
                
                owner = await User.create({
                    name: 'Demo Owner',
                    email: 'owner@carrental.com',
                    password: hashedPassword,
                    role: 'owner'
                });
                
                console.log('✅ Created dummy owner: owner@carrental.com');
                console.log('   Password: password123');
                console.log('   You can login with these credentials!');
            }
        } else {
            console.log('Found existing owner:', owner.email);
        }

        // Clear existing cars (optional - comment out if you want to keep existing cars)
        // await Car.deleteMany({});
        // console.log('Cleared existing cars');

        // Add owner ID to all dummy cars
        const carsWithOwner = dummyCars.map(car => ({
            ...car,
            owner: owner._id
        }));

        // Insert dummy cars
        const insertedCars = await Car.insertMany(carsWithOwner);
        
        console.log('\n✅ Successfully seeded database with dummy cars!');
        console.log(`📊 Total cars added: ${insertedCars.length}`);
        console.log(`👤 Owner: ${owner.name} (${owner.email})`);
        console.log('\nCars added:');
        insertedCars.forEach((car, index) => {
            console.log(`${index + 1}. ${car.brand} ${car.model} - $${car.pricePerDay}/day - ${car.location}`);
        });

        console.log('\n🎉 Database seeding completed!');
        console.log('You can now browse and book these cars in your app.');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
