import React from "react";

import classes from "./Pupil.module.css";

const Pupil = (props) => {
  return (
    <li className={classes.pupil}>
      <h2>{props.name}</h2>
      <h3>{props.startDate}</h3>
      <h3>{props.accountBalance}</h3>
      <p>{props.contactEmail}</p>
    </li>
  );
};

export default Pupil;
