import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import './Login.css'; // your CSS file

const CLIENT_ID = "1064111085911-odjgr0gfecta4rj1gum1bre1plnever8.apps.googleusercontent.com"; // replace with your own client ID

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simple hardcoded credential check
    if (email === 'anbuselvam.sk05@gmail.com' && password === 'password') {
      setErrors({});
      setError('');
      if (onLogin) onLogin();
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
    alert("Google Login Successful!");
    if (onLogin) onLogin();
    navigate('/dashboard');
  };

  const handleLoginError = () => {
    console.log("Google Login Failed");
    alert("Google Login Failed!");
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="icon-circle">
              <Lock className="icon" />
            </div>
            <h1>Welcome Back</h1>
            <p>Sign in to your account</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-group">
              
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={errors.email ? 'error' : ''}
                />
              </div>
              {errors.email && <p className="error-msg">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="form-group">
              
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={errors.password ? 'error' : ''}
                />
                <button
                  type="button"
                  className="show-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && <p className="error-msg">{errors.password}</p>}
            </div>

            {error && <div className="error-msg" style={{ color: 'red' }}>{error}</div>}

            {/* Options */}
            {/* <div className="form-options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <button type="button" className="forgot-btn">
                Forgot password?
              </button>
            </div> */}

            {/* Submit Button */}
            <button type="submit" className="login-btn">Sign In</button>
          </form>

          {/* Divider */}
          <div className="divider">Or continue with</div>

          {/* Google Login */}
          <div className="google-login">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
            />
          </div>

          {/* Signup */}
          <div className="signup-text">
            Don't have an account? <button className="signup-btn">Sign up</button>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
