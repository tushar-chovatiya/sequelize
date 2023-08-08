const usercontroller = require('../controller/usercontroller')
const express = require("express");
const app = express();

app.get('/user/data', usercontroller.listuser);
app.delete("/user/delete/:id", usercontroller.deleteuser);
app.post("/user/add", usercontroller.adduser);
app.get("/get/role", usercontroller.getrole);
app.get("/get/company", usercontroller.getcompany);
app.get("/get/designation", usercontroller.getdesignation);


module.exports = app;