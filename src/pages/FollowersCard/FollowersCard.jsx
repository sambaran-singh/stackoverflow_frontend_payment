import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import { getAllUser, searchUser } from "../../api/index";
import FollowersModal from "../FollowersModal/FollowersModal";
import User from "../User/User";

import { useSelector } from "react-redux";
const FollowersCard = ({ location }) => {
  const [modalOpened, setModalOpened] = useState(false);

  const [persons, setPersons] = useState([]);
  const user = useSelector((state) => state.authReducer.authData);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);

  console.log(persons);
  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>;
      {persons.map((person, id) => {
        if (person._id !== user.result._id)
          return <User person={person} key={id} />;
      })}
      {!location ? (
        <span onClick={() => setModalOpened(true)}>Show more</span>
      ) : (
        ""
      )}
      <FollowersModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />
    </div>
  );
};

export default FollowersCard;
