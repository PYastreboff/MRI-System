import { useState } from "react";
import loginImg from "./loginImg.jpg";
import foodImg from "./food-icon.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMedkit, faUser, faQuestionCircle, faChevronDown, faKey } from '@fortawesome/free-solid-svg-icons';

import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import MriView from "./MriView";
import Help from "./Help";
import Users from "./Users"

import peopleData from "./peopleData";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState("null");
  const [currentPatient, setCurrentPatient] = useState("null");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      setLoggedIn(true);
      setUsername("");
      setPassword("");
      setPage("dashboard")
    } else {
      alert("Invalid credentials");
    }
  };


  if (!loggedIn) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-950 ">
        {/* Left: Login Form */}
        <div className="w-1/2 flex-col items-center items-center justify-center space-between">
          <form
            onSubmit={handleLogin}
            className=" p-8 w-full max-w-sm mx-auto"
          > 

            <h2 className="text-2xl mb-2 text-left text-white">Welcome 👋</h2>
            <h2 className="text-sm text-gray-400 mb-6 text-left font-extralight">Please login with your health username and password, to continue.</h2>
            <h2 className="text-sm text-white text-left mb-1">Username</h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full mb-4 px-4 py-2 rounded focus:outline-none text-white focus:ring  bg-gray-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <h2 className="text-sm text-white text-left mb-1">Password</h2>
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-2 px-4 py-2 rounded focus:outline-none text-white focus:ring bg-gray-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="#" className="text-sm mb-4 text-blue-500 hover:underline text-right flex flex-row-reverse">Forgot password?</a>
            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-white py-2 rounded-xl"
            >
              Sign In
            </button>
            <p className="text-sm text-gray-500 font-light text-center mt-8 mx-4">Don't you have an account? Please contact a system administrator</p>

          </form>
          <p className="text-sm text-gray-400 text-center mt-8 mx-4">© 2025 ALL RIGHTS RESERVED - McSmart Meal</p>
        </div>

        {/* Right: Image */}
        <div className="w-1/2 flex items-center justify-center p-6 bg-slate-950">
          <img
            src={loginImg}
            alt="Login Illustration"
            className="w-[90%] h-[90vh] shadow-lg rounded-2xl"
          />
        </div>
      </div>
    );
  }
  console.log(page);
  if (page === "dashboard") {
    return (
      <div className="flex-row flex">
        
        <Sidebar setLoggedIn={setLoggedIn} setPage={setPage} page={page} />
        <Dashboard peopleData={peopleData} setPage={setPage} setCurrentPatient={setCurrentPatient} />

      </div>
    );
  } else if (page === "mri") {
    return (
      <div className="flex-row flex">
        
        <Sidebar setLoggedIn={setLoggedIn} setPage={setPage} page={page}  />
        <MriView setPage={setPage} currentPatient={currentPatient} />

      </div>
    );
  } else if (page === "help") {
    return (
      <div className="flex-row flex">
        
        <Sidebar setLoggedIn={setLoggedIn} setPage={setPage} page={page}  />
        <Help setPage={setPage}/>

      </div>
    );
  } else if (page == "users") {
    return (
      <div className="flex-row flex">
        
        <Sidebar setLoggedIn={setLoggedIn} setPage={setPage} page={page}  />
        <Users setPage={setPage} currentPatient={currentPatient} people={peopleData} />

      </div>
    );
  } else {
    return (
      <p>Error.</p>
    );
  }
  
}

export default App;
