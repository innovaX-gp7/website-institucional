var funcionarioModel = require("../models/funcionarioModel");


function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        funcionarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            idFuncionario: resultadoAutenticar[0].idFuncionario,
                            nome: resultadoAutenticar[0].nome,
                            email: resultadoAutenticar[0].email,
                            cpf: resultadoAutenticar[0].cpf,
                            senha: resultadoAutenticar[0].senha,
                            fkEmpresaFuncio: resultadoAutenticar[0].fkEmpresaFuncio


                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkEmpresaFuncio = req.body.fkEmpresaFuncioServer; 
    
    // Faça as validações dos valores
    if (cpf == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkEmpresaFuncio === undefined || fkEmpresaFuncio === 'undefined') {
        return res.status(400).send("O ID da empresa está indefinido!");
    } else {
        console.log(cpf)
        // Passe os valores como parâmetro e vá para o arquivo empresaModel.js
        funcionarioModel.cadastrar(nome, cpf, email, senha, fkEmpresaFuncio)
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
    var idFuncionario = req.body.idFuncionarioServer;
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    funcionarioModel.editar(idFuncionario, nome, cpf, email, senha)
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

function getAllFuncionario(req, res) {

    const id = req.params.idEmpresa

    funcionarioModel.getAllFuncionario(id)
    .then((funcionario) => { 
        return res.status(200).json(funcionario) 
    })
}

function deletarFuncionario(req, res) {
    const id = req.params.id

    funcionarioModel.deletarFuncionario(id)
    .then((funcionario) => {
        return res.status(204).json(funcionario)
    })
}


module.exports = {
    autenticar,
    cadastrar,
    editar,
    getAllFuncionario,
    deletarFuncionario

}