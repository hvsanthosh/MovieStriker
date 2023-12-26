import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Toaster />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
