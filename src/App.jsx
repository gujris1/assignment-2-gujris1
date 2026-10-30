import './App.css';
import { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskCounter from './components/TaskCounter';
//import all icons
import calendarIcon from './assets/calendar_icon.png';
import inboxIcon from './assets/inbox_icon.png';
import menuIcon from './assets/menu_icon.png';
import upcomingIcon from './assets/upcoming_icon.png';


// Assignment 2: build the Task Manager here.
const currentTasks = []; // initial state is no tasks
// Add 3 filters:
const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

function App() {
  const [tasks, setTasks] = useState(currentTasks);
  const [filter, setFilter] = useState('all'); // default filter is All

  const taskCount = tasks.length;
  const completedTasksCount = tasks.filter(task => task.completed).length;

  function addTask(text) {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks(oldTasks => [...oldTasks, newTask]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  // toggling a task should basically mark it as completed or not
  function toggleTask(id) {
    setTasks(oldTasks =>
      oldTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  // Now adding filtering:
  const visibleTasks = tasks.filter(task => {
    if (filter === 'active') {
      return !task.completed;
    } else if (filter === 'completed') {
      return task.completed;
    } else {
      //return all
      return true;
    }
  });

  // Add active task count for Inbox count in sidebar
  const activeCount = taskCount - completedTasksCount;

  return (
    <>
      {/* header, sidebar, and filter buttons stay in App */}
      <header className="site-header">
        {/* Menu icon on left side */}
        <img src={menuIcon} alt="Menu"/>
        {/* Quick Find Box */}
        <form className="search-form" onSubmit={e => e.preventDefault()}>
          <input type="search" id="search" name="search" placeholder="Quick Find"/>
        </form>
        {/*counter text on right side with check icon */}
        <TaskCounter totalTasks={taskCount} completedTasks={completedTasksCount}/>
      </header>

      {/* Left Navigation Section */}
      <nav className="sidebar" aria-label="Left navigation">
        {/*List in the left navigation currently has 3 items that contain an icon, label, and count */}
        <ul className="sidebar-list">
          <li>
            <a className="sidebar-list-item">
              <img src={inboxIcon} alt="Inbox"/>
              Inbox
              <span className="sidebar-list-count">{activeCount}</span>
              </a>
              </li>
              <li>
                <a className="sidebar-list-item">
                  <img src={calendarIcon} alt="Calendar"/>
                  Today
                  <span className="sidebar-list-count">5</span>
                </a>
              </li>
              <li>
                {/* Upcoming list item doesn't have a count */}
                <a className="sidebar-list-item">
                  <img src={upcomingIcon} alt="Upcoming"/>
                  Upcoming
                </a>
              </li>
        </ul>
      </nav>
      
      {/* Main Content Section */}
      <main className="main-content">
        <h1> Inbox </h1>
        {/* Add the 3 filters under the Inbox header, each filter separated by | */}
        <ul className="filter-list">
          {FILTERS.map((option, index) => (
            <li key={option.value}>
              {index > 0 && <span className="filter-separator">|</span>}
              <button type="button" className={filter === option.value ? 'filter-button active' : 'filter-button'} onClick={() => setFilter(option.value)}>
                {option.label}
              </button>
            </li>
          ))}
        </ul>


        <TaskForm onAddTask={addTask} />
        <TaskList tasks={visibleTasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} /> { /* using visibleTasks for filtering! */}
      </main>
      </>
  )
}

export default App
