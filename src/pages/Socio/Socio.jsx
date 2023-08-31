import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import PostSide from "../PostSide/PostSide";
import ProfileSide from "../profileSide/ProfileSide";
import "./Socio.css";
const Socio = ({ slideIn, handleSlideIn }) => {
  return (
    <div className="Home">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />

      <PostSide />
      <ProfileSide />
    </div>
  );
};

export default Socio;
