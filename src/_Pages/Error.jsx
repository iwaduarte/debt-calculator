import React from "react";
import { Link, useRouteError } from "react-router-dom";
import style from "./Error.module.css";

const { errorPage } = style;

const Error = () => {
  const error = useRouteError();
  return (
    <div className={errorPage}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
      <Link to="/"> Return to Home</Link>
    </div>
  );
};

export default Error;
