
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


class KnightTravails {

    init () {
        this.squares = Array.from({length : 64}, () => [null, null]); this.queue = [];
        this.isDone = false;
    }

    constructor () {
        this.init();
    }

    setUp (start, end) {
        this.endIndex = getIndex(end);
        this.startIndex = getIndex(start);
        this.squares[this.startIndex] = [0, null];
        this.queue.push(this.startIndex);
    }

    unQueue () {
        const lpIndex = this.queue.shift(), lp = getPos(lpIndex);
        possibleMoves(lp).forEach(cp => {
            const cpIndex = getIndex(cp), vertix = this.squares[cpIndex];
            if (vertix[0] !== null) return;
            vertix[0] = this.squares[lpIndex][0] + 1; vertix[1] = lpIndex;
            if (cpIndex === this.endIndex) this.isDone = true;
            this.queue.push(cpIndex);
        });
        return this.isDone;
    }

    getDistanceToEnd () {
        return this.squares[this.endIndex][0]
    }

    getPathToEnd () {
        const resArr = []; let index = this.endIndex;
        while (index !== null) {
            resArr.push(getPos(index)); index = this.squares[index][1];
        }
        return resArr.toReversed();
    }

    knightMoves (start, end) {
        for (const [name, pos] of [["start", start], ["end", end]]) {
            if (!isValidPos(pos)) throw new Error(`you entered an invalid ${name} position.`);
        }
        this.init();
        this.setUp(start, end);
        while (this.queue.length > 0 && !this.isDone) this.unQueue();
    }

    printRes () {
        const d = this.getDistanceToEnd();
        const path = this.getPathToEnd();
        console.log("start - " + this.getPathToEnd().map(pos => `[${pos}]`).join(" -> ") + " - end");
        console.log(`To get from [${getPos(this.startIndex)}] to [${getPos(this.endIndex)}] takes ${d} moves`);
    }
}

const kt = new KnightTravails();
kt.knightMoves([3,3], [4,3]);
kt.printRes();
kt.knightMoves([0,0], [1,2]);
kt.printRes();
kt.knightMoves([3,3], [0,0]);
kt.printRes();
kt.knightMoves([0, 0], [7, 7]);
kt.printRes();
kt.knightMoves([0, 0], [0, 7]);
kt.printRes();


