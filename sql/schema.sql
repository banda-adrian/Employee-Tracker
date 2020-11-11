DROP DATABASE IF EXISTS employeeDB;


CREATE DATABASE employeeDB;
USE employeeDB;

CREATE TABLE department (
  id INT PRIMARY KEY,
  names VARCHAR(30),
  PRIMARY KEY (id)
);


CREATE TABLE roles (
  id INT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (id)
);


CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHAR(30),  
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
);