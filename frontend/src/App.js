import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./views/Index";
import Movies from "./views/Movies";
import Genres from "./views/Genres";
import Casting from "./views/Casting";
class App extends Component {
  render() {
    const routes = [
      "/", //0
      "/movies",
      "/genres",
      "/casting",
    ];
    return (
      <BrowserRouter>
        <Routes>
          <Route path={routes[0]} element={<Index />} />
          <Route path={routes[1]} element={<Movies />} />
          <Route path={routes[2]} element={<Genres />} />
          <Route path={routes[3]} element={<Casting />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
export default App;
