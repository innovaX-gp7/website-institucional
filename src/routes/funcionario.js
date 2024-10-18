var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de empresaController.js
router.post("/cadastrar", function (req, res) {
    funcionarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    funcionarioController.autenticar(req, res);
});

router.put("/editar/:idFuncionario", function (req, res) {
    funcionarioController.editar(req, res);
});




module.exports = router;