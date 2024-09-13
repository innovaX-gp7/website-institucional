var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT id, cnpj, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(cnpj, email, senha) {
    var instrucaoSql = `
        INSERT INTO usuario (cnpj, email, senha) VALUES ('${cnpj}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};