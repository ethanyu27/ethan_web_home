import Puzzles from './puzzles.json';

export interface WordItem {
    name: string,
    used: boolean
}

const nPuzzles: number = Puzzles?.prompts?.length ?? 0;

export const getNewPuzzle = (current: number): number => {
    if (nPuzzles < 2) return 0;
    let newPuzzle = Math.floor(Math.random() * (nPuzzles - 1));
    if (newPuzzle >= current) newPuzzle++;
    return newPuzzle;
}

export const readTiles = (n: number): WordItem[][] => {
    if (Puzzles?.prompts?.[n]) {
        return Puzzles.prompts[n].split(";").map(prompt => prompt.split(",")).map(row => row.map(word => ({name: word, used: false})));
    }
    return [];
}

export const flipTile = (tiles: WordItem[][], i: number, j: number) => {
    if (tiles[i]?.[j]) {
        tiles[i][j].used = !tiles[i][j].used
    }
    return tiles;
}

export const updateAnswers = (answerList: string[], word: string) => {
    if (answerList.includes(word)) {
        return answerList.filter(item => item !== word);
    }
    return [...answerList, word];
}

export const readSolution = (n: number) => {
    if (Puzzles?.answers?.[n]) {
        return Puzzles.answers[n].split(",");
    }
    return [];
}

// ANCIENT Greek GIFT giving TREE house PET store FRONT row BOAT club SPORT car WASH away SUITCASE
// SUPER man KIND heart RATE quote MARK down LOW profile PICTURE perfect PITCH in CHECK box PLOT  