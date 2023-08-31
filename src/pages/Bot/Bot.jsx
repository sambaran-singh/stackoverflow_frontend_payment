import React from "react";
import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Bot.css";
const Bot = () => {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const responseContainerRef = useRef(null);
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [isResized, setIsResized] = useState(false);
  const user = useSelector((state) => state.authReducer.authData);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const textarea = document.getElementById("textarea");
    textarea.style.height = "auto";
    const newHeight = textarea.scrollHeight + "px";
    textarea.style.height = newHeight;
  }, [textareaHeight, message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch("https://stackoverflow-test.onrender.com/chatbot/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        const newResponse = {
          question: message,
          answer: data.message.content,
        };
        setResponses([...responses, newResponse]);
      })
      .catch((error) => console.log(error));
    setLoading(false);
    setMessage("");
  };

  // Scroll to the bottom of the response container when new responses are added
  useEffect(() => {
    if (responseContainerRef.current) {
      responseContainerRef.current.scrollTop =
        responseContainerRef.current.scrollHeight;
    }
  }, [responses]);

  return (
    <div className="App">
      <div className="response-container" ref={responseContainerRef}>
        {responses.map((response, index) => (
          <div key={index} className="response">
            <div
              className="user"
              style={{
                display: "flex",
                gap: "10px",
                fontWeight: "bold",
                fontSize: "13px",
              }}
            >
              <h4>{user.result.name} : </h4>
              <pre className="question">{response.question}</pre>
            </div>

            <pre className="answer">{response.answer}</pre>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <textarea
          id="textarea"
          value={message}
          onChange={handleInputChange}
          placeholder="Heyy I am here to help your coding troubles."
          className="textarea"
          style={{ height: textareaHeight }}
        ></textarea>
        <button type="submit" disabled={loading}>
          {loading ? "Processsing" : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Bot;
