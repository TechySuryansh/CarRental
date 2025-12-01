import mongoose from 'mongoose';
import 'dotenv/config';

const checkDatabases = async () => {
    try {
        // Connect without specifying database
        const baseUri = process.env.MONGODB_URI.split('/')[0] + '//' + process.env.MONGODB_URI.split('//')[1].split('/')[0];
        await mongoose.connect(baseUri + '/admin');
        
        const admin = mongoose.connection.db.admin();
        const { databases } = await admin.listDatabases();
        
        console.log('\n📊 Available Databases:');
        databases.forEach((db, index) => {
            console.log(`${index + 1}. ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
        });
        
        // Check car-rental database
        await mongoose.connection.close();
        await mongoose.connect(baseUri + '/car-rental');
        const Car = mongoose.model('Car', new mongoose.Schema({}, { strict: false }));
        const carsInCarRental = await Car.countDocuments();
        console.log(`\n🚗 Cars in "car-rental" database: ${carsInCarRental}`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

checkDatabases();
