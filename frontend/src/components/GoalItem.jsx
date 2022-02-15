function GoalItem({ goal }) {
  const handleOnClick = () => {
    
  };

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
      <button onClick={handleOnClick} className="close">X</button>
    </div>
  )
}

export default GoalItem;