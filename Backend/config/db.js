const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yogi@1321',
  database: 'employee_management'
});
connection.connect((err) => {
    if (err) {
        console.log("Database connection failed");
        console.log(err);
    } else {
        console.log("MySQL connected successfully");
    }
});

module.exports = connection;