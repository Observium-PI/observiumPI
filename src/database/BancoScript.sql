create database Observium;
use Observium;

create table Hospital(
	idHospital int primary key auto_increment,
    nome varchar(100) not null,
    cnpj char(14) not null,
    telefone varchar(20) not null,
    gerente varchar(45) not null,
    logradouro varchar(50) not null,
    bairro varchar(45) not null,
    cep char(8) not null,
    cidade varchar(50) not null,
    estado char(2) not null,
    numero varchar(10)
);
select * from Hospital;
-- desc Hospital;

create table Usuario(
	idUsuario int primary key auto_increment,
    nome varchar(45) not null,
    email varchar(100) not null,
    setor varchar(40) not null,
	tipoUsuario varchar(20) not null,
    login varchar(20) not null,
    senha varchar(30) not null,
    fkHospital int not null,
    foreign key (fkHospital) references Hospital(idHospital) 
);
select * from Usuario;
-- desc Usuario;

create table Computador(
	idComputador int auto_increment,
    hostname varchar(50) not null unique,
    endMAC varchar(50) not null unique,
    fabricante varchar(30) not null,
    arquitetura varchar(30) not null,
    sistemaOperacional varchar(30) not null,
    localidade varchar(50),
    fkHospital int not null,
    foreign key (fkHospital) references Hospital(idHospital),
    primary key (idComputador, endMAC)
);
select * from Computador;
-- desc Computador;

create table Componente(
	idComponente int primary key auto_increment,
    tipoComponente varchar(20),
    fkComputador int,
    foreign key (fkComputador) references Computador(idComputador)
    ON DELETE CASCADE
);
select * from Componente;
-- desc Componente;

create table Monitoramento(
	idMonitoramento int primary key auto_increment not null,
    fkComponente int not null,
    dataHora datetime not null,
    medida double not null,
    unidadeDeMedida varchar(5) not null,
    foreign key (fkComponente) references Componente(idComponente)
    ON DELETE CASCADE
);
select * from Monitoramento;
-- desc Monitoramento;

create table Historico(
	idHistorico int primary key auto_increment,
    descricao text(200) not null,
    fkMonitoramento int not null,
    foreign key (fkMonitoramento) references Monitoramento(idMonitoramento)
    ON DELETE CASCADE
);
select * from Historico;
-- desc Historico;

insert into Hospital values
	(null, 'Hospital Paulistano', 33810946000415, 1130161000, 'Rodrigo Martins', 'Avenida Paulista', 'Cerqueira Cesar', 01311931, 'São Paulo', 'SP', 2001),
    (null, 'Hospital Samaritano', 24344124000152, 1138215923, 'Paulo Mayer', 'Rua Conselheiro Brotero', 'Santa Cecilia', 01232010, 'São Paulo', 'SP', 1486),
    (null, 'Hospital Santa Isabel', 43808692000101, 1121767434, 'Maria Dulce', 'Rua Dr Cesario Mota Junior', 'Santa Cecilia', 01221900, 'São Paulo', 'SP', 112);
    
insert into Usuario values
	(null, 'Marcela Oliveira', 'marcela.oliveira@observium.com.br', 'TI', 'admin', 'MARCOLI', 'm123o', 1),
    (null, 'Roberto Moraes', 'roberto.moraes@observium.com.br', 'TI', 'comum', 'ROBEMOR', 'r123m', 1),
    (null, 'José Pereira', 'jose.pereira@observium.com.br', 'TI', 'comum', 'JOSEPER', 'j123p', 1),
    (null, 'Christian Almeida', 'christian.almeida@observium.com.br', 'TI', 'admin', 'CHRIALM', 'c123a', 2),
    (null, 'Livia Santos', 'livia.santos@observium.com.br', 'TI', 'comum', 'LIVISAN', 'l123s', 2),
    (null, 'Eduardo Cavalcanti', 'eduardo.cavalcanti@observium.com.br', 'TI', 'comum', 'EDUACAV', 'e123c', 3),
    (null, 'Melissa Macedo', 'melissa.macedo@observium.com.br', 'TI', 'admin', 'MELIMAC', 'm123m', 3);
    
