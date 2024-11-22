var leituraModel = require("../models/leituraModel");


function getLeituraByIdEmpresa(req, res) {
    const idEmpresa = req.params.idEmpresa

    leituraModel.getLeituraByIdEmpresa(idEmpresa)
    .then(response => {
        return res.status(200).json(response)
    })
    .catch(e => console.error(e))
}


module.exports = {
    getLeituraByIdEmpresa
}