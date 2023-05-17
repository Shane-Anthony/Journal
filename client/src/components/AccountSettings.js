import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const AccountSettings = ({user, setUser}) => {
    const history = useNavigate();
    const [password, setPassword] = useState('');
    const [showPasswordInput, setShowPasswordInput] = useState(false);

    const handleDeleteButtonClick = () => {
        setShowPasswordInput(true);
    };

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
            <div className="sButton-container">

                <div className="settingsButtons" onClick={handleDeleteButtonClick}>Delete Account</div>
            {showPasswordInput && (
                <form onSubmit={handleSubmit}>
                    <p>Please enter your password to confirm deletion:</p>
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    <button type="submit">Confirm</button>
                </form>
            )}
            </div>
            
        </div>
    </div>
  );
};

export default AccountSettings;
