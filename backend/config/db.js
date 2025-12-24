import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://dillibasker252005_db_user:dilli1488@cluster0.rgwuxvx.mongodb.net/?appName=Cluster0'
    );
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
