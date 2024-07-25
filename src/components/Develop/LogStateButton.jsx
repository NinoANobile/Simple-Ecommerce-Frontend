import React from "react";
import { useSelector } from "react-redux";

const LogStateButton = () => {
  const state = useSelector((state) => state); // Accede a todo el estado

  const handleLogState = () => {
    console.log(state); // Consologuea el estado actual
  };

  return <button onClick={handleLogState}>Log State</button>;
};

export default LogStateButton;
