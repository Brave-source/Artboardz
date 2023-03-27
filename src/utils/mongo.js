import mongoose from 'mongoose';

const MONGO_URL = "mongodb+srv://test:hr98R7eVSJxVEaXx@artboardz.b8xqc.mongodb.net/artboardz?retryWrites=true&w=majority";
//emmyzee:AdZfpZ3vOCD7U5vs
//test
//hr98R7eVSJxVEaXx
if(!MONGO_URL) {
    throw new Error('Please define the MONGO_URL environment variable inside .env.local')
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if(cached.conn) {
        return cached.conn
    }
    
    if(!cached.promise) {
        const opts = {
            bufferCommands: false
        }

        cached.promise = mongoose.connect(MONGO_URL, opts).then((mongoose) => {
            return mongoose
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}

export default dbConnect