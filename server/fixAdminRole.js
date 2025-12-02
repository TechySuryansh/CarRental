import mongoose from 'mongoose';
import User from './models/User.js';
import 'dotenv/config';

const fixAdminRole = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`);
    console.log('Connected to database');

    const admin = await User.findOne({ email: 'owner@carrental.com' });
    
    if (!admin) {
      console.log('Admin user not found');
      return;
    }

    console.log('Current role:', admin.role);
    
    admin.role = 'owner';
    await admin.save();
    
    console.log('Admin role updated to owner successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

fixAdminRole();
