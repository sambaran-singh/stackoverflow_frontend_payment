import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "./ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/index";
// import { logout } from "../../actions/AuthAction";

const InfoCard = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false);
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const user = useSelector((state) => state.authReducer.authData);

  const handleLogOut = () => {
    // dispatch(logout());
  };

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user.result._id) {
        setProfileUser(user.result);
      } else {
        console.log("fetching");
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
        console.log(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user.result._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user.result}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        <span>
          <b>Username </b>
        </span>
        <span style={{ color: "gray", paddingLeft: "5px" }}>
          {profileUser.username}
        </span>
      </div>

      <div className="info">
        <span>
          <b>Firstname </b>
        </span>
        <span style={{ color: "gray", paddingLeft: "5px" }}>
          {profileUser.firstname}
        </span>
      </div>
      <div className="info">
        <span>
          <b>Lastname </b>
        </span>
        <span style={{ color: "gray", paddingLeft: "5px" }}>
          {profileUser.lastname}
        </span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span style={{ color: "gray", paddingLeft: "5px" }}>
          {profileUser.livesIn}
        </span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span style={{ color: "gray", paddingLeft: "5px" }}>
          {profileUser.worksAt}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
