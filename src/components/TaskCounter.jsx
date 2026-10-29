import checkIcon from '../assets/check_icon.png';

// Task statistics in the header, in the format "total / completed"
// receives the two counts, renders "total / completed"
function TaskCounter( { totalTasks, completedTasks } ) {
  return (
    <p className="counter">
      <img src={checkIcon} alt="Check"/>
      {totalTasks}/{completedTasks}
    </p>
  );
}

export default TaskCounter;