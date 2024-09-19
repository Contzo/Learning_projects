import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();
const initialState = {
  questions: [],
  // loading, error, ready, active ' finished
  status: "loading",
  index: 0,
  answer: [],
  points: 0,
  highScore: 0,
  secondRemaining: null,
};

const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        secondRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: [...state.answer, action.payload],
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1 };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore: Math.max(state.highScore, state.points),
      };
    case "resetQuiz":
      return {
        ...initialState,
        questions: state.questions,
        highScore: state.highScore,
        secondRemaining: state.questions.length * SECS_PER_QUESTION,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
      };
    default:
      throw new Error("Action unknown");
  }
}
function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highScore, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numberOfQuestions = questions.length;
  const totalNuberOfPoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((resp) => resp.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondRemaining,
        numberOfQuestions,
        totalNuberOfPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const value = useContext(QuizContext);
  if (!value)
    throw new Error(
      "Tried to use the question context outside of the provider"
    );
  return value;
}

export { QuizProvider, useQuiz };
