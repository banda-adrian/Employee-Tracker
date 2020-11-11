const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
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
          "View all employees",
          "View all employees by Department",
          "View all employees by Manager",
          "View all roles ",
          "View all departments",
          "Add Employee",
          "Add Role",
          "Exit"]
      })
      .then(function ({ choices }) {
        switch (choices) {
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
            case "Add Employee":
                addEmployee();
                break;
          case "Add Role":
            addRole();
            break;
          case "Exit":
            connection.end();
            break;
        }
      });
  }



// Questions

// What would you like to do?
// View all employees
// View all employees by department
// View all employees by Manager **

// View all roles 

// View all departments

// Add Employee

// What is the employes first name? (input)
// What is the employes last name? (input)
// What is the employess role? (choices)
// Sales Lead 
// Sales Person
// Lead Engineer 
// Software Engineer
// Account Manger 
// Accountant 
// Legal Team Lead
 
// Whos is the Employees Manager? (Choices)
