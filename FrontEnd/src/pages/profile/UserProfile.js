// src/pages/profile/UserProfile.js
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>My Profile</h2>
        
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
          <p><strong>Gender:</strong> {user?.gender}</p>
          <p><strong>Date of Birth:</strong> {user?.dateOfBirth}</p>
        </div>
        
        <a href="/profile/edit" className="btn-edit-profile">
          Edit Profile
        </a>
      </div>
    </div>
  );
};

export default UserProfile;