// src/components/UserDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetails = ({ userId }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/user/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Details</h2>
            <p>ID: {user.id}</p>
            <p>Name of Owner: {user.NameOfOwner}</p>
            <p>Flat No: {user.FlatNo}</p>
            {/* Add more fields as needed */}
        </div>
    );
};

export default UserDetails;
