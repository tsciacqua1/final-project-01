"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _index = require("../middlewares/index.js");

var _index2 = _interopRequireDefault(require("../utils/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const modifier = new _index2.default("products");
const router = (0, _express.Router)();
router.get("/", async (req, res, next) => {
  try {
    const data = await modifier.getAll();
    res.status(200).json({
      data
    });
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const {
      id
    } = req.params;
    const data = await modifier.getById(id);
    res.status(200).json({
      data
    });
  } catch (error) {
    next(error);
  }
});
router.post("/", _index.isAdmin, async (req, res, next) => {
  try {
    const {
      name,
      description,
      code,
      photo,
      price,
      stock
    } = req.body;
    const product = await modifier.save({
      timestamp: Date.now(),
      name,
      description,
      code,
      photo,
      price,
      stock
    });
    product ? res.sendStatus(200) : null;
  } catch (error) {
    next(error);
  }
});
router.put("/:id", _index.isAdmin, async (req, res, next) => {
  try {
    const {
      id
    } = req.params;
    const {
      name,
      description,
      code,
      photo,
      price,
      stock
    } = req.body;
    await modifier.updateById(id, {
      name,
      description,
      code,
      photo,
      price,
      stock
    });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", _index.isAdmin, async (req, res, next) => {
  try {
    const {
      id
    } = req.params;
    await modifier.deleteById(id);
    res.send(".");
  } catch (error) {
    next(error);
  }
});
var _default = router;
exports.default = _default;