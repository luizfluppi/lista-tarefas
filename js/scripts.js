function salvarTarefas(tarefas) {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    exibirTarefas();
}

function lerTarefas() {
   let tarefas = localStorage.getItem('tarefas');
   let tarefasObj = {};

   if (tarefas != null) {
        tarefasObj = JSON.parse(tarefas);
   }
   else {
        tarefasObj = {
            tarefas: [
                {
                    nome: "Exemplo",
                    concluida: false
                },
                {
                    nome: "Exemplo concluído",
                    concluida: true
                }
            ]
        }
   }

   return tarefasObj;
}

function apagarTarefa(i) {
    let objTarefas = lerTarefas();
    objTarefas.tarefas.splice(i,1);
    salvarTarefas(objTarefas);
}

function adicionarTarefa(){
    let tarefas = lerTarefas();

    let nomeNovaTarefa = document.getElementById("campoNovaTarefa").value;
    let novaTarefa = {
        nome: nomeNovaTarefa,
        concluida: false
    }

    tarefas.tarefas.push(novaTarefa);
    salvarTarefas(tarefas);
}

function atualizarTarefa(i) {
    let objTarefas = lerTarefas();
    if (objTarefas.tarefas[i].concluida == true){
        objTarefas.tarefas[i].concluida = false;
    }
    else {
        objTarefas.tarefas[i].concluida = true;
    }
    salvarTarefas(objTarefas);
}

function exibirTarefas() {
    let corpoTabela = document.getElementById('tableBody')
    let objTarefas = lerTarefas();
    let concluida = ''
    let strHtml = '';
    
    for (i = 0; i < objTarefas.tarefas.length ; i++ ){
        if (objTarefas.tarefas[i].concluida) {
            concluida = ` checked`;
        }
        else {
            concluida = ''
        }
        strHtml += `
            <tr>
                <td>${objTarefas.tarefas[i].nome}</td>
                <td><input type="checkbox" onchange="atualizarTarefa(${i})"${concluida}></th>
                <td><button type="button" onclick="apagarTarefa(${i})" class="btn btn-danger">Excluir</button></td>
            </tr>
        `;
    }
    
    corpoTabela.innerHTML = strHtml;
}