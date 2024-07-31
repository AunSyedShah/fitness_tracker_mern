import React, { useEffect, useState } from 'react';
import axios from '../configs/axiosConfigs';

export default function Dashboard() {
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        async function getUserDetails() {
            try {
                const response = await axios.get('http://localhost:3000/api/userProfile');
                setUserProfile(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        getUserDetails();
    }, []);

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                {userProfile.profilePicture && (
                    <img
                        src={`http://localhost:3000/${userProfile.profilePicture.replace(/\\/g, '/')}`} // Convert backslashes to slashes
                        alt={`${userProfile.name}'s profile`}
                        className="w-32 h-32 rounded-full object-cover mb-4"
                    />
                )}
                <h2 className="text-2xl font-bold mb-2">{userProfile.name}</h2>
                <p className="text-gray-700 mb-4">{userProfile.email}</p>
            </div>
        </div>
    );
}
