import { productModel, messageModel } from "../dao/models/db.model.js";

const getProduct =  async (req, res) => {
    try { 
        let produtos = await productModel.find({});
        produtos = produtos.map((product) => product.toJSON())
       
         return produtos;
    } catch {
        console.log("erro ao pegar produtos no banco")
    }
};

const createProduct = async (product) => {
    let createdProduct = await productModel.create(product)
    return createdProduct;
}

const deleteProduct = async(code) => {
    const deletedProduct = await productModel.deleteOne({code: code});
    console.log(code)
    return deletedProduct
}

const getProductById = async (uid) => {
    const product = await productModel.findById(uid);
    return [product];
}


const updateProduct = async ({code, title, description, price, stock, thumbnail }, uid) => {
    const productUpdated = await productModel.updateOne({_id: uid}, {code, title, description, price, stock, thumbnail });
    return productUpdated;
};


const createUser = async ( userData ) => {
    console.log(userData)
    try {
      let userExist = await messageModel.findOne({user: userData.user});
      if (userExist) {
        userExist.message.push(userData.message);
        await userExist.save();
        return userExist;
      } else {
        let userCreated = await messageModel.create(userData);
        return userCreated;
      } 
  
    } catch (error) {
        console.log(error);
      }
  };
  
export default { getProduct, createProduct, deleteProduct, getProductById, updateProduct, createUser };