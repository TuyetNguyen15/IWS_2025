// src/pages/profile/AdminProfile.js
import { useAuth } from '../../context/AuthContext';

const AdminProfile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <div className="profile-container admin">
        <h2>Admin Profile</h2>
        
        {user?.profileImage && (
          <img 
            src={`/profile/image/${user.id}`} 
            alt="Profile" 
            className="profile-image"
          />
        )}
        
        <div className="profile-info">
          <p><strong>Name:</strong> {user?.fullName}</p>
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Position:</strong> {user?.position}</p>
          <p><strong>Role:</strong> {user?.role}</p>
        </div>
        
        <a href="/profile/edit" className="btn-edit-profile">
          Edit Profile
        </a>
      </div>
    </div>
  );
};

export default AdminProfile;