import {Router} from 'express';
import Workout from "../models/exerciseSchema.js";

const workoutRoutes = Router();

// Create a workout
workoutRoutes.post('/', async (req, res) => {
    try {
        const {user, name, category, exercises, tags} = req.body;
        const newWorkout = new Workout({user, name, category, exercises, tags});
        const savedWorkout = await newWorkout.save();
        res.status(201).json(savedWorkout);
    } catch (error) {
        console.error('Error creating workout:', error);
        res.status(500).json({error: error.message});
    }
});

// Get all workouts for a user
workoutRoutes.get('/:userId', async (req, res) => {
    try {
        const workouts = await Workout.find({user: req.params.userId});
        res.json(workouts);
    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).json({error: error.message});
    }
});

// Update a workout
workoutRoutes.put('/:id', async (req, res) => {
    try {
        const {name, category, exercises, tags} = req.body;
        const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, {
            name,
            category,
            exercises,
            tags
        }, {new: true});
        res.json(updatedWorkout);
    } catch (error) {
        console.error('Error updating workout:', error);
        res.status(500).json({error: error.message});
    }
});

// Delete a workout
workoutRoutes.delete('/:id', async (req, res) => {
    try {
        await Workout.findByIdAndDelete(req.params.id);
        res.json({message: 'Workout deleted successfully'});
    } catch (error) {
        console.error('Error deleting workout:', error);
        res.status(500).json({error: error.message});
    }
});

export default workoutRoutes;
