var dbCon = require("../database");
var connection = dbCon.getconnection();
connection.connect();

var express = require("express");
var router = express.Router();

router.get("/bookappointment", (req, res) => {
    connection.query("SELECT * FROM bookappointment", (err, records, fields) => {
        if (err) {
            console.error("Error while retrieve the Appointment data");
        } else {
            res.send(records);
        }
    })
})

//editAppointment => fetchin data
router.get("/bookappointment/search/:appID", (req, res) => {
    connection.query("SELECT * from bookappointment where appointmentID=('" + req.params.appID + "')", (err, records, fields) => {
        if (err) {
            console.log(req.params.fullName);
            console.error("Error while fetching data");
        } else {
            res.send(records);
        }
    })
})

router.get("/signup", (req, res) => {
    connection.query("SELECT * FROM signup", (err, records, fields) => {
        if (err) {
            console.error("Error while retrieve the registration data");
        } else {
            res.send(records);
        }
    })
})

router.get("/adminAccess", (req, res) => {
    connection.query("SELECT * FROM adminAccess", (err, records, fields) => {
        if (err) {
            res.send("Error in fetching data");
        } else {
            res.send(records);
        }
    })
})


//insert data
router.post("/bookappointment", (req, resp) => {
    var id = req.body.appointmentID;
    var name = req.body.fullName;
    var number = req.body.contactNum;
    var email = req.body.email;
    var appointment = req.body.appointment;
    var date = req.body.onDate;
    var time = req.body.onTime;
    var dateCheck = req.body.dateCheck;

    connection.query("INSERT INTO bookappointment VALUES ('" + id + "','" + name + "','" + number + "','" + email + "','" + appointment + "','" + date + "', '" + time + "', '" + dateCheck + "')", (err, records, fields) => {
        if (err) {
            console.log(err);
            console.log("Error while insertting the data");
        }
        else {
            resp.send({ insert: "insert success" });
        }
    })
})


router.post("/adminAccess", (req, res) => {
    var id = req.body.adminID;
    var email = req.body.email;

    connection.query("INSERT INTO adminAccess values ('" + id + "', '" + email + "')", (err, records, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.send("insert success");
        }
    })
})


router.post("/signup", (req, resp) => {
    var id = req.body.signupID;
    var fullName = req.body.fullName;
    var contactNum = req.body.contactNum;
    var gender = req.body.gender;
    var email = req.body.email;
    var password = req.body.password;
    var check = req.body.check;

    connection.query("INSERT INTO signup VALUES ('" + id + "','" + fullName + "','" + contactNum + "','" + gender + "','" + email + "','" + password + "','" + check + "')", (err, records, fields) => {
        if (err) {
            console.log(err);
            console.log("Error while insertting the data");
        }
        else {
            resp.send({ insert: "insert success" });
        }
    })
})

router.put("/bookappointment/update", (req, resp) => {
    var id = req.body.appointmentID;
    var name = req.body.fullName;
    var number = req.body.contactNum;
    var email = req.body.email;
    var appointment = req.body.appointment;
    var date = req.body.onDate;
    var time = req.body.onTime;
    var dateCheck = req.body.dateCheck;

    connection.query("UPDATE bookappointment SET fullName='" + name + "',contactNum='" + number + "',email='" + email + "',appointment='" + appointment + "',onDate='" + date + "',onTime='" + time + "',dateCheck='" + dateCheck + "' WHERE appointmentID='" + id + "'", (err, records, fields) => {
        if (err) {
            console.log(err);
            console.log("Error while insertting the data");
        }
        else {
            resp.send({ insert: "insert success" });
        }
    })
})

//delete
router.delete("/bookappointment/:id", (req, res) => {
    connection.query("delete from bookappointment where appointmentID=" + req.params.id, (err, records, fields) => {
        if (err) {
            console.log(err);
            console.error("Error while deleting the data");
        } else {
            res.send({ delete: "Delete Success" });
        }
    })
})

router.delete("/adminAccess/:email", (req, res) => {
    connection.query("delete from adminAccess where email=('" + req.params.email + "')", (err, records, fields) => {
        if (err) {
            console.log(err);
            console.error("Error while deleting the data");
        } else {
            res.send({ delete: "Delete Success" });
        }
    })
})

module.exports = router;