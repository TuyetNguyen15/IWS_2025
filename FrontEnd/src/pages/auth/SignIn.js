import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const registerSuccess = location.search.includes('registerSuccess=true');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.username, formData.password);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <h2 className="signin-title">Sign In</h2>
        
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}
        
        {registerSuccess && (
          <div className="alert alert-success">
            Registration successful! Please login
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="btn-container">
            <button type="submit" className="btn-signin">
              Sign In
            </button>
          </div>
          
          <div className="signup-link">
            Don't have an account? <a href="/auth/register">Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;