var database = require("../database/config")

function getLeituraByIdEmpresa(idEmpresa) {
    const sql = `
        SELECT *
        FROM leitura l
        WHERE l.ano = (
            SELECT MAX(l2.ano)
            FROM leitura l2
            WHERE l2.unidadeFederativa = l.unidadeFederativa
        ) 
        AND l.mes = (
            SELECT MAX(l3.mes)
            FROM leitura l3
            WHERE l3.unidadeFederativa = l.unidadeFederativa
            AND l3.ano = l.ano
        )
        AND fkEmpresa = 8;`
    return database.executar(sql)
}

function getAlteracaoTemperaturaTotal(idEmpresa) {
    const sql = `
    SELECT 
    ROUND(
        (SUM(l1.temperaturaMensal) - SUM(IFNULL(l2.temperaturaMensal, 0))) / SUM(IFNULL(l2.temperaturaMensal, 1)) * 100, 
        2
    ) AS alteracaoPercentualTotalTemperatura
    FROM 
        leitura l1
    LEFT JOIN 
        leitura l2
    ON 
        l1.unidadeFederativa = l2.unidadeFederativa
        AND l1.ano = l2.ano + 1 
    WHERE 
        l1.fkEmpresa = ${idEmpresa}
        AND EXISTS (
            SELECT 1
            FROM leitura l3
            WHERE l3.fkEmpresa = ${idEmpresa} 
            AND l3.ano = l1.ano - 1 
            AND l3.unidadeFederativa = l1.unidadeFederativa
        );
    `

    return database.executar(sql)
}

function getMaiorDesmatamentoPercentual(idEmpresa) {
    const sql = `
        SELECT 
    l1.unidadeFederativa,
    ROUND((l1.areaDesmatada - l2.areaDesmatada), 2) AS diferencaDesmatamento
    FROM 
        leitura l1
    JOIN 
        leitura l2
    ON 
        l1.unidadeFederativa = l2.unidadeFederativa
        AND l1.ano = l2.ano + 1
    WHERE 
        l1.fkEmpresa = ${idEmpresa} LIMIT 1;
    `

    return database.executar(sql)
}

function getDesmatamentoTotalComparadoAnoAnterior(idEmpresa) {
    const sql = `
    SELECT 
    ROUND(
        (SUM(l1.areaDesmatada) - SUM(IFNULL(l2.areaDesmatada, 0))) / SUM(IFNULL(l2.areaDesmatada, 1)) * 100, 
        2
    ) AS alteracaoPercentualTotal
    FROM 
        leitura l1
    LEFT JOIN 
        leitura l2
    ON 
        l1.unidadeFederativa = l2.unidadeFederativa
        AND l1.ano = l2.ano + 1  -- Compara o ano atual com o ano imediatamente anterior
    WHERE 
        l1.fkEmpresa = ${idEmpresa}
        AND EXISTS (
            SELECT 1
            FROM leitura l3
            WHERE l3.fkEmpresa = ${idEmpresa} 
            AND l3.ano = l1.ano - 1  -- Verifica se existe o ano anterior
            AND l3.unidadeFederativa = l1.unidadeFederativa
        );
    `

    return database.executar(sql)
}

module.exports = {
    getLeituraByIdEmpresa,
    getAlteracaoTemperaturaTotal,
    getMaiorDesmatamentoPercentual,
    getDesmatamentoTotalComparadoAnoAnterior
};