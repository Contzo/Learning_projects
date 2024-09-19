import { useEffect } from "react";

function Timer({ secondsRemaining, dispatch }) {
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  useEffect(
    function () {
      if (secondsRemaining === 0) {
        dispatch({ type: "finish" });
        return;
      }
      const quizTimerId = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(quizTimerId);
    },
    [dispatch, secondsRemaining]
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
