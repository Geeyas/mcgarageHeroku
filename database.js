var dbdetails = require("./db-details"); // importing the content from db-details file
var mysql = require("mysql2");

module.exports = {
    getconnection: () => {
        return mysql.createConnection({
            // host: dbdetails.host,
            // user: dbdetails.user,
            // password: dbdetails.password,
            // database: dbdetails.database
            host: "mcgarage-aws-db.cdf8v0jtvmgz.us-west-1.rds.amazonaws.com",
            user: "admin",
            password: "#Mcgarage6060",
            database: "mcgarage"
        });
    }
}
