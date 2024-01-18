import React from "react";
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
// import Profile from "./Dashboard/Profile/Profile";
import LeaderBoard from "./Dashboard/LeaderBoard/LeaderBoard";
import Upload from "./Dashboard/Upload/Upload";

const App = () => {
  const token = localStorage.getItem("token");

  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to={"/"} />;
    }
    return children;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Nav />}>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={<Course />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
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
        <Route path="/video" element={<Video />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/reward" element={<Reward />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route element={<SideBar />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/myCourse" element={<MyCourse />} />
          <Route path="/users" element={<Users />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/upload" element={<Upload />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
