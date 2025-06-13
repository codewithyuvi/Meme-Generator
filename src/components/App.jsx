// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Cards from "./Cards";
import EditMeme from "./EditMeme";

export default function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="/edit-meme" element={<EditMeme />} />
        <Route path="/cards" element={<Cards />} />
      </Routes>

      <Footer />
    </Router>
  );
}
