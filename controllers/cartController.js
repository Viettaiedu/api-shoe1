const Cart = require("../models/Cart");
const Product = require("../models/Product");
exports.getCart = async (req, res, next) => {
  const [cart, _] = await Cart.find(req.userData.id);
  return res.status(200).json(cart);
};
exports.addCart = async (req, res, next) => {
  const { id, qty, size } = req.body;
  var newId = parseInt(id);
  var newQty = parseInt(qty);
  var [product, _] = await Product.findById(newId);
  const [user, ____] = await Cart.findById(req.userData.id);
    if(user[0] === undefined || user[0] === null) {
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
              message:"Create cart successfully",
            redirect: "/cart",
          });
    }
  if (user[0].user_id === req.userData.id) {
    const [cart, ____] = await Cart.findOne(newId, req.userData.id);
    if (cart[0]) {
      if (cart[0].qty !== newQty || cart[0].size !== parseInt(size)) {
        await Cart.update(newId, newQty , parseInt(size), req.userData.id);
        return res.status(200).json({
            message:"Update successfully",
          redirect: "/cart",
        });
      } else {
        return res.status(201).json({
          message: "Qty same old qty",
          redirect: "/cart",
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
          message:"Create cart successfully",
        redirect: "/cart",
      });
    }
  } else {

  }
  return res.status(500).json({
    message:"Error ",
})
  // const cart = new Cart(product[0].id,product[0].gender,parseInt(size),product[0].price,product[0].star,product[0].name,product[0].image,product[0].discount,product[0].trademark,product[0].state,newQty , req.userData.id);
  // await cart.save();
};
exports.removeProductFromCart = async (req, res, next) => {
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
