import React, { useRef, useState } from "react";
import classes from "./Login.module.css";

const isEmpty = (value) => value.trim() === "";

const Login = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    username: true,
    password: true
  });

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const loginHandler = (event) => {
    event.preventDefault();

    const usernameIsValid = !isEmpty(usernameInputRef.current.value);
    const passwordIsValid = !isEmpty(passwordInputRef.current.value);

    setFormInputsValidity({
      username: usernameIsValid,
      password: passwordIsValid
    });

    const formIsValid = usernameIsValid && passwordIsValid;

    if (!formIsValid) {
      return;
    }

    console.log("send username and password");
    const loginInfo = {
      email: usernameInputRef.current.value,
      password: passwordInputRef.current.value
    };

    props.onLogin(loginInfo);
  };

  const usernameControlClasses = `${classes.control} ${
    formInputsValidity.username ? "" : classes.invalid
  }`;
  const passwordControlClasses = `${classes.control} ${
    formInputsValidity.password ? "" : classes.invalid
  }`;

  return (
    <section>
      <form className={classes.form} onSubmit={loginHandler}>
        <div className={usernameControlClasses}>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="username"
            ref={usernameInputRef}
            defaultValue={props.defaultUsername}
          />
          {!formInputsValidity.username && <p>Please enter a username!</p>}
        </div>
        <div className={passwordControlClasses}>
          <label htmlFor="street">Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            defaultValue={props.defaultPassword}
          />
          {!formInputsValidity.password && <p>Please enter a password!</p>}
        </div>
        <button className={classes.submit}>Login</button>
      </form>
    </section>
  );
};

export default Login;
