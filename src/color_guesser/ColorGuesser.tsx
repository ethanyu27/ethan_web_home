import React from 'react';
import { ColorPicker, Colors } from './ColorPicker';
import './ColorGuesser.css';

const getRandomColorValue = (): number =>
    Math.floor(Math.random() * 256);

// Returns 2 digit hex, assuming 0-255 input value
const numToHex = (num: number): string =>
    num.toString(16).padStart(2, '0');

const rgbToHex = (r: number, g: number, b: number) =>
    `#${[r,g,b].map(n => numToHex(n)).join('')}`;

const getError = (guess: number, answer: number) =>
    Math.abs(guess - answer) / 255;

export function ColorGuesser() {

    const [redGuess, setRedGuess] = React.useState<number>(0);
    const [greenGuess, setGreenGuess] = React.useState<number>(0);
    const [blueGuess, setBlueGuess] = React.useState<number>(0);

    const [redAns, setRedAns] = React.useState<number>(getRandomColorValue());
    const [greenAns, setGreenAns] = React.useState<number>(getRandomColorValue());
    const [blueAns, setBlueAns] = React.useState<number>(getRandomColorValue());

    const [score, setScore] = React.useState<number | undefined>(undefined);
    const [easyMode, setEasyMode] = React.useState<boolean>(true);

    const reset = () => {
        setRedAns(getRandomColorValue());
        setGreenAns(getRandomColorValue());
        setBlueAns(getRandomColorValue());
        setScore(undefined);
    }

    const scoreGuess = () => {
        const averageErr = (
            getError(redGuess, redAns) +
            getError(blueGuess, blueAns) + 
            getError(greenGuess, greenAns)
        ) / 3;
        setScore(Math.floor((1 - averageErr) * 100));
    }

    return (
        <div>
            <h1>
                Color Guesser
            </h1>
            <div className='InlineRow'>
                <p>
                    Use the color sliders to try and guess the RGB for this color:
                </p>
                <div 
                    className='ColorBlock'
                    style={{backgroundColor: rgbToHex(redAns, greenAns, blueAns)}}
                />
            </div>
            <ColorPicker
                onChange={(val) => setRedGuess(val)}
                color={Colors.red}
                readOnly={score !== undefined}
            />
            <ColorPicker
                onChange={setGreenGuess}
                color={Colors.green}
                readOnly={score !== undefined}
            />
            <ColorPicker
                onChange={setBlueGuess}
                color={Colors.blue}
                readOnly={score !== undefined}
            />
            { (score !== undefined || easyMode) && (
                <div className='InlineRow' style={{padding: 0}}>
                    <p>Your Guess:</p>
                    <div 
                        className='ColorBlock'
                        style={{backgroundColor: rgbToHex(redGuess, greenGuess, blueGuess)}}
                    />
                </div>
            )}
            { score !== undefined && (<div>
                <p>Answer: R({redAns}) G({greenAns}) B({blueAns})</p>
                <p>Your Score: {score}</p>
            </div>)}
            <button 
                className='App-button'
                onClick={scoreGuess}>
                Guess
            </button>
            <button 
                className='App-button'
                onClick={reset}>
                Reset
            </button>
            <button 
                className='App-button'
                onClick={() => setEasyMode(!easyMode)}>
                Easy Mode: {easyMode ? 'On' : 'Off'}
            </button>
        </div>
    );
}