var express = require("express");
var router = express.Router();

var leituraController = require("../controllers/leituraController");


router.get("/:idEmpresa", (req, res) => {
    leituraController.getLeituraByIdEmpresa(req, res);
});

module.exports = router;