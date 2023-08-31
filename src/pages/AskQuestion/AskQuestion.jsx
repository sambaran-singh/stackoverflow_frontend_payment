import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../../actions/currentUser";
import "./AskQuestion.css";
import moment from "moment";
import { askQuestion } from "../../actions/question";
import { updateCurrentUser } from "../../actions/users";
import { getUserData } from "../../actions/updatedUser";
import { fetchAllUsers } from "../../actions/users";
const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const User = useSelector((state) => state.currentUserReducer);
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter(
    (user) => user._id === User.result._id
  )[0];

  // useEffect(() => {
  //   dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  // }, [dispatch]);
  const navigate = useNavigate();

  const [lastPostedDate, setLastPostedDate] = useState(
    currentProfile?.lastPostedDate
  );
  const [noOfQuestionsPosted, setNoOfQuestionsPosted] = useState(
    currentProfile?.noOfQuestionsPosted
  );

  // useEffect(() => {
  //   const currentDate = new Date();
  //   const currentDateString = currentDate.toDateString();

  //   console.log(currentDateString);
  //   console.log(lastPostedDate);
  //   if (currentDateString !== currentProfile?.lastPostedDate) {
  //     setLastPostedDate(currentDateString);
  //     setNoOfQuestionsPosted(0);
  //   }
  // }, [lastPostedDate, noOfQuestionsPosted]);

  ////
  useEffect(() => {
    const currentDate = new Date();
    // const currentYear = currentDate.getFullYear();
    // const currentMonth = currentDate.getMonth();
    // const currentDay = currentDate.getDate();
    const curdate = moment(currentDate);
    const currentDateString = currentDate.toDateString();
    if (curdate.diff(moment(currentProfile?.lastPostedDate), "days") > 0) {
      setLastPostedDate(currentDateString);
      setNoOfQuestionsPosted(0);
      console.log(curdate.diff(moment(currentProfile?.lastPostedDate), "days"));
    }
  }, [currentProfile?.lastPostedDate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (currentProfile) {
    //   const currentDate = new Date();
    //   const currentDateString = currentDate.toDateString();
    //   if (currentDateString > currentProfile?.lastPostedDate) {
    //     setLastPostedDate(currentDateString);
    //     setNoOfQuestionsPosted(0);
    //   }

    //   // console.log(currentDateString);
    //   console.log(lastPostedDate);
    // }

    if (User) {
      if (currentProfile.subscription === "Free" && noOfQuestionsPosted >= 1) {
        alert(
          "FREE membership can post only one Question a day! \n Try upgrading your membership"
        );
        navigate("/Subscribe");
      } else if (
        currentProfile.subscription === "GOLD" &&
        noOfQuestionsPosted >= 5
      ) {
        console.log(noOfQuestionsPosted);
        alert(
          "Silver membership can post only 5 Questions a day! \n Try upgrading your membership"
        );
        navigate("/Subscribe");
      } else {
        console.log(noOfQuestionsPosted);
        if (questionTitle && questionBody && questionTags) {
          const ans = noOfQuestionsPosted + 1;
          setNoOfQuestionsPosted(ans);

          const updatedUser = {
            id: User?.result._id,
            noOfQuestionsPosted: ans,
            lastPostedDate: lastPostedDate,
          };

          try {
            dispatch(updateCurrentUser(updatedUser));
            console.log("User updated successfully in MongoDB");
          } catch (error) {
            console.log("Error updating user in MongoDB: ", error);
          }
          // dispatch(getUserData(User?.result._id));
          dispatch(
            askQuestion(
              {
                questionTitle,
                questionBody,
                questionTags,
                userPosted: User?.result.name,
                userId: User?.result._id,
              },
              navigate
            )
          );
        } else {
          alert("Please enter all the fields");
        }
      }
    } else {
      alert("Login to ask a question");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n");
    }
  };
  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you’re asking a question to another
                person
              </p>
              <input
                type="text"
                id="ask-ques-title"
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer your
                question
              </p>
              <textarea
                name=""
                id="ask-ques-body"
                onChange={(e) => {
                  setQuestionBody(e.target.value);
                }}
                cols="30"
                rows="10"
                onKeyPress={handleEnter}
              ></textarea>
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                type="text"
                id="ask-ques-tags"
                onChange={(e) => {
                  setQuestionTags(e.target.value.split(" "));
                }}
                placeholder="e.g. (xml typescript wordpress)"
              />
            </label>
          </div>
          <input
            type="submit"
            value="Reivew your question"
            className="review-btn"
          />
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
