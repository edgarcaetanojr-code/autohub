const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

/* ================================
   BANCO MOCK (MEMÓRIA)
================================ */

let empresas = [
  { id: 1, nome: "Concessionária A", logo: "" }
];

let departamentos = [
  {
    id: 1,
    nome: "Veículos",
    empresaId: 1,
    links: [
      { nome: "Portal VW", url: "https://www.portalredevw.com.br/" },
      { nome: "Tabela FIPE", url: "https://veiculos.fipe.org.br/" }
    ]
  },
  {
    id: 2,
    nome: "Financeiro",
    empresaId: 1,
    links: [
      { nome: "Banco VW", url: "https://digital.bancovw.com.br/" }
    ]
  }
];

let usuarios = [
  {
    id: 1,
    nome: "Edgar Caetano de Oliveira Junior",
    username: "edgarcaetano.jr",
    password: "admin",
    email: "edgarcaetano.jr@gmail.com",
    admin: "T", // T = total, S = parcial, N = usuário comum
    empresas: [],
    departamentos: []
  },
  {
    id: 2,
    nome: "Usuário Comum",
    username: "joao.silva",
    password: "1234",
    email: "joao@email.com",
    admin: "N",
    empresas: [1],
    departamentos: [1]
  }
];

/* ================================
   ROTAS DE PÁGINA
================================ */

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/dashboard-page', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

/* ================================
   LOGIN
================================ */

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = usuarios.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ success: false });
  }

  res.json({
    success: true,
    user
  });
});

/* ================================
   DASHBOARD (FILTRADO)
================================ */

app.get('/dashboard', (req, res) => {
  const username = req.query.username;

  const user = usuarios.find(u => u.username === username);

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  let depsFiltrados;

  if (user.admin === "T") {
    depsFiltrados = departamentos;
  } else {
    depsFiltrados = departamentos.filter(dep =>
      user.departamentos.includes(dep.id)
    );
  }

  res.json({ departamentos: depsFiltrados });
});

/* ================================
   ADMIN - EMPRESAS
================================ */

app.get('/admin/empresas', (req, res) => {
  res.json(empresas);
});

app.post('/admin/empresa', (req, res) => {
  const { nome } = req.body;

  const nova = {
    id: empresas.length + 1,
    nome,
    logo: ""
  };

  empresas.push(nova);

  res.json(nova);
});

/* ================================
   ADMIN - USUÁRIOS
================================ */

app.get('/admin/usuarios', (req, res) => {
  res.json(usuarios);
});

app.post('/admin/usuario', (req, res) => {
  const { nome, username, password, email, admin } = req.body;

  const existe = usuarios.find(u => u.username === username);

  if (existe) {
    return res.status(400).json({ error: "Usuário já existe" });
  }

  const novo = {
    id: usuarios.length + 1,
    nome,
    username,
    password,
    email,
    admin: admin || "N",
    empresas: [],
    departamentos: []
  };

  usuarios.push(novo);

  res.json(novo);
});

/* ================================
   START
================================ */

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
