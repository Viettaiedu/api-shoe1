const Cart = require("../models/Cart");
const Product = require("../models/Product");
exports.getCart = async (req, res) => {
  const [cart, _] = await Cart.find(req.userData.id);
  return res.status(200).json(cart);
};
exports.addCart = async (req, res) => {
  const { id, qty, size } = req.body;
  var newId = parseInt(id);
  var newQty = parseInt(qty);
  var [product, _] = await Product.findById(newId);
  const [user, ____] = await Cart.findByUserId(req.userData.id);
  const [cartUser, _______] = await Cart.findOne(newId, req.userData.id);
  if (cartUser[0]) {
    if (newId !== product[0].id || size !== product[0].size) {
      await Cart.update(newId, newQty, parseInt(size), req.userData.id);
      return res.status(200).json({
        message: "Update cart successfully ",
      });
    } 
  } else {
    const cart = new Cart(
      product[0].id,
      product[0].gender,
      parseInt(size),
      product[0].price,
      product[0].star,
      product[0].name,
      product[0].image,
      product[0].discount,
      product[0].trademark,
      product[0].state,
      newQty,
      req.userData.id
    );
    await cart.save();
    return res.status(200).json({
      message: "Create cart successfully",
    });
  }
};
exports.removeProductFromCart = async (req, res) => {
  const { id } = req.params;
  const [cartDatabase, ____] = await Cart.findById(parseInt(id));
  if (cartDatabase) {
    await Cart.delete(parseInt(id));
    return res.status(200).json({
      redirect: "/cart",
    });
  }
  return res.status(404).send({
    message: "Error server",
  });
};
