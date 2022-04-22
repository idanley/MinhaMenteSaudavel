const express = require('express');
const router = express.Router();
const Sugestoes = require('../models/Sugestoes');
const adminAuth = require('../middleware/adminAuth');


//Sugestoes
router.post('/admin', adminAuth.authenticate, (req, res) => {

    const sugest = req.body.Sugestao
    if (sugest !== undefined && sugest !== null && sugest !== ''){
    Sugestoes.create({
    sugestoes: sugest
    }).then(() => {
        res.send('<script> alert("Sugestão enviada Com Sucesso!"); window.location.href = "/admin"</script>');

    }).catch((err) => {
        console.log("Não foi possivel envia a sua Sugestão" + err);
        res.send('<script> alert("Não foi possivel realizar cadastro!"); window.location.href = "/admin"</script>');
    });
}else {
    res.send('<script> alert("Voce precisa preecher o campo para envia suas sugestoes!"); window.location.href = "/admin"</script>');
}

});

module.exports = router;