import { Schema, model } from 'mongoose';

const exerciseSchema = new Schema(
    {
        name: { type: String, required: true },
        sets: { type: Number, required: true },
        reps: { type: Number, required: true },
        weight: { type: Number, required: true },
        notes: { type: String }
    },
    { timestamps: true }
);

const workoutSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        category: { type: String, required: true },
        exercises: [exerciseSchema],
        tags: [String]
    },
    { timestamps: true }
);

const Workout = model('Workout', workoutSchema);
export default Workout;
