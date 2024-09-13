
const addButton = document.querySelector('.addButton');
const inputField = document.querySelector('input[type="text"]');
const tasksWrapper = document.querySelector('.tasks-wrapper');
const categories = document.querySelectorAll('.categories');
const checkboxes = document.querySelectorAll('.checkbox');
const clearButton = document.querySelector('.clearButton');

// for adding the task
addButton.addEventListener('click', () => {
    const taskText = inputField.value.trim();
    if (taskText) {
        const taskElement = document.createElement('li');
        taskElement.classList.add('tasks');
        taskElement.innerHTML = `
            <li>${taskText}</li>
            <input type="checkbox" class="checkbox">
        `;
        tasksWrapper.appendChild(taskElement);
        inputField.value = '';
        saveData();
    }
});

//To filter categories
categories.forEach((category, index) => {
    category.addEventListener('click', () => {
        categories.forEach((cat) => cat.classList.remove('category-checked'));
        category.classList.add('category-checked');

        const tasks = document.querySelectorAll('.tasks');
        tasks.forEach((task) => {
            const checkbox = task.querySelector('.checkbox');
            if (index === 0 && checkbox.checked) {
                task.style.display = 'flex'; 
            } else if (index === 1 && !checkbox.checked) {
                task.style.display = 'flex'; 
            } else if (index === 2) {
                task.style.display = 'flex'; 
            } else {
                task.style.display = 'none'; 
            }
        });
    });
});

//for checking/unchecking a task
tasksWrapper.addEventListener('change', (event) => {
    if (event.target.classList.contains('checkbox')) {
        const task = event.target.closest('.tasks');
        if (event.target.checked) {
            task.classList.add('checked'); 
        } else {
            task.classList.remove('checked'); 
        }
        saveData();
    }
});

// To save data in local storage
function saveData(){
    const tasks = Array.from(tasksWrapper.children);
    const tasksData = tasks.map((task) => {
        const checkbox = task.querySelector('.checkbox');
        return {
            text: task.textContent.trim(),
            checked: checkbox.checked
        };
    });
    localStorage.setItem("data", JSON.stringify(tasksData));
}

// To fetch data from local storage
function showTask(){
    const tasksData = JSON.parse(localStorage.getItem("data"));
    tasksWrapper.innerHTML = '';
    tasksData.forEach((task) => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('tasks');
        taskElement.innerHTML = `
            <li>${task.text}</li>
            <input type="checkbox" class="checkbox" ${task.checked ? 'checked' : ''}>
        `;
        tasksWrapper.appendChild(taskElement);
        if (task.checked) {
            taskElement.classList.add('checked');
        }
    });
}


//To delete button tasks
clearButton.addEventListener('click', () => {
    const currentCategory = document.querySelector('.category-checked');
    let tasksToDelete;

    if (currentCategory) {
        const currentIndex = Array.from(categories).indexOf(currentCategory);
        tasksToDelete = Array.from(tasksWrapper.children).filter((task) => {
            const checkbox = task.querySelector('.checkbox');
            if (currentIndex === 0 && checkbox.checked) 
                return true;
            if (currentIndex === 1 && !checkbox.checked) 
                return true;
            if (currentIndex === 2) 
                return true;
            return false;
        });
    } else {
        tasksToDelete = Array.from(tasksWrapper.children);
    }

    tasksToDelete.forEach((task) => task.remove());
    saveData();
});

// To fetch data from local storage just after opening/refreshing the site
showTask();