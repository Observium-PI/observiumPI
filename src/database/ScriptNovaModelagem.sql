-- Criando DB Observium caso não exista
CREATE DATABASE IF NOT EXISTS Observium;
-- Acessando DB
USE Observium;

-- 	Criação das tabelas	--
-- Tabela hospital --
CREATE TABLE IF NOT EXISTS Hospital(
idHospital INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
CNPJ CHAR(14) NOT NULL,
telefone VARCHAR(20) NOT NULL,
gerente VARCHAR(45) NOT NULL,
logradouro VARCHAR(50) NOT NULL,
bairro VARCHAR(45) NOT NULL,
cep CHAR(8) NOT NULL,
cidade VARCHAR(50),
estado CHAR(2),
numero VARCHAR(10)
);

-- Tabela Usuario --
create table if not exists Usuario(
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

-- Tabela computador --
create table if not exists Computador(
	idComputador int auto_increment,
    hostname varchar(50) not null,
    endMAC varchar(50) not null,
    fabricante varchar(30) not null,
    arquitetura varchar(30) not null,
    sistemaOperacional varchar(30) not null,
    localidade varchar(50),
    fkHospital int not null,
    foreign key (fkHospital) references Hospital(idHospital)
	on delete cascade,
    primary key (idComputador)
);

-- Tabela Componente --
create table if not exists Componente(
	idComponente int auto_increment primary key,
    nomeComponente varchar(50),
    tipoComponente varchar(20),
    fkComputador int,
    foreign key (fkComputador) references Computador (idComputador)
    on delete cascade
);

-- Tabela Monitoramento
create table if not exists Monitoramento(
idMonitoramento int primary key auto_increment,
cpu int,
memoria int,
disco int,
dataHora datetime,
fkComputador int,
foreign key (fkComputador) references Computador (idComputador)
    on delete cascade
);

-- Tabela historico --
create table if not exists Historico(
idHistorico int primary key auto_increment,
descricao TEXT,
fkMonitoramento int,
foreign key (fkMonitoramento) references Monitoramento (idMonitoramento)
);

-- Inserts nas tabelas -- 
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
    
insert into Computador values 
(null, 'computador-vaguinha', 'E0-D7-5H-A0-BB-F3', 'Microsoft', '64', 'Windows', 'casa-do-vaga-1', 1);

insert into Componente (idComponente, tipoComponente, nomeComponente, fkComputador) values 
(null, "cpu", "cpu-do-vaga", 5),
(null, "disco", "disco-do-vaga", 5),
(null, "memoria", "memoria-do-vaga", 5);





