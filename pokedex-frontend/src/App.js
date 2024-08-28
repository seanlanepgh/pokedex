import logo from './logo.svg';
import './App.css';
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Pokedex from "./components/Pokedex/Pokedex";
import PokemonDetail from "./components/PokemonDetail/PokemonDetail";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";
import { ThemeProvider } from '@emotion/react';
import PokeTheme from './PokeTheme';
//import ProtectedRoutes from './ProtectedRoutes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={PokeTheme}>
      <Routes>
          {/* <Route element={<ProtectedRoutes />}> */}
            {" "}
            {/* Pokedex routes */}
            <Route
              path="/pokedex/detail/:id"
              exact
              element={<PokemonDetail/>}
            />
            <Route path="/pokedex" exact element={<Pokedex/>} />
            <Route
              path="/pokedex/page/:page"
              exact
              element={<Pokedex/>}
            />
            <Route
              path="/pokedex/page/:page/:query"
              exact
              element={<Pokedex/>}
            />
          {/* </Route> */}
          <Route path="/" exact element={<Home/>} />
          <Route path="/login" exact element={<Login/>} />
          <Route path="/register" exact  element={<Register/>} />
      
          <Route path="/*" element={<NotFound/>} />
        </Routes>
        </ThemeProvider> 
        </BrowserRouter>  
    </div>
  );
}

export default App;
