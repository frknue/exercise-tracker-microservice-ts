import * as dotenv from 'dotenv';
import { MongoClient } from 'mongodb';


dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const client = new MongoClient(MONGO_URI);


