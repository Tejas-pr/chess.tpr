import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

const ChessBoard = ({ board, socket }: {
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket;
}) => {
  const [from, setFrom] = useState<Square | null>(null);
  const [to, setTo] = useState<Square | null>(null);
  return (
    <div className="test-white-200">
      {board.map((row, i) => {
        return <div key={i} className="flex">
            {row.map((sqaure, j) => {
                return <div onClick={() => {
                  if(!from) {
                    setFrom(sqaure?.square ?? null);
                  } else {
                    setTo(sqaure?.square ?? null);
                    socket.send(JSON.stringify({
                      type: "move",
                      payload: {
                        from,
                        to
                      }
                    }))
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
