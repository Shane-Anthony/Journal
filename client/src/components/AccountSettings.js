import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const AccountSettings = ({user, setUser}) => {
    const history = useNavigate();
    const [password, setPassword] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch(`http://localhost:8000/delete/${user.id}/`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user.id, password }),
                
            });
            console.log('User:', user.id)
            console.log('Response status:', response.status);
            if (response.status === 200) {
                alert('Account deleted successfully.');
                history('/');
            } else {
                alert('Incorrect password.');
            }
        } catch (error) {
        console.error(error);
        alert('An error occurred while deleting the account.');
        }
    };

    return (
    <div>
        <Sidebar />
        <div className="main-content">
        <h1 className='title'>Account Settings</h1>
            <form onSubmit={handleSubmit}>
                <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
                </label>
                <button type="submit">Delete Account</button>
            </form>
        </div>
        
        
    </div>
  );
};

export default AccountSettings;