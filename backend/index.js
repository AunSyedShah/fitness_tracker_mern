import express from 'express';
import mongoose from 'mongoose';

async function connect_db(){
    try {
        await mongoose.connect('mongodb://localhost:27017/fitness_tracker');
        console.info('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
}

const app = express();
app.use(express.json())
