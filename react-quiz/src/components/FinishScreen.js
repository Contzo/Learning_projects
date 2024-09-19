import { useQuiz } from "../contexts/QuizProvider";

function FinishScreen() {
  const { points, totalNuberOfPoints, highScore, dispatch } = useQuiz();
  const percentage = Math.ceil((points / totalNuberOfPoints) * 100);
  let emoji;
  if (percentage === 100) emoji = "🎖️";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "☺️";
  if (percentage >= 0 && percentage < 50) emoji = "🥲";
  if (percentage === 0) emoji = "🫥";
  return (
    <>
      <p className="result">
        {emoji} Your score <strong>{points}</strong> out of {totalNuberOfPoints}{" "}
        ({percentage}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "resetQuiz" })}
      >
        Reset Quiz
      </button>
    </>
  );
}

export default FinishScreen;
