import React, { useContext, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Nav from "./Components/Nav/Nav";
import Course from "./Pages/Course/Course";
import Video from "./Components/Video/Video";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Contact from "./Pages/Contact/Contact";
import CourseDetails from "./Pages/CourseDetail/CourseDetail";
import Quiz from "./Components/Quiz/Quiz";
import MyLearnings from "./Pages/MyLearnings/MyLearnings";
import MyVideo from "./Pages/MyLearnings/MyVideo";
import Reward from "./Components/Reward/Reward";
import Profile from "./Pages/Profile/Profile";
import Dashboard from "./Dashboard/Dashboard";
import MyCourse from "./Dashboard/MyCourse/MyCourse";
import SideBar from "./Dashboard/SideBar/SideBar";
import Users from "./Dashboard/Users/Users";
import LeaderBoard from "./Dashboard/LeaderBoard/LeaderBoard";
import Upload from "./Dashboard/Upload/Upload";
import SuperAdminLogin from "./Admin/superAdmin/superAdminLogin";
import AddToCart from "./Pages/AddToCart/AddToCart";
import { authContext } from "./Context/AuthContext";
import VideoUpload from "./Components/VideoUpload/VideoUpload";
import Learning from "./Pages/Learning/Learning";

const App = () => {
  const token = localStorage.getItem("token");
  const { user } = useContext(authContext);

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to={"/"} />;
    }
    return children;
  };

  const bronze = localStorage.getItem("bronze") || 0;
  const silver = localStorage.getItem("silver") || 0;
  const gold = localStorage.getItem("gold") || 0;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Nav bronze={bronze} gold={gold} silver={silver} />}>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={<Course />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/addToCart" element={<AddToCart />} />
          <Route
            path="/coursedetails/:id"
            element={
              <ProtectedRoute>
                <CourseDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mylearnings"
            element={
              <ProtectedRoute>
                <MyLearnings />
              </ProtectedRoute>
            }
          />

          <Route path="/profile" element={<Profile />} />
          <Route
            path="/myvideo/:id"
            element={
              <ProtectedRoute>
                <MyVideo />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/learning/:id"
          element={
            <ProtectedRoute>
              <Learning />
            </ProtectedRoute>
          }
        />
        <Route path="/video" element={<Video />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/reward" element={<Reward />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route element={<SideBar />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/courses" element={<MyCourse />} />
          <Route path="/users" element={<Users />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/upload" element={<Upload />} />
        </Route>

        <Route path="/superAdmin" element={<SuperAdminLogin />} />
        <Route path="/tenantAdmin" element={<SuperAdminLogin />} />
        <Route path="/videoUpload" element={<VideoUpload />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
