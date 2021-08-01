import React from "react";

function PupilActions(props) {
  const fetchPupilsHandler = () => {
    props.onFetchPupils();
  };

  return (
    <section>
      <button onClick={fetchPupilsHandler}>Fetch Pupils</button>
    </section>
  );
}

export default PupilActions;
