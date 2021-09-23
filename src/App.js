import React, { useState } from "react";
import Loader from "react-loader-spinner";

import Login from "./components/Login";
import Logout from "./components/Logout";
import "./App.css";
import Pupils from "./components/Pupils";

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

  return (
    <React.Fragment>
      {token ? (
        <React.Fragment>
          <Logout onLogout={logoutHandler} />
          <Pupils token={token} />
        </React.Fragment>
      ) : (
        <Login
          defaultUsername="matt@example.com"
          defaultPassword="Password#123"
          onLogin={loginHandler}
        />
      )}
    </React.Fragment>
  );
}

export default App;
