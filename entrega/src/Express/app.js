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

io.on("connection", (socket) => {
    console.log("Usuario conectado");
    
  
    const sendUpdatedProds = async () => {
      const productsList = await prodManager.readProductsFromFile();
      socket.emit("Updated_Products", productsList);
    };
  
    sendUpdatedProds().then();

    socket.on("delete", (data) => {
      const { id } = data;
      prodManager.deleteProductById(id);
    });
  });

export default server;
