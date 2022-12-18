
const Product = require('../models/Product');
const PAGES_SIZE = 16;
// [POST] /product
exports.createProduct = async (req,res ,next) => {
    const {gender ,size , price , star , name ,image , discount , trademark ,state} = req.body;
    const product = new Product(gender ,size , price , star , name ,image , discount,trademark ,state);
     await product.createOneProduct();
    res.status(201).send("CREATED DONE");
}
// [GET] /api/product
exports.getAllProduct = async (req,res,next) => {
    let page = parseInt(req.query.page) ;
   try {
       if(page) {
           let limit = (page - 1) * PAGES_SIZE;
           const [products , __] = await Product.findAll();
           const [productPage, _]  = await Product.findPage(PAGES_SIZE,limit);
        res.status(200).json({ page:page, results : [...productPage] , total_pages : Math.round(products.length /PAGES_SIZE) ,total_results: products.length  });
       }else{
        const [products , _] = await Product.findAll();
        res.status(200).json(products);
       }
   }catch(err) {
       console.log("ERRPR GET ALL PRODUCT");
        next(err);
   }
}
// [GET] /api/product/:id
exports.getProductById = async (req,res , next) => {
    try {
        let productId = req.params.id;
    const [product , _] = await Product.findById(productId);
        res.status(200).json(product);
    } catch (error) {
         console.log("ERRPR GET ONE PRODUCT");
        next(error);
    }
}



exports.getOtherBrands = async (req,res,next) => {
    try {
        const [getOtherBrands , _] = await Product.findOtherBrands();
        res.status(200).json(getOtherBrands);
    }catch(err) {
        res.status(401).json("ERROR");
    }
}