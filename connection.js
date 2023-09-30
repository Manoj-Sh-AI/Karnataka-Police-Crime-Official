var mysql = require("mysql");
var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"github100",
    database:"project_db"
});
module.exports=con;