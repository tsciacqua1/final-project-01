import { Router } from "express";
import Modifier from "../utils/index.js";

const cartModifier = new Modifier("cart");
const productModifier = new Modifier("products");

const router = Router();

// get all cart products
router.get("/", async (req, res, next) => {
  try {
    const data = await cartModifier.getAll();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
});

// create cart
router.post("/", async (req, res, next) => {
  try {
    const data = await cartModifier.createCart();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
});

// add product by id to cart
router.post("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productModifier.getById(id);
    await cartModifier.saveInCart(product);
    product ? res.sendStatus(200) : null;
  } catch (error) {
    next(error);
  }
});

// delete all cart products
router.delete("/", async (req, res, next) => {
  try {
    await cartModifier.deleteAll();
    res.send(".");
  } catch (error) {
    next(error);
  }
});

// delete product by id from cart
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await cartModifier.deleteById(id);
    res.send(".");
  } catch (error) {
    next(error);
  }
});

export default router;
