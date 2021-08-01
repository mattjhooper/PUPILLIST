import React from "react";
import Loader from "react-loader-spinner";

import PupilsList from "./components/PupilList";
import PupilActions from "./components/PupilActions";
import Login from "./components/Login";
import Logout from "./components/Logout";
import "./App.css";
import { useState } from "react";

const loader = (
  <Loader
    type="ThreeDots"
    color="#230052"
    height={100}
    width={100}
    timeout={3000} //3 secs
  />
);

function App() {
  const [token, setToken] = useState(null);
  const [pupils, setPupils] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  /*
  const loginInfo = {
    email: "matt@example.com",
    password: "Password#123"
  };
*/

  const logoutHandler = () => {
    console.log("Logout");
    setPupils([]);
    setToken(null);
  };

  const loginHandler = async (loginInfo) => {
    console.log("loginInOutHandler");

    if (token) {
      console.log("Logged In already, so logout");
      setPupils([]);
      setToken(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://localhost:5001/AuthManagement/Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(loginInfo)
        }
      );
      const data = await response.json();

      console.log(data);

      if (data.result) {
        setToken(data.token);
      } else {
        setError(data.errors.join(" "));
      }
    } catch (error) {
      console.log("In catch: ", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPupilsHandler = async () => {
    console.log("fetchPupilsHandler");

    if (!token) {
      alert("Please Login");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://localhost:5001/Pupils/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      setPupils(data);

      console.log(data);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  let content = <p>Found no pupils.</p>;

  if (pupils.length > 0) {
    content = <PupilsList pupils={pupils} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = loader;
  }

  return (
    <React.Fragment>
      {token ? (
        <Logout onLogout={logoutHandler} />
      ) : (
        <Login
          defaultUsername="matt@example.com"
          defaultPassword="Password#123"
          onLogin={loginHandler}
        />
      )}
      {token && <PupilActions onFetchPupils={fetchPupilsHandler} />}
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
