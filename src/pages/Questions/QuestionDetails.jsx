import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import copy from "copy-to-clipboard";
import { useLocation } from "react-router-dom";
import up from "../../assets/circle-chevron-up-solid.svg";
import colourup from "../../assets/circle-chevron-up-solid-copy.svg";
import colourdown from "../../assets/circle-chevron-down-solid-copy.svg";

import down from "../../assets/circle-chevron-down-solid.svg";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswer from "./DisplayAnswer";
import "./Question.css";
import { useDispatch, useSelector } from "react-redux";
import {
  postAnswer,
  deleteQuestion,
  voteQuestion,
} from "../../actions/question";
import { useEffect } from "react";
import { setCurrentUser } from "../../actions/currentUser";
import moment from "moment";

const QuestionDetails = () => {
  const { id } = useParams();

  const questionsList = useSelector((state) => state.questionsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Answer, setAnswer] = useState("");

  const user = useSelector((state) => state.currentUserReducer);

  useEffect(() => {
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [dispatch]);
  const handlePostAnswer = (e, answerLength) => {
    e.preventDefault();
    if (user === null) {
      alert("Login to Answer !");
      navigate("/Auth");
    } else {
      if (Answer === "") {
        alert(" Thw answer cant be empty !");
      } else {
        // const user1 = user.result.name;
        // console.log(user1);
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLength,
            answerBody: Answer,
            userAnswered: user.result.name,
            userId: user.result?._id,
          })
        );
      }
    }
  };

  const location = useLocation();
  const url = "https://stackoverflow-basic.netlify.app";
  const handleShare = () => {
    copy(url + location.pathname);
    alert(`Link copied \n url : ${url + location.pathname} `);
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(id, navigate));
  };

  const handleUpVote = () => {
    if (!user) {
      alert("Login to vote...");
      navigate("/Auth");
    } else {
      dispatch(voteQuestion(id, "upvote", user.result._id));
    }
  };
  const handleDownVote = () => {
    if (!user) {
      alert("Login to vote...");
      navigate("/Auth");
    } else {
      dispatch(voteQuestion(id, "downvote", user.result._id));
    }
  };

  return (
    <div className="question-detail-page">
      {questionsList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionsList.data
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img
                        src={
                          question.upVote.includes(user?.result._id)
                            ? colourup
                            : up
                        }
                        alt="up-arrow"
                        width="20"
                        className="votes-icon"
                        onClick={handleUpVote}
                      />
                      <p>{question.upVote.length - question.downVote.length}</p>
                      <img
                        src={
                          question.downVote.includes(user.result._id)
                            ? colourdown
                            : down
                        }
                        alt="down-arrow"
                        width="20"
                        className="votes-icon"
                        onClick={handleDownVote}
                      />
                    </div>

                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
                        {question.questionTags.map((tag) => (
                          <p>{tag} </p>
                        ))}
                      </div>
                      <div className="question-actions-user">
                        <div>
                          <button type="button" onClick={handleShare}>
                            Share
                          </button>
                          {user?.result?._id === question.userId && (
                            <button type="button" onClick={handleDelete}>
                              Delete
                            </button>
                          )}
                        </div>
                        <div className="ask">
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link
                            to={`/Users/${question.userId}`}
                            className="user-link"
                          >
                            <Avatar backgroundColor="orange" px="5px" py="5px">
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} Answers</h3>
                    <DisplayAnswer key={question._id} question={question} />
                  </section>
                )}
                <section className="post-ans-container">
                  <h3>Your Answer</h3>
                  <form
                    onSubmit={(e) =>
                      handlePostAnswer(e, question.answer.length)
                    }
                  >
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <br />
                    <input
                      type="submit"
                      className="post-ans-btn"
                      value="Post your Answer"
                    ></input>
                  </form>
                  <p>
                    Not the answer you're looking for? Browse other questions
                    Tagged
                    {question.questionTags.map((tag) => (
                      <Link to="/Tags" key={tag} className="ans-tags">
                        {" "}
                        {tag}{" "}
                      </Link>
                    ))}
                    <br />
                    or
                    <br />{" "}
                    {
                      <Link
                        to="/AskQuestion"
                        style={{ textDecoration: "none", color: "#009dff" }}
                      >
                        ask your own question
                      </Link>
                    }
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default QuestionDetails;
