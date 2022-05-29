var database = require('../database/config');

async function getDados(idHospital) {
    let instrucaoSQL = `
    select C.idComputador, C.hostName as 'hostname', count(idMonitoramento) as "qtdMonitoramento", count(idHistorico)  as 'qtdAlertas'
    from Historico as H
    right join Monitoramento as M on fkMonitoramento = idMonitoramento
    join Computador as C on fkComputador = idComputador 
    where C.fkHospital = ${idHospital}
    group by idComputador;
    `;

    console.log('Executando a instrução SQL: \n' + instrucaoSQL);

    return await database.executar(instrucaoSQL);
}

async function getDadosUsuarioHospital(idHospital, idUsuario){
    let instrucaoSQL = `
    select U.nome as 'nomeUsuario', H.nome as 'nomeHospital'  
    from Usuario as U
    join Hospital as H on fkHospital = idHospital
    where idHospital = ${idHospital} and idUsuario = ${idUsuario};
    `;
    console.log('Executando a instrução SQL: \n' + instrucaoSQL);
    return await database.executar(instrucaoSQL);
}

module.exports = {
    getDados,
    getDadosUsuarioHospital
}