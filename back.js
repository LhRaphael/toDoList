// chave para acessar o localStorage
const CHAVE = "tasks"

function adicionar(){
    let tarefa = document.getElementById("taskInput")
    let listaTarefa = JSON.parse(localStorage.getItem(CHAVE)) || []

    // verifica se a tarefa já existe
    if(listaTarefa.some(item => item.valor === tarefa.value)){
        return alert("Essa tarefa já existe")
    }

    // criação da tarefa
    let tarefaFinal = {
        valor: tarefa.value, // valor da tarefa
        prioridade: "normal", // prioridade padrão da tarefa
        completo: false // verifica se a tarefa foi concluida ou não
    }

    // salvando a tarefa no array
    listaTarefa.push(tarefaFinal)

    // salvando o array no localstorage
    localStorage.setItem(CHAVE,JSON.stringify(listaTarefa))

    carregarTarefas()
}

function carregarTarefas(){
    let lista = document.getElementById("taskList")
    let listaTarefa = JSON.parse(localStorage.getItem(CHAVE)) || []

    listaTarefa.forEach(element => {
        const li = document.createElement("li")
        li.className = "task"+element.prioridade

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.addEventListener('change', ()=>{
            li.classList.toggle("completed")
            element.completo = !element.completo
        })

        const span = document.createElement("span")
        span.textContent = element.valor

        const menuPrioridade = document.createElement("div")
        menuPrioridade.className = 'priority-menu'
        menuPrioridade.innerHTML = '!'
        const menu = document.createElement('div')
        menu.className = 'menu'

        // lista de categorias para a tarefa
        const prioridades = ['urgente','importante','normal']
        prioridades.forEach(prioridade => {
            const option = document.createElement('div')
            option.textContent = prioridade
            option.className = prioridade
            option.addEventListener('click', () => {
                li.className = 'task' + prioridade.toLowerCase()
            })
            menu.appendChild(option)
        })

        menuPrioridade.appendChild(menu)

        const modificarBotao = document.createElement('button')
        modificarBotao.textContent = 'md'
        modificarBotao.addEventListener('click',()=>{
            const entrada = document.createElement('input')
            entrada.value = span.textContent
            span.parentNode.replaceChild(entrada,span)

            entrada.addEventListener('blur',()=>{
                const novaEntrada = document.createElement('span')
                novaEntrada.textContent = entrada.value
                entrada.parentNode.replaceChild(novaEntrada,entrada)
            })
            
        })

        const deletarBotao = document.createElement('button')
        deletarBotao.textContent = 'Excluir'
        deletarBotao.addEventListener('click', () => {
            li.remove()
        })

        li.appendChild(checkbox)
        li.appendChild(span)
        li.appendChild(menuPrioridade)
        li.appendChild(modificarBotao)
        li.appendChild(deletarBotao)
        lista.appendChild(li)
    })

}