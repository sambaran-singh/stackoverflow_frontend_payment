// import React, { useState, useEffect } from "react";
// import "./Post.css";

// import Heart from "../../assets/heart-solid.svg";
// import NotLike from "../../assets/heart-regular.svg";
// import { likePost } from "../../api/index";
// import { useSelector } from "react-redux";
// import ReactPlayer from "react-player";

// const Post = ({ data }) => {
//   const user = useSelector((state) => state.authReducer.authData);
//   const allusers = useSelector((state) => state.usersReducer);
//   const [liked, setLiked] = useState(data.likes.includes(user.result._id));
//   const [likes, setLikes] = useState(data.likes.length);
//   const [User, setUser] = useState("");
//   const [dp, setDp] = useState("");

//   useEffect(() => {
//     username();
//   }, [allusers]);
//   const username = () => {
//     const userFound = allusers.find((user) => user._id === data.userId);
//     console.log(userFound);
//     if (userFound) {
//       setUser(userFound.username);
//       setDp(userFound.profilePicture);
//     }
//   };
//   const handleLike = () => {
//     likePost(data._id, user.result._id);
//     setLiked((prev) => !prev);
//     liked ? setLikes(likes - 1) : setLikes(likes + 1);
//   };
//   const bgcolor = `rgba(40, 52, 62, 0.07)`;
//   return (
//     <div className="Post">
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <img src={dp} alt="" width="30px" style={{ borderRadius: "50%" }} />
//         {User && <h5>@{User}</h5>}
//       </div>
//       {data.image ? (
//         <img src={data.image} alt="" />
//       ) : data.video ? (
//         <div className="video">
//           {/* <ReactPlayer
//             url={data.video}
//             controls={true}
//             style={{
//               alignSelf: "center",
//               backgroundColor: "lightgray",
//               width: "100%",
//               borderRadius: "0.5rem",
//               height: "fit-content",
//               justifyContent: "center",
//             }}
//           /> */}
//           <iframe
//             src={data.video}
//             allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen={false}
//             sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
//             width="100%"
//             height="500px"
//           ></iframe>
//         </div>
//       ) : (
//         <p style={{ whiteSpace: "pre-wrap" }}>{data.desc}</p>
//       )}

//       <div className="postReact">
//         <img
//           src={liked ? Heart : NotLike}
//           alt="Like"
//           style={{ cursor: "pointer" }}
//           onClick={handleLike}
//         />
//       </div>

//       <span style={{ color: "var(--gray)", fontSize: "12px" }}>
//         {likes} likes
//       </span>
//       {data.image || data.video ? (
//         <div className="detail">
//           <span>
//             <b>{data.name} </b>
//           </span>
//           <span>{data.desc}</span>
//         </div>
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// };

// export default Post;

import React, { useState, useEffect } from "react";
import "./Post.css";

import Heart from "../../assets/heart-solid.svg";
import NotLike from "../../assets/heart-regular.svg";
import { likePost } from "../../api/index";
import { useSelector } from "react-redux";

const Post = ({ data }) => {
  const user = useSelector((state) => state.authReducer.authData);
  const allusers = useSelector((state) => state.usersReducer);
  const [liked, setLiked] = useState(data.likes.includes(user.result._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [User, setUser] = useState("");
  const [dp, setDp] = useState("");
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    username();
  }, [allusers]);

  const username = () => {
    const userFound = allusers.find((user) => user._id === data.userId);
    console.log(userFound);
    if (userFound) {
      setUser(userFound.username);
      setDp(userFound.profilePicture);
    }
  };

  const handleLike = () => {
    likePost(data._id, user.result._id);
    setLiked((prev) => !prev);
    liked ? setLikes(likes - 1) : setLikes(likes + 1);
  };

  const handleVideoPlay = () => {
    setVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setVideoPlaying(false);
  };

  return (
    <div className="Post">
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={dp} alt="" width="30px" style={{ borderRadius: "50%" }} />
        {User && <h5>@{User}</h5>}
      </div>
      {data.image ? (
        <img src={data.image} alt="" />
      ) : data.video ? (
        <div className="video">
          <video
            src={data.video}
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
          />
        </div>
      ) : (
        <p style={{ whiteSpace: "pre-wrap" }}>{data.desc}</p>
      )}

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt="Like"
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      {data.image || data.video ? (
        <div className="detail">
          <span>
            <b>{data.name} </b>
          </span>
          <span>{data.desc}</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Post;
