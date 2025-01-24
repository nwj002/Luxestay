import axios from "axios"; // Replace with `loginUserApi` if it's an abstraction for axios
import React, { useState } from 'react';
import { toast } from "react-toastify";
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validate = () => {
        let isValid = true;

        // Email validation
        if (email.trim() === '' || !email.includes('@')) {
            setEmailError('Email is required and must be valid');
            isValid = false;
        } else {
            setEmailError('');
        }

        // Password validation
        if (password.trim() === '') {
            setPasswordError('Password is required');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform validation
        if (!validate()) return;

        // Prepare the request payload
        const data = {
            email,
            password,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/users/login', data);
            if (response.status === 200) {
                // Success handling
                toast.success(response.data.message);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userData', JSON.stringify(response.data.userData));
                window.location.href = '/'; // Redirect to the homepage
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            // Error handling
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="login-container">
            <div className="login-image"></div>
            <div className="login-form-container">
                <h1 className="login-title">Luxestay</h1>
                <p className="login-subtitle">Nice to see you again!</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {emailError && <p className="text-danger">{emailError}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {passwordError && <p className="text-danger">{passwordError}</p>}
                    </div>

                    <div className="form-actions">
                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <a href="/forgot-password" className="forgot-password">Forget password?</a>
                    </div>

                    <button type="submit" className="login-button">Login</button>
                </form>

                <p className="signup-text">
                    Don't have an account? <a href="/register" className="signup-link">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
