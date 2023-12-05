import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Nav from "./Components/Nav/Nav";
import Course from "./Pages/Course/Course";
import Video from "./Components/Video/Video";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Contact from "./Pages/Contact/Contact";
import CourseDetails from "./Pages/CourseDetail/CourseDetail";
import Dashboard from "./Dashboard/Dashboard";
import MyCourse from "./Dashboard/MyCourse/MyCourse";
import SideBar from "./Dashboard/SideBar/SideBar";
import Users from "./Dashboard/Users/Users";
import Profile from "./Dashboard/Profile/Profile";
import LeaderBoard from "./Dashboard/LeaderBoard/LeaderBoard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Nav />}>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={<Course />} />
          <Route path="/video" element={<Video />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/coursedetails" element={<CourseDetails />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route element={<SideBar />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/myCourse" element={<MyCourse />} />
          <Route path="/users" element={<Users />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
