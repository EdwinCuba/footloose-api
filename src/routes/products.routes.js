const express = require('express');
const ProductService = require('../services/product.service');
const { verifyToken, isModerator, isAdmin } = require('../middlewares/auth.jwt');

const productsAPI = (app) => {
  const router = express.Router();
  app.use('/api/products', router);

  const productService = new ProductService();

  router.get('/', async (req, res, next) => {
    const { category } = req.query;

    try {
      const products = await productService.getProducts({category});

      res
        .status(200)
        .json({
          data: products,
          message: 'Listed'
        });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:productId', async (req, res, next) => {
    const { productId } = req.params;

    try{
      const product = await productService.getProduct(productId);

      res
        .status(200)
        .json({
          data: product,
          message: 'Product retrieved'
        });
    }catch(err){
      next(err);
    }
  });

  router.post('/', [verifyToken, isAdmin], async (req, res, next) => {
    const { body: product } = req;

    try {
      const createdProductId = await productService.createProduct(product);

      res
        .status(201)
        .json({
          data: createdProductId,
          message: 'Product created'
        })
    } catch (err) {
      next(err);
    }
  });

  router.put('/:productId', [verifyToken, isModerator], async (req, res, next) => {
    const { productId } = req.params;
    const { body: product } = req;

    try{
      const updateProductId = await productService.updateProduct(productId, product);

      res
        .status(200)
        .json({
          data: updateProductId,
          message: 'Product updated'
        });
    }catch(err){
      next(err);
    }
  });

  router.delete('/:productId', [verifyToken, isAdmin], async (req, res, next) => {
    const { productId } = req.params;

    try{
      const deletedProductId = await productService.deleteProduct(productId);

      res
        .status(200)
        .json({
          data: deletedProductId,
          message: 'Product deleted'
        });
    }catch(err) {
      next(err);
    }
  })
}

module.exports = productsAPI;