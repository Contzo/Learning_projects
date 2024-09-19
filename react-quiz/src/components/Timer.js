import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizProvider";

function Timer() {
  const { secondRemaining, dispatch } = useQuiz();
  const mins = Math.floor(secondRemaining / 60);
  const secs = secondRemaining % 60;
  useEffect(
    function () {
      if (secondRemaining === 0) {
        dispatch({ type: "finish" });
        return;
      }
      const quizTimerId = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(quizTimerId);
    },
    [dispatch, secondRemaining]
  );
  return (
    <div className="timer">
      {mins < 0 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}

export default Timer;
