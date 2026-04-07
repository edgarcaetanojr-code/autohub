const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
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

// LOGIN
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    res.json({
      success: true,
      user: {
        username: user.username,
        nome: user.nome,
        empresa: user.empresa
      }
    });
  } else {
    res.status(401).json({ success: false });
  }
});
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

// DASHBOARD
app.get('/dashboard', (req, res) => {
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
const path = require('path');

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/dashboard-page', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});
app.use(express.static(__dirname)); // serve o index.html
