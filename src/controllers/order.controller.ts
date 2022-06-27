import { NextFunction, Request, Response } from "express";

const CartModel = require("../models/cart.model");
const OrderModel = require("../models/orders.model");
const OrderItemModel = require("../models/orders-item.model");
const factoryController = require("./factoryController");
const catchAsync = require("./../utils/catchAsync");
const stripe = require("stripe")("sk_test_51L2XybDvV0f5gkaHKYscztja1Bk47ChUMPsQ5uv78AoHGZQEZQXafogn3RkjH1WK6DXGZ4U4kAFwl7HWtOq8p2Io00oK4B2oG2");

class OrderController {
  getAllRecords = factoryController.getAll(OrderModel, {path: 'user orderItem'});
  getOneRecord = factoryController.getOne(OrderModel, {path: 'user orderItem'});
  updateRecord = factoryController.updateOne(OrderModel);
  deleteRecord = factoryController.deleteOne(OrderModel);
  deleteManyRecord = factoryController.deleteMany(OrderModel);

  createNewRecord = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
    const user = req.user;
    const body = req.body;

    let totalPrice = 0, totalQuantity = 0;
    const ids = [];
    const items = body.items;

    await this.asyncForEach(items, async (element) => {
      const cartItem = await CartModel.findById(element.id).populate({ path: "product.localProduct product.martProduct shop.localShop shop.martShop user seller" });

      const shop = cartItem['shop']?.martShop || cartItem['shop']?.localShop;
      const product = cartItem['product']?.martProduct || cartItem['product']?.localProduct;
      const itemsTotal = product?.price * element?.quantity;
      const shippingTotal = product?.deliveryPrice * element?.quantity;

      totalPrice += (itemsTotal + shippingTotal);
      totalQuantity += element?.quantity;

      const orderItem = {
        price: (itemsTotal + shippingTotal),
        quantity: element?.quantity,
        user: user._id,
        seller: cartItem?.seller?._id,
        product: {productType: cartItem?.product?.productType},
        shop: {shopType: cartItem?.shop?.shopType}
      };

      if(cartItem?.product?.productType === 'local') {
        orderItem['product']['localProduct'] = product?._id;
        orderItem['shop']['localShop'] = shop?._id;
      }
      else {
        orderItem['product']['martProduct'] = product?._id;
        orderItem['shop']['martShop'] = shop?._id;
      }

      const orderItemResult = await OrderItemModel.create(orderItem);

      ids.push(orderItemResult._id);

    });

    let result = await OrderModel.create({
      priceTotal: totalPrice,
      quantityTotal: totalQuantity,
      orderItem: ids,
      user: user._id
    });

    const token = body.token;
    let stripeResult = null;
    let customer = await stripe.customers.create({
      email: user?.email,
      source: token.id
    });
    if(customer) {
      stripeResult = await stripe.charges.create({
        amount: totalPrice,
        description: "Test Purchase using express and Node",
        currency: "USD",
        customer: customer.id,
      });
    }

    console.log(customer);
    console.log(stripeResult);

    res.send({
      message: "Successfully Created Record!",
      data: result
    });
  });

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
}

export default new OrderController();
