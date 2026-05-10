
import { possibleMoves, getIndex, getPos } from "./support-functions.js";

class KnightTravail {

    constructor () {
        this.init();
    }

    init () {
        this.squares = Array.from({length : 64}, () => [null, null]); this.queue = [];
        this.isDone = false;
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