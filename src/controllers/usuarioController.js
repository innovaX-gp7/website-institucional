var usuarioModel = require("../models/usuarioModel");


function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            id: resultadoAutenticar[0].id,
                            nome: resultadoAutenticar[0].nome,
                            email: resultadoAutenticar[0].email,
                            cpf: resultadoAutenticar[0].cpf,
                            senha: resultadoAutenticar[0].senha,
                            fkEmpresa: resultadoAutenticar[0].fkEmpresa


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
    var razaoSocial = req.body.razaoSocialServer;
    var nomeFantasia = req.body.nomeFantasiaServer
    var cnpj = req.body.cnpjServer;
    var nome = req.body.nomeServer
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.fkEmpresaServer; 
    
    // Faça as validações dos valores
    if (cpf == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkEmpresa === undefined || fkEmpresa === 'undefined') {
        return res.status(400).send("O ID da empresa está indefinido!");
    } else {
        console.log(cpf)
        // Passe os valores como parâmetro e vá para o arquivo empresaModel.js
        usuarioModel.cadastrar(razaoSocial, nomeFantasia, cnpj, nome, cpf, email, senha, fkEmpresa)
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
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    usuarioModel.editar(id, nome, cpf, email, senha)
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

/*function getAllFuncionario(req, res) {

    const id = req.params.idEmpresa

    usuarioModel.getAllFuncionario(id)
    .then((funcionario) => { 
        return res.status(200).json(funcionario) 
    })
}*/

function deletarFuncionario(req, res) {
    const id = req.params.id

    usuarioModel.deletarFuncionario(id)
    .then((funcionario) => {
        return res.status(204).json(funcionario)
    })
}


module.exports = {
    autenticar,
    cadastrar,
    editar,
    deletarFuncionario

}