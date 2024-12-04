import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../pages/GamePage";

const ChessBoard = ({ board, socket, setBoard, chess }: {
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket;
    setBoard: any;
    chess: any;
}) => {
  const [from, setFrom] = useState<Square | null>(null);
  return (
    <div className="test-white-200">
      {board.map((row, i) => {
        return <div key={i} className="flex">
            {row.map((sqaure, j) => {
              const squareRep = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square;
                return <div onClick={() => {
                  if(!from) {
                    setFrom(squareRep);
                  } else {
                    socket.send(JSON.stringify({
                      type: MOVE,
                      payload: {
                        move: {
                          from,
                          to:squareRep 
                        }
                      }
                    }))
                    setFrom(null);
                    chess.move({
                      from,
                      to: squareRep
                    });
                    setBoard(chess.board());
                  }
                }} className={`w-20 h-20 ${(i+j) % 2 === 0 ? 'bg-[#EBECD0]' : 'bg-[#779556]'} text-black text-2xl`} key={j}>
                    <div className="flex justify-center h-full w-full">
                      <div className="flex flex-col h-full items-center justify-center">
                       {sqaure ? sqaure.type : ""}
                      </div>
                    </div>
                </div>
            })}
        </div>
      })}
    </div>
  )
}

export default ChessBoard
