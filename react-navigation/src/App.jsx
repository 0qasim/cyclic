import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Project from "./pages/Projects";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navigation from "./Components/Navigation/Navigation.jsx";
import Signup from "./Signup";
import Signin from "./Signin";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const userContext = createContext();

const App = () => {
  const [user, setUser] = useState({});
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("/")
      .then((user) => {
        console.log(user.data); // Check if user data is received correctly
        setUser(user.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <userContext.Provider value={user}>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Signin" element={<Signin />} />

            <Route exact path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Projects" element={<Project />} />
            <Route path="/Contact" element={<Contact />} />
          </Routes>
        </Router>
      </userContext.Provider>
    </div>
  );
};

export default App;
