// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import './home.css';
import { uploadFile } from '../s3/s3Service';


function Home() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Set user if authenticated, otherwise null
        });
        return () => unsubscribe(); // Clean up listener
    }, [auth]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError(''); // Clear any previous errors
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You need to be signed in to upload files.');
            return;
        }
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }
        try {
            const response = await uploadFile(file);
            alert(`File uploaded successfully! ${response.Location}`);
        } catch (err) {
            setError(err.message);
        }
     };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setFile('');
            // navigate('/login');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handleSignIn = () => {
        navigate('/login');
    };

    return (
        <div className="home-container">
            <div className="upload-section">
                <h2>Upload File</h2>
                
                <form onSubmit={handleUpload}>
                    <input
                        type="file"
                        onChange={handleFileChange}
                    />
                    <button className="upload-button" type="submit">
                        Upload
                    </button>
                </form>
                
                {!user ? (
                    <button className="signin-button" onClick={handleSignIn}>Sign In</button>
                ) : (
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                )}
                
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
}

export default Home;
