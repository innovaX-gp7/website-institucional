var leituraModel = require("../models/leituraModel");

function getLeituraDesmatamentoAtual(req, res) {
    leituraModel.getLeituraDesmatamentoAtual()
    .then(response => {
        return res.status(200).json(response)
    })
    .catch(e => console.error(e))
}

function getPrecipitacaoTemperaturaAtuais(req, res) {
    leituraModel.getPrecipitacaoTemperaturaAtuais()
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

    leituraModel.getMaiorDesmatamentoPercentual()
    .then(response => {
        return res.status(200).json(response)
    })
    .catch(e => console.error(e))
}

function getDesmatamentoTotalComparadoAnoAnterior(req, res) {


    leituraModel.getDesmatamentoTotalComparadoAnoAnterior()
    .then(response => {
        return res.status(200).json(response)
    })
    .catch(e => console.error(e))
}


module.exports = {
    getPrecipitacaoTemperaturaAtuais,
    getAlteracaoTemperaturaTotal,
    getMaiorDesmatamentoPercentual,
    getDesmatamentoTotalComparadoAnoAnterior,
    getLeituraDesmatamentoAtual
}