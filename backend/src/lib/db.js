  import mongoose from 'mongoose';

  export const connectDB = async ()=>{

    console.log('inside connectDB')
    try{
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB connected successfully : ${conn.connection.host}`);
    }
    catch(error){
      console.error(`Error connecting to MongoDB: ${error.message}`);
    } 
  } 