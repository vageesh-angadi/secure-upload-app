// src/components/Home.js
import React, { useState } from 'react';
import './home.css'; // Import CSS

function Home() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError(''); // Clear any previous errors
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }
        // Implement the upload logic here
        alert(`Uploading: ${file.name}`);
    };

    return (
        <div className="home-container"> {/* Use the CSS class here */}
            <div className="upload-section">
                <h2>Upload File</h2>
                <form onSubmit={handleUpload}>
                    <input
                        type="file"
                        onChange={handleFileChange}
                    />
                    <button className="upload-button" type="submit">Upload</button>
                </form>
                {error && <p className="error">{error}</p>} {/* Display error message */}
            </div>
        </div>
    );
}

export default Home;
