var parametroModel = require("../models/parametroModel");


function cadastrar(req, res) {
    var parametro = req.body.parametroServer
    var fkEmpresa = req.body.fkEmpresaServer; 
    
    // Faça as validações dos valores
    if (parametro == undefined) {
        res.status(400).send("Seu parametro está undefined!");
    } else if (fkEmpresa === undefined || fkEmpresa === 'undefined') {
        return res.status(400).send("O ID da empresa está indefinido!");
    } else {
        console.log(parametro)
        // Passe os valores como parâmetro e vá para o arquivo empresaModel.js
        parametroModel.cadastrar(parametro, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function editar(req, res) {
    var id = req.body.idServer;
    var parametro = req.body.parametroServer;

    parametroModel.editar(id, parametro)
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

function getAllParametro(req, res) {

    const id = req.params.idEmpresa

    parametroModel.getAllParametro(id)
    .then((parametroRecomendacao) => { 
        return res.status(200).json(parametroRecomendacao) 
    })
}

function deletarParametro(req, res) {
    const id = req.params.id

    parametroModel.deletarParametro(id)
    .then((parametroRecomendacao) => {
        return res.status(204).json(parametroRecomendacao)
    })
}


module.exports = {
    cadastrar,
    editar,
    getAllParametro,
    deletarParametro

}