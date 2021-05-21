const Product = require('./models/Product'); 

class MongoLib {
  async getAll(query){
    const products = await Product.find(query);
    return products;
  }

  async get(id){
    const product = await Product.findById(id);
    return product;
  }

  async create(data){
    const createdProduct = await new Product({...data}).save();
    return createdProduct._id;
  }

  async update(id, data){
    const updatedProduct = await Product.findByIdAndUpdate(
      id, 
      {...data},
      {new: true}
    );
    return updatedProduct;
  }

  async delete(id){
    const deletedProductId = await Product.findByIdAndDelete(id);
    return deletedProductId.id;
  }
}

module.exports = MongoLib;