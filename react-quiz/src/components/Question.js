import { useQuiz } from "../contexts/QuizProvider";
import Options from "./Options";
function Question() {
  const { questions, dispatch, answer, index } = useQuiz();
  return (
    <div>
      <h4>{questions.at(index).question}</h4>
      <Options
        question={questions.at(index)}
        dispatch={dispatch}
        answer={answer.at(index)}
      />
    </div>
  );
}

export default Question;
