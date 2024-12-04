import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Games";

export class GameManager {
    private games: Game[];
    private pandingUser: WebSocket | null;
    private users: WebSocket[];

    constructor () {
        this.games = [];
        this.pandingUser = null;
        this.users = [];
    }

    addUser(socket: WebSocket) {
        this.users.push(socket);
        this.handleMessage(socket);
    }

    removeUser(socket: WebSocket) {
        this.users = this.users.filter(user => user !== socket);
        // stop game since the player is left
    }

    private handleMessage(socket: WebSocket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());

            // we will check if there are any user is waiting
            if(message.type === INIT_GAME) {
                if(this.pandingUser) {
                    // start a game
                    const game = new Game(this.pandingUser, socket);
                    this.games.push(game);
                    this.pandingUser = null;
                } else {
                    // if there is no user in waiting to connect then keep player in the pending room
                    this.pandingUser = socket;
                }
            }

            // the game is already started 
            if(message.type === MOVE) {
                // find the relevent game for the user 
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if(game) {
                    // this specific socket player makeing this move
                    game.makeMove(socket, message.move);
                }
            }
        })
    }
}