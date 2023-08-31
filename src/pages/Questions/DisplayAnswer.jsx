import React from "react";
import moment from "moment";
import copy from "copy-to-clipboard";
import { Link, useLocation, useParams } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { deleteAnswer } from "../../actions/question";
const DisplayAnswer = ({ question }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const url = "https://stackoverflow-trial.netlify.app";

  const user = useSelector((state) => state.currentUserReducer);
  const handleShare = () => {
    copy(url + location.pathname);
    alert(`Link copied \n url : ${url + location.pathname} `);
  };

  const handleDelete = (answerId, noOfAnswers) => {
    dispatch(deleteAnswer(id, answerId, noOfAnswers));
  };
  return (
    <div>
      {question.answer.map((ans) => (
        <div className="display-ans" key={ans._id}>
          <p>{ans.answerBody}</p>
          <div className="question-actions-user">
            <div>
              <button type="button" onClick={handleShare}>
                Share
              </button>
              {user?.result?._id === ans.userId && (
                <button
                  type="button"
                  onClick={() => handleDelete(ans._id, question.noOfAnswers)}
                >
                  Delete
                </button>
              )}
            </div>
            <div>
              <p>answered {moment(ans.answeredOn).fromNow()}</p>
              <Link to={`/Users/${ans.userId}`} className="user-link">
                <Avatar backgroundColor="orange" px="5px" py="5px">
                  {ans.userAnswered.charAt(0).toUpperCase()}
                </Avatar>
                <div>{ans.userAnswered}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayAnswer;
