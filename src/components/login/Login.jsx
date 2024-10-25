// src/components/Login.js
import React, { useState } from 'react';
// import { auth } from '../firebaseConfig';
// import { signInWithEmailAndPassword } from 'firebase/auth';
import './login.css'; // Import CSS
import { auth } from '../auth/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { OrbitProgress } from 'react-loading-indicators';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setTimeout(() => {
        setLoading(false);
        navigate("/"); 
    }, 300); 
    } catch (err) {
      setLoading(false); 
      setError(err.message);
    }
  };

  return (

    <div className="login-container"> 
    {loading ? (
          <OrbitProgress 
                    variant="dotted" 
                    dense 
                    color="#222a22" 
                    size="small" 
                    text="Please wait.." 
                    textColor="#060505"
                    className="loading-spinner" 
                />
        
            ):
            <div className="login-form">
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
              </form>
              {error && <p className="error">{error}</p>} 
            </div>}
    </div>
  );
}

export default Login;
