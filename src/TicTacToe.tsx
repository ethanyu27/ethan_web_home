import React from 'react';
import './App.css';

export function TicTacToe() {

  // Enums for game state
  enum gs {GAMEOVER, PLAYERMOVE, BOTMOVE};

  // Interface for game solver tree
  interface SolveTree {
    gameStateNum: number,
    opponentMove?: number,
    optimal?: number,
    wins: number,
    loss: boolean,
    nextMoves?: (SolveTree|undefined)[]
  };


  const emptyGrid = [["_","_","_"], ["_","_","_"], ["_","_","_"]];
  const defaultText = "Play Tic-Tac-Toe!";
  
  const [gameText, setGameText] = React.useState<string>(defaultText);
  const [gridVals, setGridVals] = React.useState<string[][]>(emptyGrid);
  const [gameState, setGameState] = React.useState<gs>(gs.PLAYERMOVE);
  const [turns, setTurns] = React.useState<number>(0);
  const [gameTree, setGameTree] = React.useState<SolveTree>();


  React.useEffect(() => {
    if (turns === 9) endGame("No one");
  }, [turns]);

  React.useEffect(() => {
    if (turns < 9 && gameState === gs.BOTMOVE) bot_move();
  }, [gameState]);


  // Change from x,y coordinates to single row index (0-indexed)
  const coordToNum = (i: number, j: number) => i * 3 + j;
  // const numToCoord = (num: number) => {return {i: Math.floor((num - 1) / 3), j: (num - 1) % 3}}

  const changeGridVal = (i: number, j: number, newVal: string, grid = gridVals) => grid.map((arr, vi) => vi !== i ? arr : arr.map((val, vj) => vj !== j ? val : newVal));
  
  // Reset Game board
  const reset = () => {
    setGridVals(emptyGrid);
    setGameState(gs.PLAYERMOVE);
    setGameText(defaultText);
    setTurns(0);
  }

  // Handle end of game
  const endGame = (winner: string) => {
    setGameState(gs.GAMEOVER);
    setGameText(winner + " win" + (winner === "You" ? "!" : "s!"));
  }

  // Convert game grid into a number representing the current game state
  const gridToNum = (grid: string[][]) => {
    const row = [...grid[0], ...grid[1], ...grid[2]];
    const rowNums = row.map(item => item === "X" ? 1 : item === "O" ? 2 : 0);
    return Number(rowNums.join(""));
  }

  // Convert game state number into 2D grid
  const numToGrid = (num: number) => {
    const row = String(num).padStart(9, "0").split("");
    const rowChars = row.map(item => item === "1" ? "X" : item === "2" ? "O" : "_");
    return [rowChars.slice(0,3), rowChars.slice(3,6), rowChars.slice(6,9)];
  }

  // Update value in game grid
  const updateNum = (num: number, pos: number, value: string) => {
    const updateVal = value === "X" ? "1" : value === "O" ? "2" : "0";
    const arr = String(num).padStart(9, "0").split("");
    arr[pos] = updateVal;
    return Number(arr.join(""));
  }


  // Calls the recursive game tree calculation function
  const calculate_tree = (first: number) => {
    let stateSim = gridToNum(gridVals);
    const tree = populate_tree(first, stateSim, 1);
    setGameTree(tree);
  }

  // Recursively iteraates and prunes game tree for optimal play
  const populate_tree = (move: number, stateSim: number, iteration: number): SolveTree => {
    // Update and convert new game state
    const newState = updateNum(stateSim, move, "X");
    const arr = String(newState).padStart(9, "0").split("").map(s => Number(s));

    // Handle end-of-game conditions (Base case)
    const loss = calculate_win_num(newState, "X");
    if (iteration === 5 || loss) return { gameStateNum: newState, loss: loss, wins: 0 }

    const options = arr.map((v, i) => [v, i]).filter(v => v[0] === 0).map(v => v[1]);
    const tree: SolveTree = {opponentMove: move, gameStateNum: newState, optimal: options[0], loss: true, wins: 0};

    // Iterate through each computer option
    options.forEach(opt => {
      const opponentMoves = Array<SolveTree | undefined>(9);
      const candidateState = updateNum(newState, opt, "O");
      const remainingOptions = options.filter(o => o !== opt);
      let wins = 0;
      let loss = false;

      if (calculate_win_num(candidateState, "O")) {
        // If computer move results in a win condition, wins are weighted by the number of
        // moves the opponent would have been able to make
        wins = remainingOptions.length;
      } else {
        // If the game continues, iterate through opponent options
        remainingOptions.forEach(ro => { 
          // A loss means the option will eventually be pruned, so there is no need to continue
          if (!loss) {
            // Recursively calculate the next iteration of the game tree and populate results
            const nextTree = populate_tree(ro, candidateState, iteration + 1);
            if (nextTree.loss) loss = true;
            opponentMoves[ro] = nextTree;
          }
         });
         // Calculate the number of win conditions for the option branch
         opponentMoves.forEach(om => wins += om?.wins ?? 0);
      }

      // Prune if loss, record optimal data if it is an optimal solution
      if (!loss && wins >= tree.wins) {
        tree.wins = wins;
        tree.loss = false;
        tree.optimal = opt;
        tree.nextMoves = opponentMoves;
      }
    });

    // Return calculated tree
    return tree;
  }

  // Determine, given a grid state, if a move results in a player winning
  const calculate_win = (i: number, j: number, val: string, grid = gridVals): boolean => {
    const upGrid = changeGridVal(i, j, val, grid);
    if (upGrid[i][0] === val && upGrid[i][1] === val && upGrid[i][2] === val) return true;
    if (upGrid[0][j] === val && upGrid[1][j] === val && upGrid[2][j] === val) return true;
    const coordNum = coordToNum(i, j) + 1;
    if ([1,5,9].includes(coordNum) && upGrid[0][0] === val && upGrid[1][1] === val && upGrid[2][2] === val) return true;
    if ([3,5,7].includes(coordNum) && upGrid[0][2] === val && upGrid[1][1] === val && upGrid[2][0] === val) return true;
    return false;
  }

  // Determine, given a number grid state, if a player has won
  const calculate_win_num = (gStateNum: number, player: string): boolean => {
    const arr = String(gStateNum).padStart(9, "0").split("");
    const val = player === "X" ? "1" : "2";
    return (
      (arr[0] === val && ((arr[1] === val && arr[2] === val) || (arr[3] === val && arr[6] === val) || (arr[4] === val && arr[8] === val)))
      || (arr[4] === val && ((arr[1] === val && arr[7] === val) || (arr[2] === val && arr[6] === val) || (arr[3] === val && arr[5] === val)))
      || (arr[8] === val && ((arr[2] === val && arr[5] === val) || (arr[6] === val && arr[7] === val)))
    );
  }

  // On button press: perform player move
  const press_button = (i: number, j: number) => {
    if (turns === 0) {
      // Handle first turn
      setGridVals(changeGridVal(i, j, "X"));
      calculate_tree(coordToNum(i,j));
    } else {
      const options = gameTree?.nextMoves;
      const moveNum = coordToNum(i,j);
      // Move to next solve tree layer
      if (options && options[moveNum]) {
        setGameTree(options[moveNum]);
      }
      // Display player move
      setGridVals(changeGridVal(i, j, "X"));
    }

    // End of turn calculations
    if (calculate_win(i, j, "X")) {
      endGame("You");
    } else {
      setTurns(turns + 1);
      setGameState(gs.BOTMOVE);
    }
  }

  // Handle bot move
  const bot_move = () => {
    // Get move from game Tree
    const move = gameTree?.optimal ?? 0;

    // Update grid
    const currState = gridToNum(gridVals);
    const newState = updateNum(currState, move, "O");
    setGridVals(numToGrid(newState));

    // End of turn calculations
    if (calculate_win_num(newState, "O")) {
      endGame("Computer");
    } else {
      setGameState(gs.PLAYERMOVE);
      setTurns(turns + 1);
    }
  }

  // Button components for the UI Grid
  const buttons = gridVals.map((arr, i) => {
    return (<div>
      {arr.map((val, j) => {
      return (<button id={`Tab${i}`} className="App-button" onClick={() => {if (gridVals[i][j] === "_" && (gameState === gs.PLAYERMOVE)) press_button(i,j)}}>
        {val}</button>)
    })}</div>);
  })

  return (
    <div>
    {gameText}
    {buttons}
    <button onClick={reset}>Reset</button>
    </div>
  );
}

export default TicTacToe;
