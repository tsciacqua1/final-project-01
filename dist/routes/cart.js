"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _index = _interopRequireDefault(require("../utils/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cartModifier = new _index.default("cart");
const productModifier = new _index.default("products");
const router = (0, _express.Router)(); // get all cart products

router.get("/", async (req, res, next) => {
  try {
    const data = await cartModifier.getAll();
    res.status(200).json({
      data
    });
  } catch (error) {
    next(error);
  }
}); // create cart

router.post("/", async (req, res, next) => {
  try {
    const data = await cartModifier.createCart();
    res.status(200).json({
      data
    });
  } catch (error) {
    next(error);
  }
}); // add product by id to cart

router.post("/:id", async (req, res, next) => {
  try {
    const {
      id
    } = req.params;
    const product = await productModifier.getById(id);
    await cartModifier.saveInCart(product);
    product ? res.sendStatus(200) : null;
  } catch (error) {
    next(error);
  }
}); // delete all cart products

router.delete("/", async (req, res, next) => {
  try {
    await cartModifier.deleteAll();
    res.send(".");
  } catch (error) {
    next(error);
  }
}); // delete product by id from cart

router.delete("/:id", async (req, res, next) => {
  try {
    const {
      id
    } = req.params;
    await cartModifier.deleteById(id);
    res.send(".");
  } catch (error) {
    next(error);
  }
});
var _default = router;
exports.default = _default;