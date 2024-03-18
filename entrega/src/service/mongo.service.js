import { productModel } from "../dao/models/db.model.js";



const getProduct =  async (req, res) => {
    try { 
        let resultado = await productModel.find({});
        resultado = resultado.map((product) => product.toJSON())
       
         return resultado;
    } catch {
        console.log("erro ao pegar produtos no banco")
    }
};

const createProduct = async (product) => {
    let created = await productModel.create(product)
    return created;
}

const deleteProduct = async(code) => {
    const deletedProduct = await productModel.deleteOne({code: code});
    console.log(code)
    return deletedProduct
}



export default { getProduct, createProduct, deleteProduct };