import React from "react";
import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <div className="py-5 my-5 mx-auto text-center">
      <h1>Error 404</h1>
      <h1>Page Not found</h1>
      <Link to={"/"}>
        <button className="btn btn-outline-success">go to home</button>
      </Link>
    </div>
  );
}
