import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { useEffect, useState } from "react";
import { fetchAllQuestions } from "./actions/question";
import { useDispatch } from "react-redux";
import { fetchAllUsers } from "./actions/users";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const [slideIn, setSlideIn] = useState(true);

  // useEffect(() => {
  //   if (window.innerWidth <= 768) {
  //     setSlideIn(false);
  //     console.log(slideIn);
  //   } else {
  //     setSlideIn(true);
  //     console.log(slideIn);
  //   }
  // }, [window.innerWidth]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlideIn(false);
      } else {
        setSlideIn(true);
      }
    };

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSlideIn = () => {
    if (window.innerWidth <= 768) {
      setSlideIn((state) => !state);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="App">
      <Router>
        <Navbar handleSlideIn={handleSlideIn} />
        <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} />
      </Router>
    </div>
  );
}

export default App;
