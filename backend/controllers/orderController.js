const Order = require("../models/Order");

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user.id,
      products: req.body.products,
      totalAmount: req.body.totalAmount
    });

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get All Orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "-password")
      .populate("products.product");

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};