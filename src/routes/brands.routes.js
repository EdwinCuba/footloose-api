const express = require('express');
const BrandService = require('../services/brands.service');

const brandsAPI = (app) => {
  const router = express.Router();
  app.use('/api/brands', router);

  const brandsService = new BrandService();

  router.get('/', async (req, res, next) =>{
    try{
      const brands =await brandsService.getBrands();

      res.json(brands);
    }catch(err){
      next(err);
    }
  });

  router.post('/', async (req, res, next) =>{
    const { body: data } = req;

    try{
      const brand =await brandsService.createBrand(data);

      res.json(brand);
    }catch(err){
      next(err);
    }
  });

  router.delete('/:id',  async (req, res, next) =>{
    const { id } = req.params;

    try{
      const deletedBrand =await brandsService.deleteBrand(id);

      res.json(deletedBrand);
    }catch(err){
      next(err);
    }
  });
}

module.exports = brandsAPI;