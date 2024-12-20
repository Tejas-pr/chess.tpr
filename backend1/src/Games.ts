import { WebSocket } from "ws";
import { Chess } from "chess.js"; 
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";
// when ever a new game has to create this class need to call and object has to created to specify the class Game
export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    public board: Chess;
    private startTime: Date;
    private moveCount = 0;
    
    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();

        // after the game is init let the players know like color etc...
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }

    // move logic
    makeMove(socket: WebSocket, move: {
        from: string,
        to: string
    }) {
        // validate the type of move using zod
        // validate the move
        if(this.moveCount % 2 === 0 && socket !== this.player1) {
            return;
        }

        if(this.moveCount % 2 === 0 && socket !== this.player2) {
            return;
        }
        // is this the users move?
        // is the move is valid?
        try {
            this.board.move(move);
        }catch(e) {
            console.log(e);
            return;
        }
        // Check if the game is over
        // Send the updated moves to the both the players 
        if(this.board.isGameOver()) {
            // send to both players
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            this.player2.send(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            return;
        }

        // if the game is not over, send the moves
        if(this.moveCount % 2 === 0) {
            this.player2.emit(JSON.stringify({
                type: MOVE,
                payload: move
            }));
        }else {
            this.player1.emit(JSON.stringify({
                type: MOVE,
                payload: move
            }));
        }
        this.moveCount++;
    }
}