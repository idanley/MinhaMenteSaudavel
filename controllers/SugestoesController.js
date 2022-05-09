const express = require('express');
const sugestoes = require('../models/Sugestoes');
const router = express.Router();

//Postar Sugestoes
router.post('/admin', (req, res) => {

    const sugest = req.body.Sugestao
    if (sugest !== undefined && sugest !== null && sugest !== '') {
        sugestoes.create({
            sugestoes: sugest
        }).then(() => {
            res.send('<script> alert("Sugestão enviada Com Sucesso!"); window.location.href = "/admin"</script>');

        }).catch((err) => {
            console.log("Não foi possivel envia a sua Sugestão" + err);
            res.send('<script> alert("Não foi possivel realizar cadastro!"); window.location.href = "/admin"</script>');
        });
    } else {
        res.send('<script> alert("Voce precisa preecher o campo para envia suas sugestoes!"); window.location.href = "/admin"</script>');
    }

});

module.exports = router;