insert into Computador values
	(null, 'computador-recepcao-1', 'E0-D7-5H-A0-BB-F9', 'Microsoft', '64', 'Windows', 'recepcao-01', 1),
    (null, 'computador-medico-1', 'B0-D5-FG-E0-BB-G9', 'Microsoft', '64', 'Linux', 'alaMedica-03', 2),
    (null, 'computador-triagem-1', 'A0-D6-5E-F0-BB-E4', 'Microsoft', '64', 'Windows', 'triagem-01', 1),
    (null, 'computador-recepcao-2', 'F0-D3-5F-B0-BB-E7', 'Microsoft', '64', 'Linux', 'recepcao-01', 3);
    
insert into Componente values
	(null, 'cpu', 1),
    (null, 'memoriaRAM', 1),
    (null, 'disco', 1),
    (null, 'disco', 1),
    (null, 'cpu', 2),
    (null, 'memoriaRAM', 2),
    (null, 'disco', 2),
    (null, 'cpu', 3),
    (null, 'memoriaRAM', 3),
    (null, 'disco', 3),
    (null, 'cpu', 4),
    (null, 'memoriaRAM', 4),
    (null, 'disco', 4),
    (null, 'disco', 4);
    
insert into Monitoramento values
	(null, 1, '2022-04-06 20:52:30', 21.4, '%'),
    (null, 2, '2022-04-06 21:35:20', 43, '%'),
    (null, 6, '2022-04-07 14:33:00', 55.6, '%'),
    (null, 4, '2022-04-07 13:21:25', 61, '%'),
    (null, 5, '2022-04-06 20:53:05', 35.7, '%'),
    (null, 7, '2022-04-07 14:52:35', 87, '%'),
    (null, 10, '2022-04-08 21:58:10', 64, '%'),
    (null, 8, '2022-04-07 18:47:10', 21.4, '%'),
    (null, 9, '2022-04-07 20:47:25', 10.1, '%'),
    (null, 13, '2022-04-08 22:11:25', 80.5, '%'),
    (null, 12, '2022-04-08 22:11:25', 67.8, '%'),
    (null, 3, '2022-04-06 22:23:15', 90, '%'),
    (null, 14, '2022-04-08 22:11:25', 95, '%');

-- INSERINDO DADOS MOCADOS PARA A CPU DO COMPUTADOR 1
insert into Monitoramento values
	(null, 1, '2022-04-06 20:52:30', 21.4, '%'),
    (null, 1, '2022-04-06 20:55:00', 25.5, '%'),
    (null, 1, '2022-04-07 20:55:10', 30.1, '%'),
    (null, 1, '2022-04-07 20:55:20', 29.4, '%'),
    (null, 1, '2022-04-06 20:55:30', 43.2, '%'),
    (null, 1, '2022-04-07 20:55:40', 40.3, '%'),
    (null, 1, '2022-04-08 20:55:50', 42.8, '%'),
    (null, 1, '2022-04-07 20:56:00', 27.4, '%'),
    (null, 1, '2022-04-07 20:56:10', 22.3, '%'),
    (null, 1, '2022-04-08 20:56:20', 80.4, '%'),
    (null, 1, '2022-04-08 20:56:30', 85.7, '%'),
    (null, 1, '2022-04-06 20:56:40', 55.7, '%'),
    (null, 1, '2022-04-08 20:56:50', 31.8, '%'),
    (null, 1, '2022-04-08 20:57:00', 44.3, '%'),
    (null, 1, '2022-04-08 20:57:10', 26.7, '%'),
    (null, 1, '2022-04-08 20:57:20', 20.7, '%'),
    (null, 1, '2022-04-08 20:57:30', 15, '%'),
    (null, 1, '2022-04-08 20:57:40', 16.9, '%'),
    (null, 1, '2022-04-08 20:57:50', 22.4, '%'),
    (null, 1, '2022-04-08 20:58:00', 31.8, '%'),
    (null, 1, '2022-04-08 20:58:10', 82.4, '%'),
    (null, 1, '2022-04-08 20:58:20', 95.7, '%'),
    (null, 1, '2022-04-08 20:58:30', 74.9, '%'),
    (null, 1, '2022-04-08 20:58:40', 41.7, '%'),
    (null, 1, '2022-04-08 20:58:50', 22.8, '%'),
    (null, 1, '2022-04-08 20:59:00', 16.3, '%'),
    (null, 1, '2022-04-08 20:59:10', 25.5, '%'),
    (null, 1, '2022-04-08 20:59:20', 31.8, '%'),
    (null, 1, '2022-04-08 20:59:30', 20.7, '%'),
    (null, 1, '2022-04-08 20:59:40', 29.4, '%'),
    (null, 1, '2022-04-08 20:59:50', 14, '%'),
    (null, 1, '2022-04-08 21:00:00', 47.3, '%');
    
