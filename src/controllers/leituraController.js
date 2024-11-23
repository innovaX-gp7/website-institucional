var leituraModel = require("../models/leituraModel");

function getLeituraByIdEmpresa(req, res) {
    const idEmpresa = req.params.idEmpresa

    leituraModel.getLeituraByIdEmpresa(idEmpresa)
    .then(response => {
        return res.status(200).json(response)
    })
    .catch(e => console.error(e))
}

function getAlteracaoTemperaturaTotal(req, res) {
    const idEmpresa = req.params.idEmpresa

    leituraModel.getAlteracaoTemperaturaTotal(idEmpresa)
    .then(response => {
        return res.status(200).json(response)
    })
    .catch(e => console.error(e))
}

function getMaiorDesmatamentoPercentual(req, res) {
    const idEmpresa = req.params.idEmpresa

    leituraModel.getMaiorDesmatamentoPercentual(idEmpresa)
    .then(response => {
        return res.status(200).json(response)
    })
    .catch(e => console.error(e))
}

function getDesmatamentoTotalComparadoAnoAnterior(req, res) {
    const idEmpresa = req.params.idEmpresa

    leituraModel.getDesmatamentoTotalComparadoAnoAnterior(idEmpresa)
    .then(response => {
        return res.status(200).json(response)
    })
    .catch(e => console.error(e))
}

module.exports = {
    getLeituraByIdEmpresa,
    getAlteracaoTemperaturaTotal,
    getMaiorDesmatamentoPercentual,
    getDesmatamentoTotalComparadoAnoAnterior
}