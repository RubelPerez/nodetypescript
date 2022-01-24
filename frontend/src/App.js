import React, { Component } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Index from './views/Index'
import Movies from './views/Movies'

class App extends Component {

  render() {
    const routes = [
      "/",//0
      "/peliculas"

    ];
    return (
      <BrowserRouter>
        <Routes>
          <Route path={routes[0]} element={<Index />} />
          <Route path={routes[1]} element={<Movies />} />
        </Routes>
      </BrowserRouter>
    )
  }
}
export default App;
