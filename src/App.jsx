import './App.css';
import { useState } from 'react';
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import TaskCounter from './components/TaskCounter';
//import all icons
import calendarIcon from './assets/calendar_icon.png';
import inboxIcon from './assets/inbox_icon.png';
import menuIcon from './assets/menu_icon.png';
import upcomingIcon from './assets/upcoming_icon.png'


// Assignment 2: build the Task Manager here.
// Step 1 (after the Oct 12 class): hard-coded tasks, the five components, props.
// Step 2 (after the Oct 19 class): useState, the controlled form, toggle, delete, filtering.
/*const currentTasks = [
  { id: 1, text: 'Call Mom', completed: false },
  { id: 2, text: 'Buy the new issue of Scientific American', completed: false },
  { id: 3, text: 'Buy the new album by Rake', completed: false },
  { id: 4, text: 'Buy a giftcard for Dad', completed: false },
];*/
const currentTasks = [];
// Now adding filters:
const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
   { value: 'completed', label: 'Completed' },
];

function App() {
  const [tasks, setTasks] = useState(currentTasks);//useState([])
  const taskCount = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  function addTask(text) {
    const newTask = { id: Date.now(), text, completed: false };
    //setTasks([...tasks, newTask]);
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
  const [filter, setFilter] = useState('all');
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
  const activeCount = taskCount - completedTasks;

  return (
    <>
      {/* header, sidebar, and filter buttons stay in App */}
      <header className="site-header">
        {/* Menu icon on left side */}
        <img src={menuIcon} alt="Menu"/>
        {/* Quick Find Box */}
        <form className="search-form">
          <input type="search" id="search" name="search" placeholder="Quick Find"/>
        </form>
        {/*counter text on right side with check icon */}
        <TaskCounter tasks={tasks}/>
      </header>

      {/* Left Navigation Section */}
      <nav className="sidebar" aria-label="Left navigation">
        {/*List in the left navigation currently has 3 items that contain an icon, label, and count */}
        <ul className="sidebar-list">
          <li>
            <a className="sidebar-list-item">
              <img src={inboxIcon} alt="Inbox"/>
              Inbox
              <span className="sidebar-list-count">{activeCount}</span> {/*TODO: update 5 to actual count?!! */}
              </a>
              </li>
              <li>
                <a className="sidebar-list-item">
                  <img src={calendarIcon} alt="Calendar"/>
                  Today
                  <span className="sidebar-list-count">5</span> {/*TODO: update 5 to actual count?!! */}
                </a>
              </li>
              <li>
                {/*Upcoming list item doesn't have a count */}
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
        {/* new adding the 3 filters under Inbox header!! */}
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
        <TaskList tasks={visibleTasks} onToggleTask={toggleTask} onDeleteTask={deleteTask} /> {/* doing visibleTasks for filtering! */}
      </main>


      {/*<p>Replace this with your components.</p>
      <TaskCounter tasks={tasks}/>
      <TaskList task={tasks} onDeleteTask={deleteTask} />
      <TaskForm onAddTask={addTask} />*/}
      </>
  )
}

export default App
