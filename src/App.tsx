import React from 'react';
import { TicTacToe } from './TicTacToe';
import './App.css';
import {Home} from './Home';
import {TabView} from './TabView';


function App() {

  return (
    <TabView
      tabs={[
        {title: "Home", component: <Home/>},
        {title: "Play Tic-Tac-Toe", component: <TicTacToe/>, spacing: 3},
        {title: "Random tab", component: <div><p>Random tab</p></div>}
      ]}
    />
  );
}

export default App;
