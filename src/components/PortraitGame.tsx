import { useRef, useState, useEffect } from "react";
import getData, { digestTheData, ApiChar } from "../api/PortraitWrapper";
import Question from "./Question";

const PortraitGame = () => {
  const database : React.MutableRefObject<ApiChar[]> = useRef([]);
  const [gameStage, setGameStage] = useState({ question: 0, points: 0 }); //gameStage is an object with 2 properties, each holding a numeric value
  const [data, setData] = useState([
    [{ id: 1, fullName: "The database is loading", isCorrect: true }],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
  useEffect(() => {
    (async function () {
      database.current = await getData();
      // This line can be used to restart the game
      setData(digestTheData(database.current));
    })();
  }, []);
  return (
    <div className="portrait-game">
      <h3 className="points">{gameStage.points} points</h3>
      {gameStage.question < 10 ? (
        <Question data={data[gameStage.question]} setGameStage={setGameStage} />
      ) : (
        <>
          <h1 className="results">{`${gameStage.points} points out of 10`}</h1>
          <button
            onClick={() => {
              setData(digestTheData(database.current));
              setGameStage({ question: 0, points: 0 });
            }}
          >
            Play again
          </button>
        </>
      )}
    </div>
  );
};

export default PortraitGame;
