import React, { useState } from "react";
import "./ProfileCard.css";
import ProfileModal from "../InfoCard/ProfileModal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import defaultProfile from "../../assets/defaultProfile.png";
import defaultCover from "../../assets/defaultCover.jpg";
const ProfileCard = ({ location }) => {
  const user = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            user.result.coverPicture
              ? user.result.coverPicture
              : "https://asset.cloudinary.com/djl0e0ryv/bd906b94bd097900480f02727ad1cf58"
          }
          alt="CoverImage"
        />
        <img
          src={
            user.result.profilePicture
              ? user.result.profilePicture
              : { defaultProfile }
          }
          alt="ProfileImage"
        />
      </div>
      <div className="ProfileName">
        <span>
          {user.result.firstname} {user.result.lastname}
        </span>
        <span>
          {user.result.worksAt ? user.result.worksAt : "Write about yourself"}
        </span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.result.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.result.following.length}</span>
            <span>Following</span>
          </div>
          {/* for profilepage */}
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {
                    posts.filter((post) => post.userId === user.result._id)
                      .length
                  }
                </span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        <span>
          <button className="edit" onClick={() => setModalOpened(true)}>
            Edit Profile
          </button>
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
            data={user.result}
          />
        </span>
      ) : (
        <span>
          <Link
            to={`/Socio/profile/${user.result._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
