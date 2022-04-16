var express = require("express");
var router = express.Router();

var computadorController = require("../controllers/computadorController.js");


router.get("/listar", function (req, res) {
    computadorController.fnListar(req, res);
});

router.post("/excluir", function(req, res){
    computadorController.fnExcluir(req, res);
});

module.exports = router;