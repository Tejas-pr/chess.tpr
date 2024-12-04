import { useNavigate } from "react-router-dom";
import chessboard from "../assets/chessboard2.jpeg";
import strategy from "../assets/strategy.png";
import Button from "../components/Button";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center min-h-screen p-4 gap-8 md:px-40">
      <div>
        <img
          src={chessboard}
          alt="chessboard"
          className="rounded-lg h-[400px] md:h-[600px] w-[600px]"
        />
      </div>
      <div className="flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Play Chess Online <br />
          <span className="md:pl-8">on the #3 Site!</span>
        </h1>
        <Button
          onClick={() => {
            navigate("/game");
          }}
          children={
            <div className="flex md:gap-x-4">
              <img src={strategy} alt="logo" className="w-14 hidden md:flex" />
              <div className="flex flex-col items-start justify-center">
                <span className="text-2xl font-extrabold">Play Online</span>
                <span className="hidden md:flex text-xs">
                  Play with someone at your level
                </span>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default LandingPage;
