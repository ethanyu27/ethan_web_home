import React from 'react';
import * as Utils from './GameUtils';
import './BeforeAfterGame.css';

export function BeforeAfterGame() {

    enum as {CORRECT, INCORRECT, NOANSWER};

    const [answerList, setAnswerList] = React.useState<string[]>([]);
    const [puzzleNum, setPuzzleNum] = React.useState<number>(3)
    const [wordList, setWordList] = React.useState<Utils.WordItem[][]>(Utils.readTiles(puzzleNum));
    const [answerState, setAnswerState] = React.useState<as>(as.NOANSWER);

    const answerLine = ["Answer:", ...answerList].map(word => <label className={'BeforeAfter-Word-label'}>{word}</label>)

    const wordGrid = wordList.map((row, i) => {
        const rowDisp = row.map((word, j) => 
        <button
            className={`BeforeAfter-Word-Button${word.used ? ' BeforeAfter-Word-Button-Used' : ''}`}
            onClick={() => {
                setWordList(Utils.flipTile(wordList,i,j));
                setAnswerList(Utils.updateAnswers(answerList, word.name));
            }}>
            {word.name}
        </button>)
        return <div>
            {rowDisp}
        </div>
    })

    const handleAnswer = () => {

        let newAnswerState: as = as.CORRECT;
        Utils.readSolution(puzzleNum).forEach((word, i) => {
            if (!answerList[i] || word !== answerList[i]) {
                newAnswerState = as.INCORRECT;
            }
        });
        setAnswerState(newAnswerState);
    }

    const handleReset = () => {
        setWordList(wordList.map(row=>row.map(word=>({name: word.name, used: false}))));
        setAnswerList([]);
        setAnswerState(as.NOANSWER);
    }

    const answerBox = answerState !== as.NOANSWER && <div style={{marginTop: '10px'}}>
    <label style={{backgroundColor: answerState === as.CORRECT ? 'green' : 'red'}}>
        {`${answerState === as.INCORRECT ? 'Not Quite ' : ''}Correct!`}
    </label></div>

    return (<div>
        <div>
            <h1>Hidden Before and After Game</h1>
            <p>Try finding the correct order of words</p>
            <p>Any 2 consecutive words are connected by a hidden word to create a before and after sequence</p>
            <p>Example sequence: Trade, Time (hidden word is show: Trade Show, Show Time)</p>
            {/* <p>Any 2 consecutive words must make up a phrase</p> */}
            <p>Connect all words together to get your final answer!</p>
        </div>
        <div style={{marginBottom: '10px'}}>{answerLine}</div>
        {wordGrid}
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleAnswer}>Check Answer</button>
        <button onClick={() => {
            const newPuzzle = puzzleNum === 3 ? 4 : 3;
            setAnswerList([]);
            setAnswerState(as.NOANSWER);
            setPuzzleNum(newPuzzle);
            setWordList(Utils.readTiles(newPuzzle));
        }}>New puzzle</button>
        {answerBox}
    </div>)
}

export default BeforeAfterGame