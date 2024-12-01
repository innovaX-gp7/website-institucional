
var database = require("../database/config")
var empresaModel = require("./empresaModel")

function autenticar(email, senha) {
    let instrucaoSql = `
    SELECT 
        usuario.id AS id,
        usuario.nome AS nome,
        usuario.cpf AS cpf,
        usuario.email AS email,
        usuario.senha AS senha,
        usuario.fkUserRole as fkUserRole,
        userRole.nome as userRole,
        empresa.id AS idEmpresa,
        empresa.razaoSocial AS razaoSocial,
        empresa.nomeFantasia AS nomeFantasia,
        empresa.cnpj AS cnpj
    FROM 
        usuario
    LEFT JOIN 
        empresa ON usuario.fkEmpresa = empresa.id
    LEFT JOIN 
        userRole ON usuario.fkUserRole = userRole.id
    WHERE 
        usuario.email = '${email}' 
        AND usuario.senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
async function cadastrar(razaoSocial, nomeFantasia, cnpj, nome, cpf, email, senha) {
    try {
        // Inserir a empresa no banco de dados
        let instrucaoSql = `
            INSERT INTO empresa (razaoSocial, nomeFantasia, cnpj) 
            VALUES ('${razaoSocial}', '${nomeFantasia}', '${cnpj}');
        `;
        await database.executar(instrucaoSql); // Espera a execução da inserção da empresa

        console.log("Empresa inserida com sucesso.");

        // Buscar o id da empresa recém inserida
        const resultado = await empresaModel.getEmpresaByCnpj(cnpj); // Espera o resultado da consulta da empresa

        if (!resultado || resultado.length === 0) {
            throw new Error("Empresa não encontrada após a inserção.");
        }

        const { id } = resultado[0]; // Acessa o id da empresa

        // Inserir o usuário na tabela usuario
        instrucaoSql = `
            INSERT INTO usuario (nome, cpf, email, senha, fkEmpresa, fkUserRole) 
            VALUES ('${nome}', '${cpf}', '${email}', '${senha}', ${id}, 1);
        `;
        await database.executar(instrucaoSql); // Espera a execução da inserção do usuário

        console.log("Usuário inserido com sucesso.");
    } catch (e) {
        console.error("Erro durante o cadastro:", e.message || e);
    }
}


function editar(id, nome, cpf, email, senha) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", id, nome, cpf, email, senha);
    var instrucaoSql = `
        UPDATE usuario SET nome = '${nome}', cpf = '${cpf}', email = '${email}', senha = '${senha}', modified_at = now() WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editarCargo(id, fkUserRole) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", fkUserRole);
    var instrucaoSql = `
        UPDATE usuario SET fkUserRole = '${fkUserRole}', modified_at = now() WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getAllFuncionario(idEmpresa, idUsuario) {
    const instrucaoSql = `SELECT usuario.*, userRole.nome as userRole FROM usuario 
                         INNER JOIN  userRole ON usuario.fkUserRole = userRole.id 
                         WHERE fkEmpresa = ${idEmpresa} AND usuario.id != ${idUsuario}`
    return database.executar(instrucaoSql)
}

function deletarFuncionario(id) {
    const instrucaoSql = `DELETE FROM usuario WHERE id = ${id}`
    return database.executar(instrucaoSql)
}

function getUsuario(id) {
    const instrucaoSql = `SELECT * FROM usuario WHERE id = ${id}`
    return database.executar(instrucaoSql)
}

function cadastrarFuncionario(nome, cpf, email, cpf, fkEmpresa, fkUserRole) {
    let instrucaoSql = `
         INSERT INTO usuario (nome, cpf, email, senha, fkEmpresa, fkUserRole) VALUES ('${nome}', '${cpf}', '${email}', '${cpf}', '${fkEmpresa}', '${fkUserRole}');
                    `
       return database.executar(instrucaoSql) 
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
};