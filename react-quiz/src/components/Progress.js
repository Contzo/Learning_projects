function Progress({
  index,
  numberOfQuestions,
  points,
  totalNumberOfPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={numberOfQuestions}
        value={index + Number(answer !== undefined)}
      />
      <p>
        Question <strong>{index + 1}</strong> / {numberOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {totalNumberOfPoints}
      </p>
    </header>
  );
}

export default Progress;
