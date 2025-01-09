const express = require('express');
const ProductService = require('../services/product.service');
const { validatorHandler } = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/products.schema');

const router = express.Router()
const service = new ProductService();
router.get('/', async (req, res) => {
   const products = await service.getAll();
    res.json(products)
});

router.get('/:id', 
    validatorHandler(getProductSchema, 'params'),
    async (req, res, next)=>{
    try {
        //let name = this.getName();
        let {id} = req.params;
    id = parseInt(id);
    const product = await service.getById(id);
    res.json(product);
    } catch (error) {
       next(error);
    }
});

router.post('/',
    validatorHandler(createProductSchema, 'body'),
    (req, res)=>{
    const body = req.body;
    service.create(body);
    res.status(201).json({
        message:'Client created',
        data:body
    }
    )
})

router.put('/:id', 
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    (req, res)=>{
    let {id} = req.params;
    id = parseInt(id);
    const body = req.body;
    const product = service.update(id, body);
    res.json(product);
})

router.delete('/:id', (req, res)=>{
    let {id} = req.params;
    id = parseInt(id);
    const message = service.delete(id);
    res.json(message);
})

module.exports = router;