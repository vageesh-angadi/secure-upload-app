// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import './home.css';
import { uploadFile } from '../s3/s3Service';
import { OrbitProgress } from 'react-loading-indicators';



function Home() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); 
        });
        return () => unsubscribe(); 
    }, [auth]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError(''); 
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
        setUploading(true);
        try {
            const response = await uploadFile(file);
            setTimeout(() => {
                setUploading(false);
                alert("Uploaded successfully:",response.Location);
            }, 300); 
            
        } catch (err) {
            setUploading(false);
            setError(err.message);
        }

     };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setFile('');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handleSignIn = () => {
        navigate('/login');
    };

    return (
        <div className="home-container">
            {uploading?(          
                <OrbitProgress 
                    variant="dotted" 
                    dense 
                    color="#222a22" 
                    size="small" 
                    text="Uploading.." 
                    textColor="#060505"
                    className="loading-spinner" 
                />):(<div className="upload-section">
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
                </div>)}
        </div>
    );
}

export default Home;
