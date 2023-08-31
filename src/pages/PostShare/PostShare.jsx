import React, { useState, useRef, useEffect } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";

import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/UploadAction";
import { postcloud, postvideocloud } from "../../api";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

import defaultProfile from "../../assets/defaultProfile.png";
import defaultCover from "../../assets/defaultCover.jpg";

const PostShare = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.authReducer.authData);
  console.log(user);

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const [desc, setDesc] = useState("");
  const [textareaHeight, setTextareaHeight] = useState("auto");

  const handleVideoPlay = () => {
    setVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setVideoPlaying(false);
  };

  const handleInputChange = (e) => {
    setDesc(e.target.value);
  };
  useEffect(() => {
    const textarea = document.getElementById("textarea");
    textarea.style.height = "auto";
    const newHeight = textarea.scrollHeight + "px";
    textarea.style.height = newHeight;
  }, [textareaHeight, desc]);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // handle Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
      event.target.value = null;
    }
  };

  //handle video change
  const onVideoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let vid = event.target.files[0];
      setVideo(vid);
      event.target.value = null;
    }
  };

  const imageRef = useRef();
  const videoRef = useRef();

  //handle post
  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    //post data
    const newPost = {
      userId: user.result._id,
      desc: desc,
    };

    // if there is an image with post
    if (image) {
      const formdata = new FormData();
      formdata.append("file", image);
      formdata.append("upload_preset", "user_posts");
      try {
        const response = await postcloud(formdata);
        newPost.image = response.data.url;
        console.log(response.data.url);
        console.log(newPost);
      } catch (error) {
        console.log(error);
      }
    }
    if (video) {
      const formdata = new FormData();
      formdata.append("file", video);
      formdata.append("upload_preset", "user_posts");
      try {
        const response = await postvideocloud(formdata);
        newPost.video = response.data.url;
        console.log(response.data.url);
      } catch (error) {
        console.log(error);
      }
    }
    if (image || video || desc) {
      dispatch(uploadPost(newPost)).then(() => {
        setLoading(false); // Set loading state to false after successful dispatch
        resetShare();
      });
    } else {
      alert("Enter a image or video or text to share....");
      setLoading(false);
    }
  };

  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    setVideo(null);
    setDesc("");
    setTextareaHeight("auto");
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Expired.. Login again");
      navigate("/Auth");
    } else {
      navigate(`/Socio/profile/${user.result._id}`);
    }
  };
  return (
    <div className="PostShare">
      <img
        src={
          user.result.profilePicture
            ? user.result.profilePicture
            : { defaultProfile }
        }
        alt="Profile"
        onClick={handleOnClick}
      />
      <div>
        <textarea
          id="textarea"
          value={desc}
          onChange={handleInputChange}
          style={{ height: textareaHeight }}
          placeholder="What's happening?"
        />

        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => {
              imageRef.current.click();
              setVideo(null);
            }}
          >
            <UilScenery />
            Photo
          </div>

          <div
            className="option"
            style={{ color: "var(--video)" }}
            onClick={() => {
              videoRef.current.click();
              setImage(null);
            }}
          >
            <UilPlayCircle />
            Video
          </div>
          {/* <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div> */}
          <button
            className="button ps-button"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "uploading" : "Share"}
          </button>

          <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onImageChange} />
          </div>
          <div style={{ display: "none" }}>
            <input type="file" ref={videoRef} onChange={onVideoChange} />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes
              onClick={() => setImage(null)}
              className="xmark"
              size="20"
            />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}
        {video && (
          <div className="previewImage">
            <UilTimes
              onClick={() => setVideo(null)}
              className="xmark"
              style={{
                color: "red",
                padding: "2px",
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            />
            <div className="video">
              {/* <ReactPlayer url={URL.createObjectURL(video)} controls={true} /> */}
              <video
                src={URL.createObjectURL(video)}
                controls
                width="100%"
                height="auto"
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onClick={() => {
                  if (!videoPlaying) {
                    setVideoPlaying(true);
                  }
                }}
                alt="preview"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
