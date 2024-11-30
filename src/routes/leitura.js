var express = require("express");
var router = express.Router();

var leituraController = require("../controllers/leituraController");


router.get("/areaDesmatada", (req, res) => {
    leituraController.getLeituraDesmatamentoAtual(req, res);
});

router.get("/temperaturaPrecipitacao", (req, res) => {
    leituraController.getPrecipitacaoTemperaturaAtuais(req, res);
});

router.get("/:idEmpresa/temperatura", (req, res) => {
    leituraController.getAlteracaoTemperaturaTotal(req, res);
});

router.get("/maiordesmatamentopercentual", (req, res) => {
    leituraController.getMaiorDesmatamentoPercentual(req, res);
});

router.get("/desmatamentoTotalComparadoAoAnoAnterior", (req, res) => {
    leituraController.getDesmatamentoTotalComparadoAnoAnterior(req, res);
})

module.exports = router;