import { Routes, Route } from "react-router-dom";

import React from "react";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Questions from "./pages/Questions/Questions";
import AskQuestions from "./pages/AskQuestion/AskQuestion";
import DisplayQuestions from "./pages/Questions/DisplayQuestions";
import Tags from "./pages/Tags/Tags";
import Users from "./pages/Users/Users";
import UserProfile from "./pages/UserProfile/UserProfile";
import Subscribe from "./pages/Subscribe/Subscribe";
import Socio from "./pages/Socio/Socio";
import Profile from "./pages/Profile/Profile";
import ChatBot from "./pages/ChatBot/ChatBot";
const AllRoutes = ({ slideIn, handleSlideIn }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      ></Route>
      <Route path="/Auth" element={<Auth />}></Route>
      <Route
        path="/Questions"
        element={<Questions slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      ></Route>
      <Route
        path="/Askquestion"
        element={
          <AskQuestions slideIn={slideIn} handleSlideIn={handleSlideIn} />
        }
      ></Route>
      <Route
        path="/Questions/:id"
        element={
          <DisplayQuestions slideIn={slideIn} handleSlideIn={handleSlideIn} />
        }
      ></Route>
      <Route
        path="/Tags"
        element={<Tags slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      ></Route>
      <Route
        path="/Users"
        element={<Users slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      ></Route>

      <Route
        path="/Users/:id"
        element={
          <UserProfile slideIn={slideIn} handleSlideIn={handleSlideIn} />
        }
      ></Route>
      <Route
        path="/Subscribe"
        element={<Subscribe slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      ></Route>

      <Route
        path="/Socio"
        element={<Socio slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      ></Route>
      <Route
        path="/Socio/profile/:id"
        element={<Profile slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      ></Route>
      <Route
        path="/ChatBot"
        element={<ChatBot slideIn={slideIn} handleSlideIn={handleSlideIn} />}
      ></Route>
    </Routes>
  );
};

export default AllRoutes;
