import React from "react";
import "./HomeMainbar.css";
import QuestionList from "./QuestionList";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../actions/currentUser";
import { useEffect, useState } from "react";
import { fetchAllUsers } from "../../actions/users";
const HomeMainbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUserReducer);

  useEffect(() => {
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [dispatch]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const checkAuth = () => {
    if (user === null) {
      alert("Login or signup to ask Question ");
      navigate("/Auth/");
    } else {
      console.log(user);
      navigate("/AskQuestion");
    }
  };
  const handleSubscribe = () => {
    navigate("/Subscribe");
  };
  const questionsList = useSelector((state) => state.questionsReducer);

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <div className="btns">
          {user !== null ? (
            <button onClick={handleSubscribe} className="ask-btn-1">
              Subscription
            </button>
          ) : (
            <></>
          )}
          <button onClick={checkAuth} className="ask-btn">
            AskQuestion
          </button>
        </div>
      </div>

      <div>
        {questionsList.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{questionsList.data.length} Questions</p>
            <QuestionList questionsList={questionsList.data} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;
