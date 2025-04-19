import { useState, useEffect } from 'react';
import { Search, Moon, Sun, Plus, X, Check, Instagram } from 'lucide-react';

export default function TodoList() {
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Color palette
  const colors = {
    primary: '#2E073F',
    secondary: '#7A1CAC',
    accent: '#AD49E1',
    background: '#EBD3F8',
    // Warna tambahan untuk mode gelap
    darkPrimary: '#1A0425',
    darkSecondary: '#5A1480',
    darkAccent: '#8C3AB8',
    darkBackground: '#1A0425'
  };

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: Date.now(),
        title: newTask,
        description: newDescription,
        completed: false,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
      setNewDescription('');
      setIsAdding(false);
    }
  };

  // Function to toggle task completion
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filter tasks based on search query
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div 
      className="min-h-screen transition-colors duration-300 flex flex-col" 
      style={{ 
        backgroundColor: darkMode ? colors.darkBackground : colors.background,
        color: darkMode ? '#fff' : colors.primary
      }}
    >
      <div className="container mx-auto p-4 md:p-8 flex-grow">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 
            className="text-4xl font-bold" 
            style={{ 
              fontFamily: 'system-ui', 
              color: darkMode ? colors.accent : colors.primary,
              textShadow: darkMode ? `2px 2px 0 ${colors.darkSecondary}` : `3px 3px 0 ${colors.secondary}` 
            }}
          >
            todolist
          </h1>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="p-2 rounded-lg shadow-md border-4"
            style={{ 
              backgroundColor: darkMode ? colors.darkPrimary : '#fff',
              color: darkMode ? colors.accent : colors.secondary,
              borderColor: darkMode ? colors.darkSecondary : colors.primary,
              boxShadow: darkMode ? `4px 4px 0 ${colors.darkPrimary}` : `4px 4px 0 ${colors.primary}`
            }}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </header>

        {/* Search and Add Task */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div 
            className="flex items-center p-3 rounded-lg border-4 flex-1"
            style={{
              backgroundColor: darkMode ? colors.darkPrimary : '#fff',
              borderColor: darkMode ? colors.darkSecondary : colors.primary,
              boxShadow: darkMode ? `4px 4px 0 ${colors.darkSecondary}` : `4px 4px 0 ${colors.primary}`
            }}
          >
            <Search size={20} style={{ color: darkMode ? colors.accent : colors.secondary }} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-2 w-full focus:outline-none"
              style={{
                backgroundColor: darkMode ? colors.darkPrimary : '#fff',
                color: darkMode ? '#fff' : colors.primary
              }}
            />
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center justify-center p-3 rounded-lg text-white font-bold border-4"
            style={{
              backgroundColor: darkMode ? colors.accent : colors.secondary,
              borderColor: darkMode ? colors.darkAccent : colors.primary,
              boxShadow: darkMode ? `4px 4px 0 ${colors.darkAccent}` : `4px 4px 0 ${colors.primary}`
            }}
          >
            <Plus size={20} className="mr-2" />
            Add Task
          </button>
        </div>

        {/* Add Task Form */}
        {isAdding && (
          <div 
            className="mb-8 p-6 rounded-lg border-4"
            style={{
              backgroundColor: darkMode ? colors.darkPrimary : '#fff',
              borderColor: darkMode ? colors.darkSecondary : colors.primary,
              boxShadow: darkMode ? `6px 6px 0 ${colors.darkSecondary}` : `6px 6px 0 ${colors.primary}`
            }}
          >
            <h2 
              className="text-xl font-bold mb-4"
              style={{ color: darkMode ? colors.accent : colors.secondary }}
            >
              Add New Task
            </h2>
            <div className="mb-4">
              <label className="block mb-2 font-bold">Title</label>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="w-full p-3 rounded border-2"
                style={{
                  backgroundColor: darkMode ? '#2A0A33' : colors.background,
                  borderColor: darkMode ? colors.darkSecondary : colors.primary,
                  color: darkMode ? '#fff' : colors.primary
                }}
                placeholder="Task title"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold">Description</label>
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full p-3 rounded border-2"
                style={{
                  backgroundColor: darkMode ? '#2A0A33' : colors.background,
                  borderColor: darkMode ? colors.darkSecondary : colors.primary,
                  color: darkMode ? '#fff' : colors.primary
                }}
                placeholder="Task description"
                rows="3"
              />
            </div>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setIsAdding(false)}
                className="p-2 px-4 rounded font-bold border-2"
                style={{
                  backgroundColor: darkMode ? '#2A0A33' : '#e5e5e5',
                  borderColor: darkMode ? colors.darkSecondary : colors.primary,
                  color: darkMode ? colors.accent : colors.primary
                }}
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="p-2 px-4 rounded text-white font-bold border-2"
                style={{
                  backgroundColor: darkMode ? colors.accent : colors.secondary,
                  borderColor: darkMode ? colors.darkAccent : colors.primary
                }}
              >
                Add Task
              </button>
            </div>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div 
              className="text-center p-10 rounded-lg border-4"
              style={{
                backgroundColor: darkMode ? colors.darkPrimary : '#fff',
                borderColor: darkMode ? colors.darkSecondary : colors.primary,
                color: darkMode ? colors.accent : colors.secondary,
                boxShadow: darkMode ? `6px 6px 0 ${colors.darkSecondary}` : `6px 6px 0 ${colors.primary}`
              }}
            >
              {searchQuery ? 'No tasks match your search' : 'No tasks yet. Add one!'}
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="p-6 rounded-lg border-4"
                style={{
                  backgroundColor: darkMode ? colors.darkPrimary : '#fff',
                  borderColor: task.completed 
                    ? darkMode ? colors.accent : colors.secondary 
                    : darkMode ? colors.darkSecondary : colors.primary,
                  boxShadow: darkMode 
                    ? `6px 6px 0 ${colors.darkSecondary}` 
                    : `6px 6px 0 ${colors.primary}`
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleComplete(task.id)}
                      className="p-2 rounded-lg border-2"
                      style={{
                        backgroundColor: task.completed
                          ? darkMode ? colors.accent : colors.secondary
                          : darkMode ? '#2A0A33' : colors.background,
                        borderColor: darkMode 
                          ? task.completed ? colors.darkAccent : colors.darkSecondary 
                          : colors.primary,
                        color: task.completed ? '#fff' : darkMode ? colors.accent : colors.secondary
                      }}
                    >
                      {task.completed ? <Check size={20} /> : null}
                    </button>
                    <div>
                      <h3 
                        className={`text-xl font-bold mb-2 ${task.completed ? 'line-through opacity-70' : ''}`}
                        style={{ color: darkMode ? '#fff' : colors.primary }}
                      >
                        {task.title}
                      </h3>
                      {task.description && (
                        <p 
                          className={`${task.completed ? 'line-through opacity-70' : ''}`}
                          style={{ color: darkMode ? colors.accent : colors.secondary }}
                        >
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 rounded-lg border-2 text-white"
                    style={{
                      backgroundColor: darkMode ? '#b91c1c' : '#ef4444',
                      borderColor: darkMode ? '#7f1d1d' : colors.primary
                    }}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer 
        className="p-4 border-t text-center"
        style={{
          borderColor: darkMode ? colors.darkSecondary : colors.secondary,
          backgroundColor: darkMode ? colors.darkPrimary : 'rgba(255, 255, 255, 0.7)'
        }}
      >
        <div className="flex items-center justify-center gap-3">
          <p style={{ color: darkMode ? '#fff' : colors.primary }}>
            Made by Riki Ripaldi
          </p>
          <a 
            href="https://www.instagram.com/ripaldiki/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: darkMode ? colors.accent : colors.secondary,
              boxShadow: darkMode ? `2px 2px 0 ${colors.darkSecondary}` : `2px 2px 0 ${colors.primary}`,
              border: darkMode ? `2px solid ${colors.darkAccent}` : `2px solid ${colors.primary}`
            }}
          >
            <Instagram size={20} color="#fff" />
          </a>
        </div>
      </footer>
    </div>
  );
}