import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Movie from "./components/MovieCard";
import Footer from "./components/Footer";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Movie />
      <Footer />
    </>
  );
}

export default App;
