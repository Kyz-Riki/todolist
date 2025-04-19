document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const taskList = document.getElementById('taskList');
    const totalTasksSpan = document.getElementById('totalTasks');
    const completedTasksSpan = document.getElementById('completedTasks');
    const themeToggle = document.getElementById('themeToggle');
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
    
    function updateStats() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        
        totalTasksSpan.textContent = `Total: ${totalTasks}`;
        completedTasksSpan.textContent = `Completed: ${completedTasks}`;
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function renderTasks(filteredTasks = null) {
        taskList.innerHTML = '';
        
        const tasksToRender = filteredTasks || tasks;
        
        tasksToRender.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            taskItem.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <button class="delete-btn">×</button>
            `;
            
            const checkbox = taskItem.querySelector('.task-checkbox');
            const deleteBtn = taskItem.querySelector('.delete-btn');
            
            checkbox.addEventListener('change', function() {
                tasks[index].completed = this.checked;
                taskItem.classList.toggle('completed', this.checked);
                updateStats();
            });
            
            deleteBtn.addEventListener('click', function() {
                tasks.splice(index, 1);
                renderTasks();
                updateStats();
            });
            
            taskList.appendChild(taskItem);
        });
        
        updateStats();
    }
    
    function addTask() {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({
                text: text,
                completed: false
            });
            
            taskInput.value = '';
            renderTasks();
            taskInput.focus();
        }
    }
    
    function searchTasks() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm) {
            const filteredTasks = tasks.filter(task => 
                task.text.toLowerCase().includes(searchTerm)
            );
            renderTasks(filteredTasks);
        } else {
            renderTasks();
        }
    }
    
    function toggleTheme() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        themeToggle.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
        localStorage.setItem('theme', currentTheme);
    }
    
    addTaskBtn.addEventListener('click', addTask);
    searchBtn.addEventListener('click', searchTasks);
    themeToggle.addEventListener('click', toggleTheme);
    
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchTasks();
        }
    });
    
    // Focus the input field on load
    taskInput.focus();
    
    renderTasks();
});
