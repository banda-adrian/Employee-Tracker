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
    
        // console.table(res);
    
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

// ADDING Department
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

  function viewAllEmployees() {
  
    const query =
    `SELECT e.first_name, e.last_name 
    FROM employee e` 
    +
    `SELECT e.first_name, e.last_name 
    FROM employee e`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
  
      starterQuestions();
    });
  }

  // console.table([
  //   {
  //     name: 'foo',
  //     age: 10
  //   }, {
  //     name: 'bar',
  //     age: 20
  //   }
  // ]);