
import React from 'react';
import Profile from '../components/Dashboard/Profile';
import ReadingHistory from '../components/Dashboard/ReadingHistory';

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Profile />
      <ReadingHistory />
    </div>
  );
};

export default DashboardPage;
