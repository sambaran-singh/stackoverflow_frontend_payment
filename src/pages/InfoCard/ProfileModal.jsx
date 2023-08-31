import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "./ProfileModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { updateUser } from "../../actions/UserAction";
import { postcloud } from "../../api";

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const user = useSelector((state) => state.authReducer.authData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let UserData = formData;
    if (profileImage) {
      const formdata = new FormData();
      formdata.append("file", profileImage);
      formdata.append("upload_preset", "user_profile");
      try {
        const response = await postcloud(formdata);
        UserData.profilePicture = response.data.url;
        console.log(response.data.url);
        setModalOpened(false);
      } catch (error) {
        console.log(error);
      }
    }
    if (coverImage) {
      const data = new FormData();

      data.append("file", coverImage);
      data.append("upload_preset", "user_cover");

      try {
        const response = await postcloud(data);

        UserData.coverPicture = response.data.url;
        console.log(response.data.url);
        setModalOpened(false);
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(updateUser(param.id, UserData)).then(() => {
      setLoading(false);
      setModalOpened(false);
    });
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm" onSubmit={handleSubmit}>
        <h3>Your Info</h3>
        <div>
          <input
            value={formData.username}
            onChange={handleChange}
            type="text"
            placeholder="Username"
            name="username"
            className="infoInput"
          />
        </div>
        <div>
          <input
            value={formData.firstname}
            onChange={handleChange}
            type="text"
            placeholder="First Name"
            name="firstname"
            className="infoInput"
          />
          <input
            value={formData.lastname}
            onChange={handleChange}
            type="text"
            placeholder="Last Name"
            name="lastname"
            className="infoInput"
          />
        </div>

        <div>
          <input
            value={formData.worksAt}
            onChange={handleChange}
            type="text"
            placeholder="Works at"
            name="worksAt"
            className="infoInput"
          />
        </div>

        <div>
          <input
            value={formData.livesIn}
            onChange={handleChange}
            type="text"
            placeholder="Lives in"
            name="livesIn"
            className="infoInput"
          />
        </div>

        <div>
          Profile image
          <input type="file" name="profileImage" onChange={onImageChange} />
          Cover image
          <input type="file" name="coverImage" onChange={onImageChange} />
        </div>

        <button className="button infoButton" type="submit">
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </Modal>
  );
};

export default ProfileModal;
