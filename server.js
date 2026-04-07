const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ===== USUÁRIOS =====
const users = [
  {
    username: "edgar.caetano",
    password: "1234",
    nome: "Edgar Caetano",
    empresa: "Concessionária A"
  }
];

// ===== DADOS =====
const data = {
  departamentos: [
    {
      nome: "Veículos",
      links: [
        { nome: "Portal VW", url: "https://www.portalredevw.com.br/" }
      ]
    }
  ]
};

// ===== ROTAS =====
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/dashboard-page', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// ===== LOGIN =====
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false });
  }
});

// ===== DASHBOARD =====
app.get('/dashboard', (req, res) => {
  res.json(data);
});

// ===== STATIC =====
app.use(express.static(__dirname));

// ===== START =====
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
