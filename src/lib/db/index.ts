import mongoose from 'mongoose';

// This cached connection avoid a multiple connection to the database when the server is running in development mode
const cached = (global as any ).mongoose || { conn: null, promise: null };
export const connectToDatabase = async (
    MONGODB_URI = process.env.MONGODB_URI
) => {
    // If a connection already exists (cached), it returns that immediately to avoid re-connecting.
    if(cached.conn) return cached.conn;

    if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

    // If a promise to connect hasn't already been made, it creates one using mongoose.connect.
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI);

    // Waits for the connection to resolve and saves the result to cached.conn.
    cached.conn = await cached.promise;

    return cached.conn;
}