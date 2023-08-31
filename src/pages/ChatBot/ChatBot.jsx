import React from "react";
import { useSelector } from "react-redux";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Bot from "../Bot/Bot";
import OTPGenerationPage from "../OTPGeneration/OTPGenerationPage";

const ChatBot = ({ slideIn, handleSlideIn }) => {
  const user = useSelector((state) => state.authReducer.authData);

  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-3">
        {user.result.verified ? <Bot /> : <OTPGenerationPage />}
      </div>
    </div>
  );
};

export default ChatBot;
