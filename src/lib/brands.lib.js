const Brand = require('./models/Brand');

class BrandsLib{

  async getAll(){
    const brands = await Brand.find();
    return brands;
  }

  async create(data){
    const brand = await new Brand(data).save();
    console.log(data);
    return brand._id;
  }

  async delete(id){
    const deletedBrand = await Brand.findByIdAndDelete(id);
    return deletedBrand;
  }
}

module.exports = BrandsLib;