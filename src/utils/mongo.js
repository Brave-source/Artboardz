import mongoose from 'mongoose';

const MONGO_URL = "mongodb+srv://emmyzee:AdZfpZ3vOCD7U5vs@artboardz.b8xqc.mongodb.net/artboardz?retryWrites=true&w=majority";
//emmyzee45:k3yClcxRaLyukcii
//test:TC8ztnqrc74nWdwN
// emmyzee:AdZfpZ3vOCD7U5vs
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