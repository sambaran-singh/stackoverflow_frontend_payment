import React, { useState } from "react";
import Logo from "../../assets/icon.png";
import "./LogoSearch.css";
import { UilSearch } from "@iconscout/react-unicons";
import SearchModal from "../SearchModal/SearchModal";
const LogoSearch = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="LogoSearch">
      <img src={Logo} alt="" />
      <div className="Search">
        <input
          type="text"
          placeholder="#Explore"
          onClick={(e) => {
            setModalOpened(true);
          }}
        />
        <SearchModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
        />

        <div className="s-icon">
          <UilSearch />
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
