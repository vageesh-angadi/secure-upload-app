// src/components/Register.js
import React, { useState } from 'react';
// import { auth } from '../firebaseConfig';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
import './register.css'; // Import CSS

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // await createUserWithEmailAndPassword(auth, email, password);
            alert("Registration successful!");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
            {error && <p className="error">{error}</p>}
            <a href="/login" className="link">Already have an account? Login here</a>
        </div>
    );
}

export default Register;
