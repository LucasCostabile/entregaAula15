import express from "express";
import mongoService from "../service/mongo.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const resultado = await mongoService.getProduct();
    console.log(resultado)
    return res.render("home", { resultado }) // renderizando os produtos do mongo
});

router.get("/viewForm", async (req, res) => {
    const resultado = await mongoService.getProduct();
    
    return res.render("viewForm", { resultado }) // renderizando os produtos do mongo
});

router.post("/viewForm", async (req, res) => {
    const product = req.body;
    const resultado = await mongoService.createProduct(product);
    
    return res.redirect("viewForm") // renderizando os produtos do mongo
});


router.delete("/viewForm/:code", async(req, res) => {
    const { code } = req.params;
    const deleted = await mongoService.deleteProduct(code);

    return res.render("productDeleted" );
});


export default router;