import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkoutList = ({ userId }) => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/workouts/${userId}`);
                setWorkouts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching workouts:', error);
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, [userId]);

    const deleteWorkout = async (workoutId) => {
        try {
            await axios.delete(`http://localhost:3000/api/workouts/${workoutId}`);
            setWorkouts(workouts.filter(workout => workout._id !== workoutId));
        } catch (error) {
            console.error('Error deleting workout:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Workouts</h2>
            {workouts.length === 0 ? (
                <div>No workouts found.</div>
            ) : (
                workouts.map(workout => (
                    <div key={workout._id} className="border p-4 rounded-md mb-4">
                        <h3 className="text-lg font-semibold">{workout.name}</h3>
                        <p><strong>Category:</strong> {workout.category}</p>
                        <p><strong>Tags:</strong> {workout.tags.join(', ')}</p>
                        <div>
                            <h4 className="font-semibold">Exercises:</h4>
                            {workout.exercises.map((exercise, index) => (
                                <div key={index}>
                                    <p>{exercise.name} - {exercise.sets} sets of {exercise.reps} reps, {exercise.weight} kg</p>
                                    <p>{exercise.notes}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => deleteWorkout(workout._id)} className="mt-2 bg-red-500 text-white p-1 rounded-md">Delete</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default WorkoutList;
