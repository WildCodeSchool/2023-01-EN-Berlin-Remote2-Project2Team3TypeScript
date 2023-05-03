import CharButton from "./CharButton.js";
import { Question as QuestionType } from "../api/PortraitWrapper.js";

const Question = ({
  data,
  setGameStage,
}: {
  data: QuestionType;
  setGameStage: React.Dispatch<React.SetStateAction<QuestionType>>;
}) => {
  const answer = data.filter((character) => character.isCorrect)[0];
  return (
    <div className="question">
      <h2>Who is this?</h2>
      <img className="char-image" src={answer.imageUrl} alt={answer.fullName} />
      <div className="choices">
        {data.map((character) => (
          <CharButton
            key={character.id.toString()}
            name={character.fullName}
            setGameStage={setGameStage}
            correct={character.isCorrect}
          />
        ))}
        <CharButton
          name="Skip question"
          setGameStage={setGameStage}
          correct={false}
        />
      </div>
    </div>
  );
};

export default Question;
