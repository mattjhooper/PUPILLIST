import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";

import PupilsList from "./PupilList";
import PupilActions from "./PupilActions";
import "./Pupils.css";

const loader = (
  <Loader
    type="ThreeDots"
    color="#230052"
    height={100}
    width={100}
    timeout={3000} //3 secs
  />
);

function Pupils(props) {
  const token = props.token;

  const [pupils, setPupils] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  /*
  const loginInfo = {
    email: "matt@example.com",
    password: "Password#123"
  };
*/

  useEffect(() => {
    console.log("useEffect");
    fetchPupilsHandler();
  }, []);

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
      {token && <PupilActions onFetchPupils={fetchPupilsHandler} />}
      <section>{content}</section>
    </React.Fragment>
  );
}

export default Pupils;
