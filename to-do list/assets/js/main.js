const inputNewTask = document.querySelector('.input-new-task');
const btnAddTask = document.querySelector('.btn-add-task');
const tasks = document.querySelector('.tasks');

function createListItem() {
    const listItem = document.createElement('li');
    return listItem;
}

inputNewTask.addEventListener('keypress', function(e){
    if (e.keyCode === 13) {
        if (!inputNewTask.value) return;
        createTask(inputNewTask.value);
    }
});

function resetInput() {
    inputNewTask.value = '';
    inputNewTask.focus();
}

function createBTNDel(listItem) {
    const btnDel = document.createElement('button');
    btnDel.innerText = 'Delete';
    btnDel.setAttribute('class', 'del ')
    btnDel.setAttribute('title', 'Delete task')
    listItem.appendChild(btnDel);
}

function createTask(textInput) {
    const listItem = createListItem();
    listItem.innerText = textInput;
    tasks.appendChild(listItem);
    resetInput();
    createBTNDel(listItem);
    saveTasks();
}

btnAddTask.addEventListener('click', function(e) {
    if (!inputNewTask.value) return;
    createTask(inputNewTask.value);
});

document.addEventListener('click', function(e) {
    const el = e.target;
    if (el.classList.contains('del')) {
        el.parentElement.remove();
        saveTasks();
    }
})

function saveTasks() {
    const liTasks = tasks.querySelectorAll('li');
    const tasksLists = [];
    for (let task of liTasks) {
        let textTask = task.innerText.trim();
        tasksLists.push(textTask);
    }
    const tasksJSON = JSON.stringify(tasksLists);
    localStorage.setItem('tasks', tasksJSON);
}


function addSaveTasks() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
        const tasksLists = JSON.parse(tasks);
        for (let task of tasksLists) {
            createTask(task);
        }
    }
}
addSaveTasks();