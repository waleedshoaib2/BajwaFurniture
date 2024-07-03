import React from "react";
import Testing from "./Testing";
import Main from "../AdminDashboard/Graph";

const Testdashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <Testing />
      <div style={{ flex: "1", padding: "20px" }}>
        <Main />
      </div>
    </div>
  );
};

export default Testdashboard;
