import { useState } from 'react';

// Form for adding a new task; owns only the input's local state
function TaskForm({ onAddTask }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    // Validation (don't allow empty or space input)
    if (!text.trim()) return;
    
    // Call addTask
    onAddTask(text);
    setText(''); // Clear on success
  }

  return (
  <form  className="task-form" onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a task"
      />
      <button type="submit">
        + Add Task
      </button>
    </form>

  );
}

export default TaskForm;