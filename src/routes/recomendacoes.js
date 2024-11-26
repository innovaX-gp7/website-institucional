var express = require("express");
var router = express.Router();

const recomendacaoController = require("../controllers/recomendacaoController")

router.get("/:id", (req, res) => {
    recomendacaoController.getByIdEmpresa(req, res)
})

module.exports = router;