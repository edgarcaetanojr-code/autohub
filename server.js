const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// LOGIN MOCK
const users = [
  {
    username: "edgar.caetano",
    password: "1234",
    nome: "Edgar Caetano",
    empresa: "Concessionária A"
  },
  {
    username: "joao.silva",
    password: "1234",
    nome: "João Silva",
    empresa: "Concessionária A"
  }
];

// DADOS MOCK
const data = {
  departamentos: [
    {
      nome: "Veículos",
      links: [
        { nome: "Portal VW", url: "https://www.portalredevw.com.br/" },
        { nome: "Tabela FIPE", url: "https://veiculos.fipe.org.br/" }
      ]
    },
    {
      nome: "Financeiro",
      links: [
        { nome: "Banco VW", url: "https://digital.bancovw.com.br/" }
      ]
    }
  ]
};

// ROTAS

// raiz → login
app.get('/', (req, res) => {
  res.redirect('/login');
});

// página login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// página dashboard
app.get('/dashboard-page', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// login API
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    res.json({
      success: true,
      user: {
        username
