var express = require("express");
var router = express.Router();

var leituraController = require("../controllers/leituraController");


router.get("/:idEmpresa", (req, res) => {
    leituraController.getLeituraByIdEmpresa(req, res);
});

router.get("/:idEmpresa/temperatura", (req, res) => {
    leituraController.getAlteracaoTemperaturaTotal(req, res);
});

router.get("/:idEmpresa/maiordesmatamentopercentual", (req, res) => {
    leituraController.getMaiorDesmatamentoPercentual(req, res);
});

router.get("/:idEmpresa/desmatamentoTotalComparadoAoAnoAnterior", (req, res) => {
    leituraController.getDesmatamentoTotalComparadoAnoAnterior(req, res);
})

module.exports = router;