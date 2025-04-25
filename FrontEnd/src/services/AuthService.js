import api from "./ApiInstance";

export const login = async (credentials) => {
  const formData = new URLSearchParams();
  formData.append('username', credentials.username);
  formData.append('password', credentials.password);

  return api.post('/login', formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
};

export const logout = () => api.post("/logout");
export const register = (userData) => api.post("/auth/register", userData);
export const requestPasswordReset = (email) => api.post(`/auth/forgot-password?email=${encodeURIComponent(email)}`);
export const resetPassword = (token, newPassword) => api.post(`/auth/reset-password?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(newPassword)}`);