"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _products = _interopRequireDefault(require("./products.js"));

var _cart = _interopRequireDefault(require("./cart.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.use("/products", _products.default);
router.use("/cart", _cart.default);
var _default = router;
exports.default = _default;