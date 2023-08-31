import React from "react";
import PostSide from "../PostSide/PostSide";
import ProfileCard from "../ProfileCard/ProfileCard";
import ProfileLeft from "../ProfileLeft/ProfileLeft";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";

import "./Profile.css";
const Profile = ({ slideIn, handleSlideIn }) => {
  return (
    <div className="Profile">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="Profile-center">
        <ProfileCard location="profilePage" />
        <PostSide />
      </div>
      <ProfileLeft />
    </div>
  );
};

export default Profile;
