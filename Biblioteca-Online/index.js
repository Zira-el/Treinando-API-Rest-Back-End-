const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const livros = [
  {
    id: 1,
    titulo: "A Odisséia de Jonas",
    autor: "Thomas Crawling",
    ano: 2001,
    numPaginas: 197
  },
  {
    id: 2,
    titulo: "Jonas e a sociedade escondida",
    autor: "Claire Crawling",
    ano: 2004,
    numPaginas: 158
  }
];

app.get("/livros", (req, res) => {
  res.json(livros);
  return;
});

app.get("/livros/:id", (req, res) => {
  const id = Number(req.params.id);
  const existe = livros.find(identify => identify.id === id);

  if (!id) {
    res.json("O valor do parâmetro ID da URL não é um número válido.");
    return;
  }

  if (!existe) {
    res.json("Não existe livro para o ID informado.")
    return;
  }

  res.json(existe);
  return;
});

app.post("/livros", (req, res) => {
  const { titulo, autor, ano, numPaginas } = req.body;

  const novoLivro = {
    id: livros.length + 1,
    titulo: titulo,
    autor: autor,
    ano: ano,
    numPaginas: numPaginas
  }

  livros.push(novoLivro);
  res.json(livros);
  return
});

app.put("/livros/:id", (req, res) => {
  const id = Number(req.params.id);
  let idExiste, index;

  const { titulo, autor, ano, numPaginas } = req.body;

  const novoLivro = {
    id: id,
    titulo: titulo,
    autor: autor,
    ano: ano,
    numPaginas: numPaginas
  }

  if (!id) {
    res.json("O valor do parâmetro ID da URL não é um número válido.");
    return;
  }

  idExiste = livros.find(livro => livro.id === id);

  if (!idExiste) {
    livros.push(novoLivro);
    res.json("Novo livro criado e adicionado à biblioteca");
    return;
  }

  index = livros.indexOf(idExiste);

  livros.splice(index, 1, novoLivro);

  res.json(livros);
  return;
})

app.listen(8001);