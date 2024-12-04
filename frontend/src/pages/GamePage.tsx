import { useEffect, useState } from "react";
import Button from "../components/Button";
import ChessBoard from "../components/ChessBoard";
import { useSocket } from "../hooks/useSockets";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

const GamePage = () => {
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const socket = useSocket();
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type) {
        case INIT_GAME:
          // setChess(new Chess());
          setBoard(chess.board());
          console.log("game initialized");
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("move madde");
          break;
        case GAME_OVER:
          console.log("game over!");
          break;
      }
    };
  }, [socket]);
  if (!socket) return <div>Connecting...</div>;
  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-4">
          {/* board  */}
          <div className="col-span-3">
            <ChessBoard board={board} chess={chess} setBoard={setBoard} socket={socket}/>
          </div>
          {/* side start btn  */}
          <div className="col-span-1 bg-[#262522] rounded-lg flex justify-center items-start">
            <Button
              children={<div>Play</div>}
              onClick={() => {
                socket?.send(
                  JSON.stringify({
                    type: INIT_GAME,
                  })
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
