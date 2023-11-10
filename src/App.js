import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Nav from "./Components/Nav/Nav";
import Course from "./Pages/Course/Course";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Nav />}>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={<Course />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
