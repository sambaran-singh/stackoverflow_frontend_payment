import React from "react";
import "./RightSidebar.css";
import pen from "../../assets/pen-solid.svg";
import comment from "../../assets/message-solid.svg";
const Widget = () => {
  return (
    <div className="widget">
      <h4>The Overflow BLog</h4>
      <div className="right-sidebar-div-1">
        <img src={pen} alt="pen" className="pen" />
        <div className="right-sidebar-div-2">
          <p>
            Observability is key to the future of software (and vour DevOps
            career)
          </p>
        </div>
      </div>
      <div className="right-sidebar-div-1">
        <img src={pen} alt="pen" className="pen" />
        <div className="right-sidebar-div-2">
          <p>Podcast 374: How valuable is vour screen name?</p>
        </div>
      </div>

      <h4>Featured on Meta</h4>

      <div className="right-sidebar-div-1">
        <img src={comment} alt="pen" className="pen" />
        <div className="right-sidebar-div-2">
          <p>
            Please welcome Valued Associates: #959 - V2Blast #959 - SpencerG
          </p>
        </div>
      </div>
      <div className="right-sidebar-div-1">
        <img src={comment} alt="pen" className="pen" />
        <div className="right-sidebar-div-2">
          <p>
            Outdated Answers' accepted answer is now unpinned on Stack Overflow
          </p>
        </div>
      </div>

      <h4>Hot Meta Post</h4>
      <div className="right-sidebar-div-1">
        <p>38</p>
        <div className="right-sidebar-div-2">
          <p>
            Why was this spam flag declined. yet the question marked as spam?
          </p>
        </div>
      </div>
      <div className="right-sidebar-div-1">
        <p>20</p>
        <div className="right-sidebar-div-2">
          <p>
            What is the best course of action when a user has high enough rep
            to...
          </p>
        </div>
      </div>

      <div className="right-sidebar-div-1">
        <p>17</p>
        <div className="right-sidebar-div-2">
          <p>Is a link to the "How to ask" help page a useful comment?</p>
        </div>
      </div>
    </div>
  );
};

export default Widget;
