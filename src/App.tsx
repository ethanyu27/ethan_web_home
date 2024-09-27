import React from 'react';
import './App.css';
import { About } from './About';
import { BeforeAfterGame } from './before_after_game/BeforeAfterGame';
import { Home } from './Home';
import { TabView } from './TabView';
import { TicTacToe } from './TicTacToe';

import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import { WordAssassins } from "./party_game/WordAssassins";

function App() {

  const mainView = (<TabView
    tabs={[
      {title: "Home", component: <Home/>},
      {title: "About Me", component: <About/>},
      {title: "Play Tic-Tac-Toe", component: <TicTacToe/>, spacing: 2},
      {title: "Puzzle Game", component: <BeforeAfterGame/>}
    ]}
  />);

  return (
    <HashRouter>
      <Routes>
        <Route path="/partygame" element={<WordAssassins/>}/>
        <Route path="/" element={mainView}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
