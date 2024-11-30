var empresaModel = require("../models/empresaModel");

function editar(req, res) {
    var idEmpresa = req.body.idEmpresaServer;
    var razaoSocial = req.body.razaoSocialServer;
    var nomeFantasia = req.body.nomeFantasiaServer;
    var cnpj = req.body.cnpjServer;
  

    empresaModel.editar(idEmpresa, razaoSocial, nomeFantasia, cnpj)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}


function deletar(req, res) {
    const idEmpresa = req.params.idEmpresa

    empresaModel.deletar(idEmpresa)
    .then(() => {
        return res.status(204).json({"msg": "Empresa deletada"})
    })
    .catch(e => console.error(e))
}

function getEmpresa(req, res) {
    const id = req.params.id

    empresaModel.getEmpresa(id)
    .then((empresa) => {
        return res.status(200).json(empresa)
    })
}



module.exports = {
    editar,
    deletar,
    getEmpresa
}