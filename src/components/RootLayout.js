import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./ui/Navigation";
import { Container } from "semantic-ui-react";

const RootLayout = () => {
  return (
    <>
      <Navigation />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default RootLayout;
