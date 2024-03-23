import express from "express";
import mongoService from "../service/mongo.service.js";

const router = express.Router();

router.get("/chat", (req, res) => {
 
  res.render("chat", {});
});

router.post("/chat", async (req, res) => {
  const resp = req.body;
  

  await mongoService.createUser(resp);
  
})

router.get("/", async (req, res) => {
    const product = await mongoService.getProduct();
    console.log(product)
    return res.render("home", { product }) // renderizando os produtos do mongo
});

router.get("/viewForm", async (req, res) => {
    const product = await mongoService.getProduct();
    
    return res.render("viewForm", { product }) // renderizando os produtos do mongo
});

router.post("/viewForm", async (req, res) => {
    const product = req.body;
    const resultado = await mongoService.createProduct(product);
    
    return res.render("sucessForm") // renderizando os produtos do mongo
});


router.delete("/viewForm/:code", async(req, res) => {
    const { code } = req.params;
    const deleted = await mongoService.deleteProduct(code);

    return res.render("productDeleted");
});

router.get("/editForm/:uid", async (req, res) => {
    const { uid } = req.params;
    let product = await mongoService.getProductById(uid);
    product = product.map((p) => p.toJSON());
    res.render("editForm", { product: product[0] });
});


router.put("/viewForm/:uid", async (req, res) => {
    try {
      console.log("to no PUT")
      const product = req.body;
      const { uid } = req.params;
      console.log(uid);
      const newProduct = await mongoService.updateProduct(product, uid);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export default router;