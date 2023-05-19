import Order from "../models/order.js";

// Create an order
export const createOrder = async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  try {
    if (orderItems && orderItems.length === 0) {
      const error = new Error("No order items");
      error.statusCode = 400;
      throw error;
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingAddress,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Get all orders
export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    res.status(201).json(orders);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Get an order by id
export const getOrderById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate("user", "name email");

    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(201).json(order);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      error.message = "An unknown error occurred";
    }
    next(error);
  }
};

// Update order to paid
export const updateOrderToPaid = async (req, res, next) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.status(201).json(updatedOrder);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      error.message = "An unknown error occurred";
    }
    next(error);
  }
};

// ADMIN - Get all orders
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("user", "name email");

    res.status(201).json(orders);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// ADMIN - Set order as delivered
export const updateOrderDelivered = async (req, res, next) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    await order.save();

    res.status(201).json({ message: "Order delivered successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
