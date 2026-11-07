const alunos = [];
let indiceEdicao = null;

const form = document.getElementById("formAluno");
const campoNome = document.getElementById("nome");
const campoIdade = document.getElementById("idade");
const campoCurso = document.getElementById("curso");
const campoNota = document.getElementById("notaFinal");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");
const tituloFormulario = document.getElementById("tituloFormulario");
const tabela = document.getElementById("tabelaAlunos");
const mensagemVazia = document.getElementById("mensagemVazia");
const tituloRelatorio = document.getElementById("tituloRelatorio");
const resultadoRelatorio = document.getElementById("resultadoRelatorio");

const lerFormulario = () => new Aluno(
    campoNome.value.trim(),
    Number(campoIdade.value),
    campoCurso.value,
    Number(campoNota.value)
);

const limparFormulario = () => {
    form.reset();
    indiceEdicao = null;
    tituloFormulario.textContent = "Cadastrar Aluno";
    btnSalvar.textContent = "Cadastrar";
    btnCancelar.hidden = true;
};

const preencherFormulario = (aluno) => {
    campoNome.value = aluno.nome;
    campoIdade.value = aluno.idade;
    campoCurso.value = aluno.curso;
    campoNota.value = aluno.notaFinal;
};

const criarCelula = (texto) => {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
};

const criarBotao = (texto, acao) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = texto;
    botao.addEventListener("click", function () {
        acao();
    });
    return botao;
};

const renderizarTabela = () => {
    tabela.innerHTML = "";
    mensagemVazia.hidden = alunos.length > 0;

    alunos.forEach((aluno, indice) => {
        const tr = document.createElement("tr");
        tr.appendChild(criarCelula(aluno.nome));
        tr.appendChild(criarCelula(aluno.idade));
        tr.appendChild(criarCelula(aluno.curso));
        tr.appendChild(criarCelula(aluno.notaFinal.toFixed(1)));
        tr.appendChild(criarCelula(aluno.isAprovado() ? "Aprovado" : "Reprovado"));

        const acoes = document.createElement("td");
        acoes.appendChild(criarBotao("Editar", () => editarAluno(indice)));
        acoes.appendChild(criarBotao("Excluir", () => excluirAluno(indice)));
        tr.appendChild(acoes);

        tabela.appendChild(tr);
    });
};

const salvarAluno = () => {
    const aluno = lerFormulario();

    if (indiceEdicao === null) {
        alunos.push(aluno);
        alert(`Aluno cadastrado: ${aluno.toString()}`);
        console.log("Aluno cadastrado:", aluno.toString());
    } else {
        alunos[indiceEdicao] = aluno;
        alert(`Aluno atualizado: ${aluno.toString()}`);
        console.log("Aluno atualizado:", aluno.toString());
    }

    limparFormulario();
    renderizarTabela();
};

const editarAluno = (indice) => {
    indiceEdicao = indice;
    preencherFormulario(alunos[indice]);
    tituloFormulario.textContent = "Editar Aluno";
    btnSalvar.textContent = "Salvar alterações";
    btnCancelar.hidden = false;
    console.log("Editando aluno:", alunos[indice].toString());
};

const excluirAluno = (indice) => {
    const aluno = alunos[indice];
    if (!confirm(`Deseja excluir ${aluno.nome}?`)) return;

    alunos.splice(indice, 1);
    if (indiceEdicao === indice) limparFormulario();
    else if (indiceEdicao !== null && indiceEdicao > indice) indiceEdicao--;

    alert(`Aluno excluído: ${aluno.nome}`);
    console.log("Aluno excluído:", aluno.toString());
    renderizarTabela();
};

const mostrarRelatorio = (titulo, linhas) => {
    tituloRelatorio.textContent = titulo;
    resultadoRelatorio.innerHTML = "";

    const itens = linhas.length > 0 ? linhas : ["Nenhum dado para exibir."];
    itens.forEach((linha) => {
        const li = document.createElement("li");
        li.textContent = linha;
        resultadoRelatorio.appendChild(li);
    });
};

const calcularMedia = (valores) =>
    valores.length === 0 ? 0 : valores.reduce((soma, valor) => soma + valor, 0) / valores.length;

const relatorioAprovados = () => {
    const aprovados = alunos
        .filter((aluno) => aluno.isAprovado())
        .map((aluno) => aluno.toString());
    mostrarRelatorio(`Alunos aprovados (${aprovados.length})`, aprovados);
};

const relatorioMediaNotas = () => {
    const media = calcularMedia(alunos.map((aluno) => aluno.notaFinal));
    mostrarRelatorio("Média das notas finais", alunos.length ? [media.toFixed(2)] : []);
};

const relatorioMediaIdades = () => {
    const media = calcularMedia(alunos.map((aluno) => aluno.idade));
    mostrarRelatorio("Média das idades", alunos.length ? [`${media.toFixed(1)} anos`] : []);
};

const relatorioOrdemAlfabetica = () => {
    const nomes = alunos
        .map((aluno) => aluno.nome)
        .sort((a, b) => a.localeCompare(b, "pt-BR"));
    mostrarRelatorio("Nomes em ordem alfabética", nomes);
};

const relatorioPorCurso = () => {
    const contagem = alunos.reduce((acc, aluno) => {
        acc[aluno.curso] = (acc[aluno.curso] || 0) + 1;
        return acc;
    }, { JavaScript: 0, Python: 0, Java: 0 });

    const linhas = [];
    Object.entries(contagem).forEach(([curso, quantidade]) => {
        linhas.push(`${curso}: ${quantidade} aluno(s)`);
    });
    mostrarRelatorio("Quantidade de alunos por curso", alunos.length ? linhas : []);
};

form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    salvarAluno();
});

btnCancelar.addEventListener("click", function () {
    limparFormulario();
    console.log("Edição cancelada");
});

document.getElementById("btnAprovados").addEventListener("click", function () {
    relatorioAprovados();
});
document.getElementById("btnMediaNotas").addEventListener("click", function () {
    relatorioMediaNotas();
});
document.getElementById("btnMediaIdades").addEventListener("click", function () {
    relatorioMediaIdades();
});
document.getElementById("btnOrdemAlfabetica").addEventListener("click", function () {
    relatorioOrdemAlfabetica();
});
document.getElementById("btnPorCurso").addEventListener("click", function () {
    relatorioPorCurso();
});

renderizarTabela();
