import React from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import NoteState from './context/NoteState';
import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login';
import Upload from './components/Post/Upload';
import OwnPosts from './components/Post/OwnPosts';
import HomePage from './components/HomePage';
import OwnProfile from './components/Profile/OwnProfile';
import Frontpage from './components/Frontpage';
import List from './components/List';
import UserPage from './components/UserPage';
import FriendRequests from './components/FriendRequests';
import Header from './components/Header';

const App = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === '/';
  const isSignupPage = location.pathname === '/signup';

  return (
    <NoteState>
      <div>
        {!(isLoginPage || isSignupPage) && <HomePage />}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/header" element={<Header />} />
          <Route path="/friendrequest" element={<FriendRequests />} />
          <Route path="/getuserpost/:userId" element={<UserPage />} />
          <Route path="/list" element={<List />} />
          <Route path="/frontpage" element={<Frontpage />} />
          <Route path="/ownprofile" element={<OwnProfile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/ownpost" element={<OwnPosts />} />
        </Routes>
      </div>
    </NoteState>
  );
};

export default App;
