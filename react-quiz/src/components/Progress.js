import { useQuiz } from "../contexts/QuizProvider";

function Progress() {
  const { index, numberOfQuestions, points, totalNuberOfPoints, answer } =
    useQuiz();
  return (
    <header className="progress">
      <progress
        max={numberOfQuestions}
        value={index + Number(answer.at(index) !== undefined)}
      />
      <p>
        Question <strong>{index + 1}</strong> / {numberOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {totalNuberOfPoints}
      </p>
    </header>
  );
}

export default Progress;
