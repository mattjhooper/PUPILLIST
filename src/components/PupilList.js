import React from "react";

import Pupil from "./Pupil";
import classes from "./PupilList.module.css";

const PupilList = (props) => {
  return (
    <ul className={classes["pupils-list"]}>
      {props.pupils.map((pupil) => (
        <Pupil
          key={pupil.id}
          name={pupil.name}
          startDate={pupil.startDate}
          accountBalance={pupil.accountBalance}
          contactEmail={pupil.contactEmail}
        />
      ))}
    </ul>
  );
};

export default PupilList;
