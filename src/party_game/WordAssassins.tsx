import React from 'react';
import './WordAssassins.css';
import Players from './players.json';
import Agent from './Agent.png';

import { GameDialog } from './GameDialog';

const RULES: string[] = [
    "Each player will be given a target and a word.",
    "The goal of the game is to discreetly get your target to say the given word.",
    "The exact word must be said. A variant of the word does not count.",
    "The may not use your target's word to get them to say that word.",
    "You must be the one that caused/manipulated the conversation to lead your target to say their word (i.e., if they say it on a phone call with someone else, it does not count).",
    "Once your target has said that word, show them your target/word page to confirm, and they are eliminated from the game.",
    "After you have eliminated a player, you receive their target and word as your new assignment.",
    "Keep playing and eliminating until there is one person left.",
    "Last person standing wins!"];

const INVALID_NAME: string = "Please select a player";
const RULES_TITLE: string = "Rules:";
const WIN_TEXT: string = "You Win!";

const PLAYER_DATA: {[key: string] : {target: string, word: string}} = Players;
const NAMES = Object.keys(PLAYER_DATA);
const BLANK_TARGET = {target: "", word: ""};

export function WordAssassins() {
    const options = [(<option disabled selected>Your Name</option>), ...NAMES.map(opt => (<option>{opt}</option>))];
    const rules = RULES.map((line, ind) => (<p>{`${ind + 1}. ${line}`}</p>));

    const [name, setName] = React.useState<string>("");
    const [targetData, setTargetData] = React.useState<{target: string, word: string}>(BLANK_TARGET);
    const [modaltext, setModalText] = React.useState<string>(INVALID_NAME);
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [hasConfirm, setHasConfirm] = React.useState<boolean>(false);
    const [dialogBody, setDialogBody] = React.useState<React.ReactNode[]>();
    const [instructionMode, setInstructionMode] = React.useState<boolean>(true);

    const handleEnter = () => {
        if (NAMES.includes(name))
        {
            setTargetData(PLAYER_DATA[name] ?? BLANK_TARGET);
            setInstructionMode(false);
        } else {
            setModalText(INVALID_NAME);
            setHasConfirm(false);
            setDialogBody(undefined);
            setModalOpen(true);
        }
    }

    const showRules = () => {
        setModalText(RULES_TITLE);
        setHasConfirm(false);
        setDialogBody(rules);
        setModalOpen(true);
    }

    const handleElimination = () => {
        setModalText(`Please Confirm that ${targetData.target} has been eliminated`);
        setHasConfirm(true);
        setDialogBody(undefined);
        setModalOpen(true);
    }

    const handleWin = () => {
        setModalText(WIN_TEXT);
        setHasConfirm(false);
        setDialogBody(undefined);
        setModalOpen(true);

        setInstructionMode(true);
        setName("");
        setTargetData(BLANK_TARGET);
    }

    const handleConfirm = () => {
        if (PLAYER_DATA[targetData.target]?.target === name)
        {
            handleWin();
        }
        else if (NAMES.includes(targetData.target)) {
            setTargetData(PLAYER_DATA[targetData.target] ?? BLANK_TARGET);
        } else {
            console.log("An error occurred when retrieving player data");
        }
    }

    const instructionContent = (<>
        <div className={"Instruction-Text"}>
            <label>{RULES_TITLE}</label>
            {rules}
        </div>
        <br></br>
        <div>
            <label className={"Name-Label"}>Select Player:</label>
            <select className={"Name-Field"} children={options} onChange={e => setName(e.target.value)}/>
            <button className={"Button"} onClick={handleEnter}>Enter Game</button>
        </div>
    </>);

    const playerContent = (<>
        <div className={"Div-Center"}>
            <p className={"Cursive"}>
                Special Agent {name}, your mission, should you choose to accept it, is to eliminate
                your target assigned below:</p>
        </div>
        <div className={"Div-Center"}>
            <label className={"Player-Label"}>{`Target: ${targetData.target}`}</label>
            <label className={"Player-Label"}>{`Word: ${targetData.word}`}</label>
        </div>
        <br></br>
        <div className={"Div-Center"}>
            <button className={"Button Player-Button"} onClick={showRules}>Rules</button>
            <button className={"Button Player-Button"} onClick={handleElimination}>Player Eliminated</button>
        </div>
    </>);

    return (
        <div className={"Game-Background"}>
            <div className={"Game-Content"}>
                <div className={"Heading-Row"}>
                    <img className={"Heading-Image"} src={Agent} alt={"Agent"}/>
                    <label className={"Heading-Label"}>Word Assassins</label>
                    <img className={"Heading-Image"} src={Agent} alt={"Agent"}/>
                </div>
                <br/>
                {instructionMode ? instructionContent : playerContent}
            </div>
            <GameDialog
                dialogText={modaltext}
                modalOpen={modalOpen}
                dialogBody={dialogBody}
                hasConfirm={hasConfirm}
                handleConfirm={hasConfirm ? handleConfirm : undefined}
                closeModal={() => setModalOpen(false)}
            />
        </div>
    )
}