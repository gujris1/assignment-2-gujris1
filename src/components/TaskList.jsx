import TaskItem from './TaskItem';

// Displays the list of tasks; receives the tasks to show and the handlers

function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  // check if there are no tasks to display and show a message if empty list
  if (tasks.length === 0) {
    return <p>No tasks to show.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onToggle={onToggleTask} onDelete={onDeleteTask} />
      ))}
    </ul>
  );
}

export default TaskList;