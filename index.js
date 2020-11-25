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

// Starts starterQuestions
connection.connect(function (err) {
  if (err) throw err;


console.log(`
    ---------------------------------------------------
   |                                                   | 
   |                                                   | 
   |                                                   | 
   |                    Employee                       | 
   |                    Tracker                        | 
   |                                                   | 
   |                                                   | 
   |                                                   | 
    ---------------------------------------------------
  `)

  viewTable();
  // starterQuestions();
});

function starterQuestions() {

  inquirer
    .prompt({
      type: "list",
      name: "choices",
      message: "What would you like to do?",
      choices: [
        "View Table",
        "Add Employee",
        "Add Role",
        "Add Department",
        "View all Employees",
        "View all Roles",
        "View all Departments",
        // "View all employees by Department",
        // "View all employees by Manager",
        "Exit"]
    })
    .then(function ({ choices }) {
      switch (choices) {
        case "View Table":
          viewTable();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "View all Employees":
          viewAllEmployees();
          break;
        case "View all Roles":
          viewAllRoles();
          break;
        case "View all Departments":
          viewAllDepartments();
          break;
        // case "View all employees by department":
        //   viewAllEmployeesByDepartment();
        //   break;
        // case "View all employees by Manager":
        //   viewAllEmployeesByManager();
        //   break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

// View Table
function viewTable() {

  const query =
    `SELECT 
    e.first_name AS FirstName, 
    e.last_name AS LastName, 
    r.title AS Title, 
    d.names AS Department, 
    r.salary AS Salary
    FROM employee e
    LEFT JOIN roles r
    ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id`

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

    console.table(res);

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
        message: "What is the managers id?"
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

//Adding Role
function addRole() {

  const query =
    `SELECT d.id, d.names
        FROM department d`

  connection.query(query, function (err, res) {
    if (err) throw err;

    const departmentChoices = res.map(({ id, names }) => ({
      value: id, names: `${id} ${names}`
    }));

    console.table(res);

    promptRoleQuestions(departmentChoices);
  });
}

function promptRoleQuestions(departmentChoices) {

  inquirer
    .prompt([
      {
        type: "input",
        name: "role_title",
        message: "What is the Role title?"
      },
      {
        type: "input",
        name: "role_salary",
        message: "What is the Role Salary"
      },
      {
        type: "list",
        name: "department_id",
        message: "What is the Department?",
        choices: departmentChoices
      },
    ])
    .then(function (answer) {

      const query = `INSERT INTO roles SET ?`

      connection.query(query,
        {
          title: answer.role_title,
          salary: answer.role_salary,
          department_id: answer.department_id
        },
        function (err, res) {
          if (err) throw err;

          // console.table(res);

          starterQuestions();
        });
    });
}

// Adding Department
function addDepartment() {

  inquirer
    .prompt([
      {
        type: "input",
        name: "department_title",
        message: "What is the Department title?"
      },
    ])
    .then(function (answer) {

      const query = `INSERT INTO department SET ?`

      connection.query(query,
        {
          names: answer.department_title
        },
        function (err, res) {
          if (err) throw err;

          // console.table(res);

          starterQuestions();
        });
    });
}

// 

// View All Employees
function viewAllEmployees() {

  const query =
    `SELECT 
      e.first_name AS FirstName, 
      e.last_name AS LastName 
      FROM employee e`

  connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);

    starterQuestions();
  });
}

// View All Departments
function viewAllDepartments() {

  const query =
    `SELECT 
    d.names AS Departments 
    FROM department d`

  connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);

    starterQuestions();
  });
}

// View All Roles
function viewAllRoles() {

  const query =
    `SELECT 
    r.title AS Roles,
    r.salary AS Salary
    FROM roles r`

  connection.query(query, function (err, res) {
    if (err) throw err;

    console.table(res);

    starterQuestions();
  });
}