import React, { useContext } from "react";
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
import { authContext } from "./Context/AuthContext";

const App = () => {
  //const { token } = useContext(authContext);
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
