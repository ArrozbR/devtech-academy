# DevTech Academy - Gerenciamento de Alunos

Trabalho da disciplina em que a gente monta um sistema simples pra uma escola de programação fictícia, a DevTech Academy. Dá pra cadastrar alunos, editar, excluir e ver alguns relatórios em cima dos dados.

É tudo HTML e JavaScript puro, sem CSS e sem framework. Os dados ficam só em memória, então se recarregar a página eles somem (é proposital, o enunciado pede assim).

## Rodando o projeto

Precisa ter o Docker instalado e aberto. Na pasta do projeto:

```bash
docker compose up -d --build
```

Depois é só abrir http://localhost:8080 no navegador.

A pasta `src` fica ligada ao container, então dá pra mexer no código e só dar F5 na página pra ver a mudança. Quando terminar:

```bash
docker compose down
```

## Como está organizado

- `src/index.html`: o formulário, a tabela e a área de relatórios
- `src/js/aluno.js`: a classe `Aluno`
- `src/js/app.js`: toda a lógica da página (cadastro, edição, exclusão e relatórios)
- `Dockerfile` e `docker-compose.yml`: sobem um nginx servindo a pasta `src`

## O que foi feito em cada exercício

Fiz um commit por exercício, então dá pra acompanhar a evolução pelo histórico do Git.

**Exercício 1** - Formulário com nome, idade, curso e nota final, e uma tabela com os alunos cadastrados. Cada linha tem botão de editar e excluir. Nessa versão os alunos são objetos simples dentro de um array e os botões usam `onclick` direto no HTML.

**Exercício 2** - Criei a classe `Aluno` com construtor e os métodos `isAprovado()` (aprovado com nota 7 ou mais) e `toString()`. A tabela ganhou uma coluna mostrando se o aluno passou ou não.

**Exercício 3** - Tirei os `onclick` do HTML e passei a registrar os eventos com `addEventListener`, usando funções anônimas. A parte que mexe nos dados foi reescrita com arrow functions. Também aparece um `alert` (e um `console.log`) quando um aluno é cadastrado, editado ou excluído.

**Exercício 4** - Adicionei os relatórios: alunos aprovados, média das notas, média das idades, nomes em ordem alfabética e quantidade de alunos por curso. Usei `filter`, `map`, `reduce`, `sort` e `forEach` pra montar cada um.
