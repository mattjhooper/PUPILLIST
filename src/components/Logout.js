import React from "react";

function Logout(props) {
  const logoutHandler = () => {
    props.onLogout();
  };

  return (
    <section>
      <button onClick={logoutHandler}>Logout</button>
    </section>
  );
}

export default Logout;
