//process.env.AMBIENTE_PROCESSO = "desenvolvimento";
process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = 3000;

var app = express();

// Armazenando os módulos dos arquivos dentro da função require nas variaveis
var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var computadorRouter = require("./src/routes/computador");
var logsRouter = require("./src/routes/logs");
var medidaRouter = require("./src/routes/medida");
var relatorioRouter = require("./src/routes/relatorio");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

// O primeiro argumento define a URL que será acessada e o segundo para qual rota levará 
app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/computador", computadorRouter);
app.use("/logs", logsRouter);
app.use("/medida", medidaRouter);
app.use("/relatorio", relatorioRouter);


app.listen(PORTA, function () {
    console.log(`Servidor do site está rodando rodando: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em ${process.env.AMBIENTE_PROCESSO}`);
});