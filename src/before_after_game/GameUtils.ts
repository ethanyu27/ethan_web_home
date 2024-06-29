
export interface WordItem {
    name: string,
    used: boolean
}

export const readTiles = (n: number): WordItem[][] => {
    if (n === 3) {
        return [
            ['TREE', 'BOAT', 'GIFT'],
            ['WASH', 'SPORT', 'PET'],
            ['ANCIENT', 'SUITCASE', 'FRONT'],
        ].map(row => row.map(word => ({name: word, used: false})));
    } else if (n === 4) {
        return [
            ['PLOT', 'PICTURE', 'KIND'],
            ['CHECK', 'MARK', 'LOW'],
            ['RATE', 'SUPER', 'PITCH'],
        ].map(row => row.map(word => ({name: word, used: false})));
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
    if (n === 3) return ['ANCIENT', 'GIFT', 'TREE', 'PET', 'FRONT', 'BOAT', 'SPORT', 'WASH', 'SUITCASE'];
    if (n === 4) return ['SUPER', 'KIND', 'RATE', 'MARK', 'LOW', 'PICTURE', 'PITCH', 'CHECK', 'PLOT'];
    return [];
}

// ANCIENT Greek GIFT giving TREE house PET store FRONT row BOAT club SPORT car WASH away SUITCASE
// SUPER man KIND heart RATE quote MARK down LOW profile PICTURE perfect PITCH in CHECK box PLOT  