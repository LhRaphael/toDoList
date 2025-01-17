function addTask() {
    // coleta os elementos do html para usar no js
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // caso nada tenha sido escrito, apenas ignora o input
    if (taskInput.value.trim() === '') return;

    // criação do elemento que ira armazenar a tarefa
    const li = document.createElement('li');
    li.className = 'task';

    // criação da caixa de seleção para a tarefa (se foi concluida ou não)
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    // criação do elemento para identificar a tarefa
    const span = document.createElement('span');
    span.textContent = taskInput.value;

    // criação do elemento para exibir a categoria da tarefa (nivel de importancia)
    const priorityMenu = document.createElement('div');
    priorityMenu.className = 'priority-menu';
    priorityMenu.innerHTML = '...';
    const menu = document.createElement('div');
    menu.className = 'menu';

    // Array contendo as categorias de cada tarefa
    ['Importante', 'Média', 'Normal'].forEach(priority => {
        const option = document.createElement('div');
        option.textContent = priority;
        option.className = priority.toLowerCase();
        option.addEventListener('click', () => {
            li.className = 'task ' + priority.toLowerCase();
            saveTasks();
        });
        menu.appendChild(option);
    });

    priorityMenu.appendChild(menu);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(li);
        saveTasks();
    });

    // exibindo os elementos criados na tela
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(priorityMenu);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
    taskInput.value = '';

    // salvando o  progresso no LocalStorage
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];

    // converte o elemento li para uma coleção e salva em um array
    taskList.querySelectorAll('li').forEach(task => {
        tasks.push({
            text: task.querySelector('span').textContent,
            completed: task.classList.contains('completed'),
            priority: task.className.replace('task ', '')
        });
    });

    // converte o array para um json e salva no LocalStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    // converte o Json com as tarefas para um array novamente 
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];


    // implementação da logica para exibir os elementos salvos em tela
    tasks.forEach(taskData => {
        const li = document.createElement('li');
        li.className = 'task ' + taskData.priority;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = taskData.completed;
        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        const span = document.createElement('span');
        span.textContent = taskData.text;

        const priorityMenu = document.createElement('div');
        priorityMenu.className = 'priority-menu';
        priorityMenu.innerHTML = '...';
        const menu = document.createElement('div');
        menu.className = 'menu';

        ['Importante', 'Média', 'Normal'].forEach(priority => {
            const option = document.createElement('div');
            option.textContent = priority;
            option.className = priority.toLowerCase();
            option.addEventListener('click', () => {
                li.className = 'task ' + priority.toLowerCase();
                saveTasks();
            });
            menu.appendChild(option);
        });

        priorityMenu.appendChild(menu);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });

        if (taskData.completed) {
            li.classList.add('completed');
        }

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(priorityMenu);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

// carrega as tarefas caso existam assim que o usuario entra no programa
document.addEventListener('DOMContentLoaded', loadTasks);