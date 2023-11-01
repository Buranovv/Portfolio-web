import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "./index";
import Footer from "./Footer";

const FrontLayout = () => {
  return (
    <Fragment>
      <Header />
      <main className="userMain">
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  );
};

export default FrontLayout;
