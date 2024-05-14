import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate();

  const handleLogin = async () => {
    
    setError('');
    try {
      if (!username || !password) {
        throw new Error('Please fill in both username and password.');
      }
      // Make API call to authenticate user
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      console.log(response);
      if(response.status===200){
      const data = response.data;
      console.log(data);
      document.cookie = "loggedIn=true; path=/";
      document.cookie = `username=${data.user.username}; path=/`;
      alert("Login Successful!!")
      navigate('select')
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Please fill in all fields.');
      }
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="card p-5" style={{ backgroundColor: '#87cefa', border: '2px solid #00008B', width: '500px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4" style={{ fontSize: '30px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', color: '#000', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>CPG Soloutions</h2>
          <p className="text-center mb-4" style={{ fontSize: '20px', marginTop: '0', fontFamily: 'Arial, sans-serif', color: '#333' }}>Enter your credentials</p>
          {error && <p className="text-danger text-center">{error}</p>}
          <form>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control form-control-lg"
              />
            </div>
            <button type="button" onClick={handleLogin} className="btn btn-primary btn-lg w-100 mb-4">
              Login
            </button>
            <p className="text-center mb-0">
              <span style={{ color: 'red' }}>Don't have an account? </span>
              <Link to="/signup" style={{ color: '#0000CD', cursor: 'pointer' }}>Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default Login;