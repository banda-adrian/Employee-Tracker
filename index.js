const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "MySQLServer352189",
    database: "employeeDB"
  });  

  connection.connect(function (err) {
    if (err) throw err;

    starterQuestions();
  });

  function starterQuestions() {

    inquirer
      .prompt({
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: [
          "Add Employee",
          "Add Role",
          "Add Department",
          "View all employees",
          "View all employees by Department",
          "View all employees by Manager",
          "View all roles ",
          "View all departments",
          "Exit"]
      })
      .then(function ({ choices }) {
        switch (choices) {
          case "Add Employee":
            addEmployee();
            break;
          case "Add Role":
            addRole();
            break;
          case "Add Department":
            addDepartment();
            break;
          case "View all employees":
             viewAllEmployees();
            break;
          case "View all employees by department":
            viewAllEmployeesByDepartment();
            break;
          case "View all employees by Manager":
            viewAllEmployeesByManager();
            break;
          case "View all roles":
            viewAllRoles();
            break;
          case "View all departments":
            viewAllDepartments();
            break;
          case "Exit":
            connection.end();
            break;
        }
      });
  }

  function viewAllEmployees() {
  
    const query =
    `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.names AS department, roles.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role r
    ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
    ON m.id = e.manager_id`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
  
      starterQuestions();
    });
  }

  //Adding Employee
  function addEmployee() {

  const query =
    `SELECT r.id, r.title, r.salary 
      FROM roles r`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const roleChoices = res.map(({ id, title, salary }) => ({
      value: id, title: `${title}`, salary: `${salary}`
    }));

    // console.table(res);

    employeeInsert(roleChoices);
     });
  }

  function employeeInsert(roleChoices) {

    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?"
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?"
        },
        {
          type: "input",
          name: "manager_id",
          message: "What is the managers ID?"
        },
        {
          type: "list",
          name: "roleId",
          message: "What is the employee's role?",
          choices: roleChoices
        },
      ])
      .then(function (answer) {
  
        const query = `INSERT INTO employee SET ?`

        connection.query(query,
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.roleId,
            manager_id: answer.manager_id,
          },
          function (err, res) {
            if (err) throw err;
  
            // console.table(res);
  
            starterQuestions();
          });
      });
  }


