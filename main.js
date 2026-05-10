
import { KnightTravail } from "./knight-travail.js";

const kt = new KnightTravail();
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


