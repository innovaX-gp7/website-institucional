var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT id, nome, cpf, email, senha FROM usuario WHERE email = '${email}' AND senha = 'md5(${senha})';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(razaoSocial, nomeFantasia, cnpj, nome, cpf, email, senha) {
    let idEmpresa;
    var instrucaoSql = `
        INSERT INTO empresa (razaoSocial, nomeFantasia, cnpj) VALUES ('${razaoSocial}','${nomeFantasia}','${cnpj}');
    `;
    database.executar(instrucaoSql)

    instrucaoSql = `
    SET ${idEmpresa} = last_insert_id();
`;
   database.executar(instrucaoSql)

    instrucaoSql = `
    INSERT INTO usuario (nome, cpf, email, senha, fkEmpresa) VALUES ('${nome}', '${cpf}', '${email}', '${senha}', @empresa_id);
`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql).then(response => console.log(response)).catch(e => console.error(e))
}


function editar(id, nome, cpf, email, senha) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", id, nome, cpf, email, senha);
    var instrucaoSql = `
        UPDATE usuario SET nome = '${nome}', cpf = '${cpf}', email = '${email}', senha = 'md5(${senha})' WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

/*function getAllFuncionario(id) {
    const instrucaoSql = `SELECT * FROM usuario WHERE fkEmpresa = ${id}`
    return database.executar(instrucaoSql)
}*/

function deletarFuncionario(id) {
    const instrucaoSql = `DELETE FROM usuario WHERE id = ${id}`
    return database.executar(instrucaoSql)
}

module.exports = {
    autenticar,
    cadastrar,
    editar,
    deletarFuncionario
};