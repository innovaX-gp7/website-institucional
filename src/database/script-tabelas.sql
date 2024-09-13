Drop database if exists innovaxdb;
Create database if not exists InnovaxDB;
use innovaxdb;
CREATE TABLE usuario (
  id int NOT NULL AUTO_INCREMENT,
  email varchar(45) NOT NULL,
  cnpj varchar(14) DEFAULT NULL,
  senha varchar(45) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email),
  UNIQUE KEY cnpj (cnpj)
);

select * from usuario;

truncate usuario;