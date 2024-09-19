import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "../Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

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

const SECS_PER_QUESTION = 1;

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
export default function App() {
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
    <div>
      <div className="app">
        <Header />
        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && (
            <StartScreen
              numberOfQuestions={numberOfQuestions}
              dispatch={dispatch}
            />
          )}
          {status === "active" && (
            <>
              <Progress
                index={index}
                numberOfQuestions={numberOfQuestions}
                points={points}
                totalNumberOfPoints={totalNuberOfPoints}
                answer={answer.at(index)}
              />
              <Question
                question={questions[index]}
                dispatch={dispatch}
                answer={answer.at(index)}
              />
              <Footer>
                <Timer
                  dispatch={dispatch}
                  secondsRemaining={secondRemaining}
                ></Timer>
                <NextButton
                  dispatch={dispatch}
                  answer={answer.at(index)}
                  index={index}
                  numQuestions={numberOfQuestions}
                />
              </Footer>
            </>
          )}
          {status === "finished" && (
            <FinishScreen
              points={points}
              maxPossiblePoints={totalNuberOfPoints}
              highScore={highScore}
              dispatch={dispatch}
            />
          )}
        </Main>
      </div>
    </div>
  );
}
