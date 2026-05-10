

const isValidPos = function (pos) {
    if (!Number.isInteger(pos[0]) || !Number.isInteger(pos[1])) throw new Error("must enter an array of integers.");
    return pos[0] >= 0 && pos[0] < 8 && pos[1] >= 0 && pos[1] < 8;
}

const possibleMoves = function (currPos) {
    if (!isValidPos(currPos)) throw new Error("current position is not valid");
    return [
        [currPos[0] + 1, currPos[1] + 2],
        [currPos[0] - 1, currPos[1] + 2],
        [currPos[0] + 1, currPos[1] - 2],
        [currPos[0] - 1, currPos[1] - 2],

        [currPos[0] + 2, currPos[1] + 1],
        [currPos[0] - 2, currPos[1] + 1],
        [currPos[0] + 2, currPos[1] - 1],
        [currPos[0] - 2, currPos[1] - 1],
    ].filter(isValidPos);
}

const getIndex = pos => pos[0] * 8 + pos[1];
const getPos = index => [Math.floor(index / 8), index % 8];

export {possibleMoves, getIndex, getPos}