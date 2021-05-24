const BrandsLib = require('../lib/brands.lib');

class BrandService {
  constructor(){
    this.brands = new BrandsLib();
  }

  async getBrands(){
    const brands = await this.brands.getAll();
    return brands || [];
  }

  async createBrand(data){
    const brand = await this.brands.create(data);
    return brand;
  }

  async deleteBrand(id){
    const deletedBrand = await this.brands.delete(id);
    return deletedBrand;
  }

}

module.exports = BrandService;