insert into Historico values
	(null, 'Alerta Emergente, Armazenamento do disco quase no limite', 13),
    (null, 'Alerta Urgente, Armazenamento do disco quase cheio', 13),
    (null, 'Alerta Urgente, Uso alto da memória RAM', 9);

-- SELECT TRAZENDO O ID DO COMPUTADOR, O TIPO DO COMPONENTE MONITORADO, A DATA/HORA E A DESCRIÇÃO DO ALERTA
select C.fkComputador, C.tipoComponente, M.dataHora, H.Descricao from Componente as C 
join Monitoramento as M on idComponente = fkComponente 
join Historico as H on idMonitoramento = fkMonitoramento;

-- SELECT COM NOME DO HOSPITAL, GERENTE, LOGRADOUDO, ESTADO, NOME E SETOR DOS USUARIOS QUE SÃO ADMs
select H.nome, H.gerente, H.logradouro, H.estado, U.idUsuario, U.nome, U.setor, U.tipoUsuario 
from Hospital as H join Usuario as U on idHospital = fkHospital
where U.tipoUsuario = 'admin';

-- SELECT COM ID DOS COMPUTADORES, ENDEREÇO MAC, SISTEMA OPERACIONAL E SEUS RESPECTIVOS COMPONENTES 
-- ONDE O SISTEMA OPERACIONAL É WINDOWNS
select PC.idComputador, PC.hostname as 'Nome PC', PC.endMAC as 'Endereço MAC', PC.sistemaOperacional 
as 'Sistema Operacional', C.tipoComponente as 'Componente' from Computador as PC
join Componente as C on idComputador = fkComputador 
where PC.sistemaOperacional = 'windows';

-- SELECT COM ID DOS COMPUTADORES, ENDEREÇO MAC, COMPONENTE MONITORADO, DATA E HORA DA MEDIÇÃO,
-- MEDIDA E A UNIDADE DE MEDIDA
select PC.idComputador, PC.endMAC as 'Endereço MAC', C.tipoComponente 
as 'Componente', M.dataHora as 'Data/Hora', M.medida 
as 'Medida', M.unidadeDeMedida as 'Unidade de Medida' 
from Computador as PC 
join Componente as C on idComputador = fkComputador 
join Monitoramento as M on idComponente = fkComponente;

-- SELECT POR ID DE COMPUTADOR COM O COMPONENTE MONITORADO, DATA E HORA DA MEDIÇÃO,
-- MEDIDA E A UNIDADE DE MEDIDA
select PC.idComputador, C.tipoComponente as 'Componente', M.dataHora as 'Data/Hora', M.medida 
as 'Medida', M.unidadeDeMedida as 'Unidade de Medida' 
from Computador as PC
join Componente as C on idComputador = fkComputador 
join Monitoramento as M on idComponente = fkComponente
where C.tipoComponente = 'disco' and PC.idComputador = 2;

select M.datahora, C.tipoComponente, mq.hostname, H.descricao from Historico as H 
join Monitoramento as M on fkMonitoramento = idMonitoramento 
join Componente as C on fkComponente = idComponente 
join Computador as mq on fkComputador = idComputador;

select medida, DATE_FORMAT(dataHora,'%H:%i:%s') as 'momento_grafico' 
from monitoramento join componente on fkComponente = idComponente 
join Computador on fkComputador = idComputador 
where tipoComponente = 'cpu' and idComputador = 1
order by 'momento_grafico' desc limit 0, 7;

select truncate(medida, 0) from monitoramento join componente on fkComponente = idComponente 
join Computador on fkComputador = idComputador where tipoComponente = 'memoriaRAM' 
and idComputador = 5 order by medida desc limit 0, 1;