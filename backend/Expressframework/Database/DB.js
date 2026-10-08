const mysql = require("mysql2");
 const connection = mysql.createConnection({
     host: "127.0.0.1",
     port: 3306,
     user: "root",
     password: "050104",
     database: "admindatabase"
});

connection.connect((err)=>{
    if(err){
        console.log('Database connection failed');
        console.log(err)
    }else{
        console.log("mysql connected successfully")
    }
})

module.exports = connection;