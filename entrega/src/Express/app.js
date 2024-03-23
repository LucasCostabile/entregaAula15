import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import http from "http"
import path from "path"
import url from "url";
//import prodRouter from "../routes/products.routes.js";
import cartsRoutes from "../routes/carts.routes.js";
import ProductManager from "../models/ManagerProducts.js";
import realTimeRouter from "../routes/realTime.routes.js";
import router from "../routes/mongo.routes.js";
import conectaNaDataBase from "../dao/dbConnect.js";

const conexao = await conectaNaDataBase();
conexao.on("error", (erro) => {
  console.error("erro de conexao", erro);
})

conexao.once("open", () => {
  console.log("conexão feita com sucesso")
})

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const caminhoAtual = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(caminhoAtual);
const diretorioPublico = path.join(`${__dirname}/../public`);
const pathView = path.resolve(`${__dirname}/../views`)

// caminho da pasta public
app.use(express.static(diretorioPublico));



app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", pathView);
//app.use("/products", prodRouter);
app.use("/cart", cartsRoutes);
app.use("/realTime", realTimeRouter);
app.use("/", router);

//import do Manager para trazer o JSON de produtos

const prodManager = new ProductManager();


const server = http.createServer(app);
const io = new Server(server);

const messages = [];

io.on("connection", (socket) => {
    console.log("Usuario conectado");
    socket.emit("messages", {}); // disparando um evento com objeto vazio

  // recebendo o nome do usuario conectado e exibindo no terminal
  socket.on("userName", function (data) {
    
    socket.broadcast.emit('userConnected', data); // evento usado para notificar todos os clientes conectados, exceto o cliente atual
  });
  // recebendo mensagens enviadas pelo cliente
  socket.on("message", function (data) {
    //console.log(data); // exibe a mensagem recebida
    messages.push(data); // adiciona a mensagem recebida ao array de mensagens
    io.sockets.emit("messageLogs",messages);
    //emite um evento para todos os clientes, o array de mensagens "messages" é enviado junto com o evento
  });
  
    /* const sendUpdatedProds = async () => {
      const productsList = await prodManager.readProductsFromFile();
      socket.emit("Updated_Products", productsList);
    };
  
    sendUpdatedProds().then();

    socket.on("delete", (data) => {
      const { id } = data;
      prodManager.deleteProductById(id);
    });*/
  }); 

export default server;
