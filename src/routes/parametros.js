var express = require("express");
var router = express.Router();

var parametroController = require("../controllers/parametroController");

router.post("/cadastrar", function (req, res) {
    parametroController.cadastrar(req, res);
})


router.put("/editar/:idEmpresa", function (req, res) {
    parametroController.editar(req, res);
});


router.get("/:idEmpresa", (req, res) => {
    parametroController.getAllParametro(req, res);
});

router.get("/:idEmpresa/empresa", (req, res) => {
    parametroController.getParametroByEmpresa(req, res);
});


router.delete("/deletarParametro/:idEmpresa", (req, res) => {
    parametroController.deletarParametro(req, res);
})


module.exports = router;