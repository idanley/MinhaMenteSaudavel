const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente');
const bcrypt = require('bcryptjs');

router.get('/cadastro', (rq, res) => {
    res.render('cadastro');
})

router.post('/cadastro/save', (req, res) => {
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(senha, salt);
    let cnpj = req.body.cnpj;
    let matricula = req.body.matricula;
    let endereco = req.body.endereco;
    let cidade = req.body.cidade;
    let estado = req.body.estado;
    let cpf = req.body.cpf;
    let cfp = req.body.cfp;
    let crm = req.body.crm;
    let admin = req.body.admin;

    Paciente.create({
        nome: nome,
        email: email,
        senha: hash,
        cnpj: cnpj,
        matricula: matricula,
        endereco: endereco,
        cidade: cidade,
        estado: estado,
        cpf: cpf,
        cfp: cfp,
        crm: crm,
        admin: admin
    }).then(() => {
        res.send("<script>alert('Usuário cadastrado'); window.location.href = '/'; </script>"); 
    }).catch(() => {
        res.redirect('/cadastro');
    })
})

module.exports = router;