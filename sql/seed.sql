USE employeeDB;

-- DEPARTMENT
INSERT INTO department (names)
VALUES ("Sales");
INSERT INTO department (names)
VALUES ("Engineering");
INSERT INTO department (names)
VALUES ("Finance");
INSERT INTO department (names)
VALUES ("Legal");

-- ROLES
INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Engineer", 250, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Software Engineer", 200, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 300, 3);
INSERT INTO roles (title, salary, department_id)
VALUES ("Legal Team Lead", 400, 4);

-- 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Adrian", "Banda", 1, 3);

