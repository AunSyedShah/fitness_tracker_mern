import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from './context/AuthContext';
import {useNavigate} from 'react-router-dom';
import WorkoutForm from './components/WorkoutForm';
import WorkoutList from './components/WorkoutList.jsx';
import axios from 'axios';

const App = () => {
    const {isLoggedIn, token} = useContext(AuthContext);
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [userId, setUserId] = useState(null);

    // Initialize user ID on component mount
    useEffect(() => {
        if (isLoggedIn) {
            const id = getUserIdFromToken();
            setUserId(id);
        } else {
            navigate('/login');
        }
    }, [isLoggedIn, navigate, token]);

    const initialValues = {
        name: '',
        category: '',
        exercises: [{name: '', sets: '', reps: '', weight: '', notes: ''}],
        tags: ['']
    };

    const createWorkout = async (values, {resetForm}) => {
        try {
            await axios.post('http://localhost:3000/api/workouts', {...values, user: "1"});
            resetForm();
            setShowForm(false);
        } catch (error) {
            console.error('Error creating workout:', error);
        }
    };

    if (!isLoggedIn) {
        return <div>Loading...</div>; // Show loading state until user ID is available or redirect
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Workout Tracker</h1>
            <button
                onClick={() => setShowForm(!showForm)}
                className="mb-4 bg-blue-500 text-white p-2 rounded-md"
            >
                {showForm ? 'Hide Form' : 'Add Workout'}
            </button>
            {showForm && <WorkoutForm initialValues={initialValues} onSubmit={createWorkout}/>}
            {/*<WorkoutList userId={userId}/>*/}
        </div>
    );
};

export default App;
