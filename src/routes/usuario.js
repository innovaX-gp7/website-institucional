var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de empresaController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/cadastrarFuncionario", function (req, res) {
    usuarioController.cadastrarFuncionario(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});


router.put("/editar/:id", function (req, res) {
    usuarioController.editar(req, res);
});

router.put("/editarCargo/:id", function (req, res) {
    usuarioController.editarCargo(req, res);
});


router.get("/:idEmpresa", (req, res) => {
    usuarioController.getAllFuncionario(req, res);
});


router.delete("/deletar/:id", (req, res) => {
   usuarioController.deletarFuncionario(req, res);
})


module.exports = router;