import React from "react";
import Header from "../components/header/header";

function UserLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default UserLayout;
