const MongoLib = require('../lib/products.lib');

class ProductService {
  constructor(){
    this.mongoDB = new MongoLib();
  }

  async getProducts({ tags }) {
    const query = tags && {tags : {$in: tags}};
    const products = await this.mongoDB.getAll( query);
    return products || [];
  }

  async getProduct(id) {
    const product = await this.mongoDB.get(id);
    return product;
  }

  async createProduct(data) {
    const createdproductId = await this.mongoDB.create(data);
    return createdproductId;
  }

  async updateProduct(id, data) {
    const updatedProductId = await this.mongoDB.update(id, data);
    return updatedProductId || id;
  }

  async deleteProduct(id) {
    const deletedProdcutId = await this.mongoDB.delete(id);
    return deletedProdcutId || id; 
  }
}

module.exports = ProductService;