import React from 'react';
import './App.css';
import { About } from './About';
import { BeforeAfterGame } from './before_after_game/BeforeAfterGame';
import { Home } from './Home';
import { TabView } from './TabView';
import { TicTacToe } from './TicTacToe';


function App() {

  return (
    <TabView
      tabs={[
        {title: "Home", component: <Home/>},
        {title: "About Me", component: <About/>},
        {title: "Play Tic-Tac-Toe", component: <TicTacToe/>, spacing: 2},
        {title: "Puzzle Game", component: <BeforeAfterGame/>}
      ]}
    />
  );
}

export default App;
