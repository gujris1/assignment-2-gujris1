// One task: checkbox, text, delete button

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={task.completed ? 'task completed' : 'task'}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <label>{task.text}</label>
      <button type="button" className="delete-button" onClick={ () => onDelete(task.id)} title="Delete Task">
        ×
      </button>

    </li>
  );
}

export default TaskItem;