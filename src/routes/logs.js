var express = require("express");
var router = express.Router();

var logsController = require("../controllers/logsController.js");

router.get("/listarLogs/:idHospital", function(req, res){
    logsController.fnListarLogs(req, res);
});

module.exports = router;