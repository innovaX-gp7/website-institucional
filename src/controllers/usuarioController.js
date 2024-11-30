var usuarioModel = require("../models/usuarioModel");


function autenticar(req, res) {
    var idEmpresa = req.body.idEmpresaServer;
    var fkUserRole = req.body.fkUserRoleServer;
    var userRole = req.body.userRoleServer;
    var razaoSocial = req.body.razaoSocialServer;
    var nomeFantasia = req.body.nomeFantasiaServer
    var cnpj = req.body.cnpjServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
 
  

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha, razaoSocial, nomeFantasia, cnpj, idEmpresa,fkUserRole, userRole)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.status(200).json({
                            id: resultadoAutenticar[0].id,
                            nome: resultadoAutenticar[0].nome,
                            email: resultadoAutenticar[0].email,
                            cpf: resultadoAutenticar[0].cpf,
                            senha: resultadoAutenticar[0].senha,
                            idEmpresa: resultadoAutenticar[0].idEmpresa,
                            nomeFantasia: resultadoAutenticar[0].nomeFantasia,
                            razaoSocial: resultadoAutenticar[0].razaoSocial,
                            cnpj: resultadoAutenticar[0].cnpj,
                            fkUserRole: resultadoAutenticar[0].fkUserRole,
                            userRole: resultadoAutenticar[0].userRole



                        });
                    } else  {
                        res.status(404).send("Email e/ou senha inválido(s)");
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
    
    // Faça as validações dos valores
    if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        console.log(cpf)
        // Passe os valores como parâmetro e vá para o arquivo empresaModel.js
        usuarioModel.cadastrar(razaoSocial, nomeFantasia, cnpj, nome, cpf, email, senha)
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


function cadastrarFuncionario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  
    var nome = req.body.nomeServer
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.fkEmpresaServer;
    var fkUserRole = req.body.fkUserRoleServer;
    
    // Faça as validações dos valores
    if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        console.log(cpf)
        // Passe os valores como parâmetro e vá para o arquivo empresaModel.js
        usuarioModel.cadastrarFuncionario(nome, cpf, email, senha, fkEmpresa, fkUserRole)
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

function editarCargo(req, res) {
    const id = req.params.id
    var fkUserRole = req.body.fkUserRoleServer;

    usuarioModel.editarCargo(id, fkUserRole)
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

    var idEmpresa = req.params.idEmpresa;

    usuarioModel.getAllFuncionario(idEmpresa)
    .then((usuario) => { 
        return res.status(200).json(usuario) 
    })
}

function deletarFuncionario(req, res) {
    const id = req.params.id

    usuarioModel.deletarFuncionario(id)
    .then((usuario) => {
        return res.status(204).json(usuario)
    })
}

function getUsuario(req, res) {
    const id = req.params.id

    usuarioModel.getUsuario(id)
    .then((usuario) => {
        return res.status(200).json(usuario)
    })
}


module.exports = {
    autenticar,
    cadastrar,
    editar,
    deletarFuncionario,
    cadastrarFuncionario,
    getAllFuncionario,
    editarCargo,
    getUsuario

}