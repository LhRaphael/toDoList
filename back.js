// chave para acessar o localStorage
const CHAVE = "task"

function coletarLista(){
    return JSON.parse(localStorage.getItem(CHAVE)) || []
}

function salvarLista(lista){
    localStorage.setItem(CHAVE, JSON.stringify(lista))
}


function adicionar(){
    let tarefa = document.getElementById("taskInput")
    let listaTarefa = coletarLista()

    console.log(listaTarefa)

    // verifica se a tarefa já existe
    if(listaTarefa.some(item => item.valor === tarefa.value)){
        return alert("Essa tarefa já existe")
    }

    if(tarefa.value == ''){
        return alert("Nenhuma tarefa foi adicionada")
    }

    // criação da tarefa
    let tarefaFinal = {
        valor: tarefa.value, // valor da tarefa
        prioridade: "incompleto", // prioridade padrão da tarefa
        completo: false // verifica se a tarefa foi concluida ou não
    }

    // salvando a tarefa no array
    listaTarefa.push(tarefaFinal)

    // salvando o array no localstorage
    salvarLista(listaTarefa)

    carregarTarefas()

    // apaga o texto do input
    tarefa.value = ''
}

function carregarTarefas(){
    let lista = document.getElementById("taskList")
    let listaTarefa = coletarLista()

    // para atualizar a tarefa
    lista.innerHTML = ''

    listaTarefa.forEach(element => {
        const li = document.createElement("li")
        li.className = "task"+element.prioridade

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"

        // nao resolvido
        checkbox.addEventListener('click', ()=>{
            // se for verdadeiro se torna falso, caso falso será verdadeiro
            element.completo = element.completo == true? false : true
            itemCompleto(li,element, listaTarefa)
            
        })

        const span = document.createElement("span")
        span.textContent = element.valor

        const menuPrioridade = document.createElement("div")
        menuPrioridade.className = 'priority-menu'
        menuPrioridade.innerHTML = '!'
        const menu = document.createElement('div')
        menu.className = 'menu'

        // lista de prioridade para a tarefa

        // menu de alteração
        const prioridades = ['urgente','importante','normal']
        prioridades.forEach(prioridade => {
            const option = document.createElement('div')
            option.textContent = prioridade
            option.className = prioridade
            // alteração da prioridade
            option.addEventListener('click', () => {
                itemPrioridade(li,element,option.textContent,listaTarefa)                

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
                if(listaTarefa.some(item => item.valor === entrada.value) && entrada.value != span.textContent){
                    return alert("Essa tarefa já existe")
                }
                const novaEntrada = document.createElement('span')
                novaEntrada.textContent = entrada.value
                modificarTarefa(element,novaEntrada.textContent)
                entrada.parentNode.replaceChild(novaEntrada,entrada)
                location.reload()
            })
            
        })

        const deletarBotao = document.createElement('button')
        deletarBotao.textContent = 'Excluir'
        deletarBotao.addEventListener('click', () => {
            li.remove()
            removerTarefa(element)
        })

        itemCompleto(li,element, listaTarefa)

        // carrega as prioridades existentes caso não estejam concluidas
        if(element.completo == false){
            carregarPrioridade(li, element)
        }


        li.appendChild(checkbox)
        li.appendChild(span)
        li.appendChild(menuPrioridade)
        li.appendChild(modificarBotao)
        li.appendChild(deletarBotao)
        lista.appendChild(li)

    })
    
    console.log(listaTarefa)
}

function itemPrioridade(tag, elemento, nivel, lista){
    tag.className = nivel
    elemento.prioridade = nivel
    
    salvarLista(lista)
}

function carregarPrioridade(tag, elemento){
    tag.className = elemento.prioridade
}

function itemCompleto(tag, element, lista){
    if(element.completo == true){
        tag.className = "completo"
    }
    else{
        tag.className = element.prioridade

    }

    salvarLista(lista)
}

function removerTarefa(item){
    let listaTarefa = coletarLista()

    let novaLista = listaTarefa.filter(elemento => elemento.valor !== item.valor)

    salvarLista(novaLista)
}

function modificarTarefa(item, novoNome){
    let listaTarefa = coletarLista()

    listaTarefa.forEach(elemento =>{
        if(elemento.valor == item.valor)
            elemento.valor = novoNome
    })

    salvarLista(listaTarefa)
    
}

document.addEventListener('DOMContentLoaded', carregarTarefas)