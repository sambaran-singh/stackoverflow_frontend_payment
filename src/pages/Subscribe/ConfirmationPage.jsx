// import React, { useState } from "react";
// import { Modal, useMantineTheme } from "@mantine/core";
// import FollowersCard from "../FollowersCard/FollowersCard";

// const ConfirmationPage = ({ modalOpened, setModalOpened }) => {
//   const theme = useMantineTheme();

//   return (
//     <Modal
//       overlayColor={
//         theme.colorScheme === "dark"
//           ? theme.colors.dark[9]
//           : theme.colors.gray[2]
//       }
//       overlayOpacity={0.55}
//       overlayBlur={3}
//       size="55%"
//       opened={modalOpened}
//       onClose={() => setModalOpened(false)}
//     >
//       <h2>Payment Successful!</h2>
//       <p>Your payment has been successfully processed.</p>
//     </Modal>
//   );
// };

import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "./ConfirmationPage.css";
const ConfirmationPage = ({ modalOpened, setModalOpened, type }) => {
  const theme = useMantineTheme();

  const handleCloseModal = () => {
    setModalOpened(false);
  };
  const navigate = useNavigate();
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
      onClose={handleCloseModal}
      closeButton={<button onClick={handleCloseModal}>Close</button>}
      padding="40px"
    >
      <div className="modal-content">
        <h2>Payment Successful!</h2>
        <p>
          🎉Congratulations you have activated <b>{type}</b> membership🎉
          <br />
          {type === "Silver"
            ? "You can post 5 questions a day!"
            : "There is no limit to ask questions"}
        </p>
        <p>Your payment has been successfully processed.</p>
        <button
          className="back-button"
          onClick={() => {
            handleCloseModal();
            navigate("/");
          }}
        >
          Back to Home
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationPage;
