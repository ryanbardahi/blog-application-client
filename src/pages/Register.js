import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

const Register = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      notyf.error('Passwords do not match.');
      return;
    }

    setIsRegistering(true);

    try {
      const response = await fetch(
        'https://blog-application-server-r3nf.onrender.com/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: form.email,
            username: form.email.split('@')[0],
            password: form.password,
          }),
        }
      );

      if (response.status === 201) {
        const data = await response.json();
        notyf.success(data.message || 'User registered successfully!');
        setForm({
          email: '',
          password: '',
          confirmPassword: '',
        });
        navigate('/login');
      } else {
        const error = await response.json();
        notyf.error(error.message || 'Registration failed!');
      }
    } catch (err) {
      notyf.error('An error occurred during registration.');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="register-page container d-flex flex-column justify-content-center align-items-center">
      <h2 className="mb-4 mt-4">Register</h2>
      <form className="register-form w-100" style={{ maxWidth: '400px' }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <div className="input-group">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isRegistering}
        >
          {isRegistering ? 'Registering...' : 'Register'}
        </button>
        <div className="text-center mt-3">
          <span>Already have an account? </span>
          <Link to="/login">Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;