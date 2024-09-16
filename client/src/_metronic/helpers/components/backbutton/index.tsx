import React from "react";
import { KTIcon } from "../KTIcon";
import { useNavigate } from "react-router-dom";

const BackButton = () => {

  const navigate = useNavigate();
  //get fist part of the url
  const url = window.location.pathname.split("/")[1];
  return (
    <button
      className="btn btn-secondary btn-sm me-2 mb-2 hover-elevate-down"
      onClick={() => navigate(`/${url}/view`)}
    >
      <KTIcon iconName="arrow-left" />
      Regresar
    </button>
  );
}

export default BackButton;