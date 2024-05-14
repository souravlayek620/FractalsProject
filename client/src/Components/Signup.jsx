import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate();

  const handleSignup = async () => {
    setError('');
    try {
      if (!username || !password || !confirmPassword || !role) {
        throw new Error('Please fill in all fields.');
      }
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match.');
      }
      // Make API call to register user
      const response = await axios.post('http://localhost:5000/api/signup', {
        username,
        password,
        role, // Include role in the request
      });

      if(response.status===200){
      const data = response.data;
      toast.success('Signup successful');
      alert('Signup Successful.Please Login')
      navigate('/');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="card p-5" style={{ backgroundColor: '#87cefa', border: '2px solid #00008B', width: '500px' }}>
        <div className="card-body">
        <h2 className="card-title text-center mb-4" style={{ fontSize: '48px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', color: '#000', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>SIGN-UP</h2>
          <p className="text-center mb-4" style={{ fontSize: '20px', marginTop: '0', fontFamily: 'Arial, sans-serif', color: '#333' }}>Create your Account</p>
          {error && <p className="text-danger text-center">{error}</p>}
          <form>
            <div className="mb-4">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="form-control form-control-lg"
              >
                <option value="">Select Role</option>
                <option value="manufacturer">Manufacturer</option>
                <option value="retailer">Retailer</option>
              </select>
            </div>
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
            <div className="mb-4">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control form-control-lg"
              />
            </div>
            <button type="button" onClick={handleSignup} className="btn btn-primary btn-lg w-100 mb-3">
              Sign Up
            </button>
            <p className="text-center mb-0" style={{ color: 'red' }}>
            Already have an account? <Link to="/" style={{ color: 'blue' }}>Login</Link>
          </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;