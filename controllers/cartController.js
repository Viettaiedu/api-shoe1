
const Cart = require('../models/Cart');
const Product = require('../models/Product');
exports.getCart = async (req,res,next) => {
    const [cart ,_ ] = await Cart.find();
   return res.status(200).json(cart);
}
exports.addCart = async (req,res,next) => {
    const {id ,qty} = req.body;
    var newId = parseInt(id)
    var newQty = parseInt(qty);
    var [product , _] = await Product.findById(newId);
    const [cartDatabase,____] = await Cart.findById(parseInt(id));
    if(!cartDatabase[0]) {
        const cart = new Cart(product[0].id,product[0].gender,product[0].size,product[0].price,product[0].star,product[0].name,product[0].image,product[0].discount,product[0].trademark,product[0].state,newQty);
        await cart.save();
    }else if(newQty !== cartDatabase[0].qty) {
        await Cart.update(parseInt(cartDatabase[0].id),newQty);
    }
    res.redirect('/cart');
}


exports.removeProductFromCart = async (req,res,next) => {
    const {id} = req.body;
    var idDelete = parseInt(id);
    const [cartDatabase,____] = await Cart.findById(parseInt(id));
    if(cartDatabase) {
        await Cart.delete(idDelete);
      return  res.redirect("/cart");
    }

    return  res.json("ERROR");
    
}