var alunos = [];
var indiceEdicao = null;

function salvarAluno() {
    var nome = document.getElementById("nome").value.trim();
    var idade = document.getElementById("idade").value;
    var curso = document.getElementById("curso").value;
    var notaFinal = document.getElementById("notaFinal").value;

    if (nome === "" || idade === "" || curso === "" || notaFinal === "") {
        alert("Preencha todos os campos.");
        return;
    }

    var aluno = new Aluno(nome, Number(idade), curso, Number(notaFinal));

    if (indiceEdicao === null) {
        alunos.push(aluno);
        console.log("Cadastrado: " + aluno.toString());
    } else {
        alunos[indiceEdicao] = aluno;
        console.log("Atualizado: " + aluno.toString());
    }

    limparFormulario();
    renderizarTabela();
}

function editarAluno(indice) {
    var aluno = alunos[indice];
    document.getElementById("nome").value = aluno.nome;
    document.getElementById("idade").value = aluno.idade;
    document.getElementById("curso").value = aluno.curso;
    document.getElementById("notaFinal").value = aluno.notaFinal;

    indiceEdicao = indice;
    document.getElementById("tituloFormulario").textContent = "Editar Aluno";
    document.getElementById("btnSalvar").textContent = "Salvar alterações";
}

function excluirAluno(indice) {
    if (!confirm("Deseja excluir " + alunos[indice].nome + "?")) {
        return;
    }

    alunos.splice(indice, 1);
    limparFormulario();
    renderizarTabela();
}

function limparFormulario() {
    document.getElementById("formAluno").reset();
    indiceEdicao = null;
    document.getElementById("tituloFormulario").textContent = "Cadastrar Aluno";
    document.getElementById("btnSalvar").textContent = "Cadastrar";
}

function criarCelula(texto) {
    var td = document.createElement("td");
    td.textContent = texto;
    return td;
}

function renderizarTabela() {
    var tabela = document.getElementById("tabelaAlunos");
    tabela.innerHTML = "";

    for (var i = 0; i < alunos.length; i++) {
        var aluno = alunos[i];
        var tr = document.createElement("tr");

        tr.appendChild(criarCelula(aluno.nome));
        tr.appendChild(criarCelula(aluno.idade));
        tr.appendChild(criarCelula(aluno.curso));
        tr.appendChild(criarCelula(aluno.notaFinal.toFixed(1)));
        tr.appendChild(criarCelula(aluno.isAprovado() ? "Aprovado" : "Reprovado"));

        var acoes = document.createElement("td");
        acoes.innerHTML =
            '<button type="button" onclick="editarAluno(' + i + ')">Editar</button> ' +
            '<button type="button" onclick="excluirAluno(' + i + ')">Excluir</button>';
        tr.appendChild(acoes);

        tabela.appendChild(tr);
    }
}
