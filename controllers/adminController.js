const express = require('express');
const router = express.Router();
const sugestoes = require('../models/Sugestoes');
const Paciente = require('../models/Paciente');
const bcrypt = require('bcryptjs');


router.get('/novasenha', (req, res) => {
        res.render('novasenha')

})

router.get('/indexAdmin', (req, res) => {

    sugestoes.findAll({ raw: true }).then((sugestoes) => {
        res.render('indexAdmin', {sugestoes: sugestoes,}); 
    });  

})

router.get('/usuarios', (req, res) => {

    Paciente.findAll({ raw: true }).then(users => {
        res.render('usuarios', { users: users })
    })
  

})

router.post('/finduser', (req, res) =>{
    let email = req.body.email;

    Paciente.findOne({raw: true, where:{email: email}}).then(founduser =>{  
        if (!founduser) {
            res.send('<script>alert("Usuário não encontrado"); window.location.href = "/indexAdmin"</script>');
        } else {
            res.render('foundusuario', {user: founduser} )
        }
    })
})


router.get('/edit/:id', (req, res) =>{
    let id = req.params.id;
    
    if(isNaN(id)){
        res.redirect('/usuarios')
    } else {
        Paciente.findByPk(id).then(user => {
            if(user != undefined) {
                res.status(200);
                res.render('adminEditUser', { user: user })
            } else {
                res.status(400);
                res.redirect('/usuarios')
            }
        }).catch(() => {
            res.status(400);
            res.redirect('/usuarios')
        })
    }
})

router.post('/update', (req, res) => {
    let id = req.body.id;
    let nome = req.body.nome;
    let email = req.body.email;
    let endereco = req.body.endereco;
    let cidade = req.body.cidade;
    let estado = req.body.estado;
    let superuser = req.body.superuser;

    Paciente.update({ nome, email, endereco, cidade, estado, superuser }, {
        where:{
            id: id
        }
    }).then(() => {
        res.status(200);
        res.send('<script>alert("Usuário atualizado!"); window.location.href = "/usuarios"</script>');
    }).catch(() => {
        res.status(400);
        res.send('<script>alert("Usuário inválido!"); window.location.href = "/usuarios"</script>');
    })
})

router.post('/delete', (req, res) => {
    let id = req.body.id;
    
    if(id != undefined) {

        if(!isNaN(id)) {

            Paciente.destroy({
                where:{
                    id: id
                }
            }).then(() => {
                res.status(200);
                res.send('<script>alert("Usuário deletado!"); window.location.href = "/usuarios"</script>');    
            }).catch(() => {
                res.status(404);
                res.send('<script>alert("Usuário inválido!"); window.location.href = "/usuarios"</script>');
            })
        }

    } else {
        res.status(404);
        res.send('<script>alert("Usuário inválido!"); window.location.href = "/usuarios"</script>');
    
    }

})

router.post('/deleteSugestoes', (req, res) => {
    let Id = req.body.id;

if(Id != undefined) {

    if(!isNaN(Id)) {

        sugestoes.destroy({
            where:{
                id: Id
            }
        }).then(() => {
           
            res.send('<script>alert("Sugestão removida!"); window.location.href = "/indexAdmin"</script>');  
        }).catch(() => {
            res.status(404);
            res.send('<script>alert("Não existe suegstão!"); window.location.href = "/indexAdmin"</script>');
        })
    }

} else {
    res.status(404);
    res.send('<script>alert("Não existe suegstão!"); window.location.href = "/indexAdmin"</script>');

}
})

router.post('/trocarsenha', (req, res) => {

    let Cpf = req.body.Cpf;
    let nome = req.body.nome;
    let Nascimento = req.body.Nascimento;
    let Senha = req.body.Senha;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(Senha, salt);
    
    Paciente.findOne({ where: { cpf:Cpf,
        nome:nome,
        nascimento: Nascimento
     } }).then(user => {
        if (user !== undefined && user!== null && user !== ''){

            Paciente.update({ senha: hash}, {
                where: {
                    cpf: Cpf
                }
                }) 
                res.send('<script> alert("Senha alterada com sucesso!"); window.location.href = "/"</script>');
        } else {
        res.send('<script> alert("Seus Dados estão incorretos !"); window.location.href = "/novasenha"</script>');
    }

});
});



module.exports = router;