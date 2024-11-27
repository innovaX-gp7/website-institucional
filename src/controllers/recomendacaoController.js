const recomendaoModel = require("../models/recomendacaoModel");

function getByIdEmpresa(req, res) {
    const id = req.params.id

    recomendaoModel.getByIdEmpresa(id)
    .then((response) => {
        return res.status(200).json(response)
    })
    .catch(e => console.error(e))
}

module.exports = {
    getByIdEmpresa
}