import { GameStage } from "./PortraitGame";

const CharButton = ({
  name,
  setGameStage,
  correct,
}: {
  name: string;
  setGameStage: React.Dispatch<React.SetStateAction<GameStage>>;
  correct: boolean;
}) => {
  return (
    <button
      className="char-button"
      onClick={() => {
        setGameStage((gs) => {
          return correct
            ? { ...gs, question: gs.question + 1, points: gs.points + 1 }
            : { ...gs, question: gs.question + 1 };
        });
      }}
    >
      {name}
    </button>
  );
};

export default CharButton;
