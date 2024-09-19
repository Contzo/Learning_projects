import { useQuiz } from "../contexts/QuizProvider";

function NextButton() {
  const { dispatch, answer, index, numberOfQuestions } = useQuiz();
  if (answer.at(index) === undefined) return null;
  if (index < numberOfQuestions - 1)
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      </div>
    );
  if (index === numberOfQuestions - 1) {
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      </div>
    );
  }
}
export default NextButton;
