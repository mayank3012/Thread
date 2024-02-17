import mongoose from "mongoose"

let isConnected = false; // default connected is false
export const ConnectToDb = async () => {
    mongoose.set('strictQuery', true);
    if (!process.env.MONGODB_CONNECTION_STRING) return console.log('Connection string no available');
    if (isConnected) return console.log('Already connected to db');

    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        isConnected = true;
    } catch (error: any) {
        console.log('Error: ', error);
    }
}