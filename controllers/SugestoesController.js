const express = require('express');
const sugestoes = require('../models/Sugestoes');
const router = express.Router();

//Postar Sugestoes
router.post('/admin', (req, res) => {

    const sugest = req.body.Sugestao
    const descricao = req.body.descricao
    if (sugest !== undefined && sugest !== null && sugest !== '' && descricao !== undefined && descricao !== null && descricao !== '') {
        sugestoes.create({
            sugestoes: sugest,
            descrição: descricao
        }).then(() => {
            res.send('<script> alert("Sua Sugestão foi enviada Com Sucesso para equipe de desenvolvimento!"); window.location.href = "/admin"</script>');

        }).catch((err) => {
            console.log("Não foi possivel envia a sua Sugestão" + err);
            res.send('<script> alert("Não foi possivel enviar sua sugestao!"); window.location.href = "/admin"</script>');
        });
    } else {
        res.send('<script> alert("Voce precisa preecher o campo para envia suas sugestoes!"); window.location.href = "/admin"</script>');
    }

});

module.exports = router;