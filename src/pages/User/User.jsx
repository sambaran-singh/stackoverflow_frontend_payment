import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";
import defaultProfile from "../../assets/defaultProfile.png";
const User = ({ person }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const user = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();

  const [following, setFollowing] = useState(
    person.followers.includes(user.result._id)
  );
  const handleFollow = () => {
    console.log(user.result);
    following
      ? dispatch(unfollowUser(person._id, user.result))
      : dispatch(followUser(person._id, user.result));
    setFollowing((prev) => !prev);
  };
  return (
    <div className="follower">
      <div>
        <img
          src={
            publicFolder + person.profilePicture
              ? person.profilePicture
              : { defaultProfile }
          }
          alt="profile"
          className="followerImage"
        />
        <div className="name">
          <span>{person.name}</span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
