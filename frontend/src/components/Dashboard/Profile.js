import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/userService';
import AuthService from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchProfile = () => {
    UserService.getProfile().then(
      (response) => {
        setProfile(response.data);
        setNewName(response.data.name);
        setNewEmail(response.data.email);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      }
    );
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const updatedUser = await UserService.updateProfile(newName, newEmail);
      setProfile(updatedUser.data);
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(resMessage);
    }
  };

  const handleDeleteUser = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await UserService.deleteUser();
        AuthService.logout();
        setCurrentUser(undefined);
        navigate('/');
        alert('Your account has been deleted.');
      } catch (error) {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
      }
    }
  };

  return (
    <div>
      <h3>Profile</h3>
      {profile ? (
        isEditing ? (
          <form onSubmit={handleUpdateProfile}>
            <div>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                id='name'
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor='email'>Email:</label>
              <input
                type='email'
                id='email'
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
            </div>
            <button type='submit'>Save Changes</button>
            <button type='button' onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        ) : (
          <div>
            <p>
              <strong>Name:</strong> {profile.name}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
            <button onClick={handleDeleteUser}>Delete Account</button>
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;