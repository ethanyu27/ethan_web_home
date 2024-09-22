import React from 'react';
import './App.css';
import { About } from './About';
import { BeforeAfterGame } from './before_after_game/BeforeAfterGame';
import { Home } from './Home';
import { TabView } from './TabView';
import { TicTacToe } from './TicTacToe';

import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { WordAssasains } from "./party_game/WordAssasains";

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
    <Router>
      <Routes>
        <Route path="/" element={mainView}/>
        <Route path="/partygame" element={<WordAssasains/>}/>
      </Routes>
    </Router>
  );
}

export default App;
