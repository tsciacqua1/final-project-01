import { Router } from "express";
import { isAdmin } from "../middlewares/index.js";
import Modifier from "../utils/index.js";

const modifier = new Modifier("products");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await modifier.getAll();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await modifier.getById(id);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
});

router.post("/", isAdmin, async (req, res, next) => {
  try {
    const { name, description, code, photo, price, stock } = req.body;
    const product = await modifier.save({
      timestamp: Date.now(),
      name,
      description,
      code,
      photo,
      price,
      stock,
    });

    product ? res.sendStatus(200) : null;
  } catch (error) {
    next(error);
  }
});

router.put("/:id", isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, code, photo, price, stock } = req.body;

    await modifier.updateById(id, {
      name,
      description,
      code,
      photo,
      price,
      stock,
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    await modifier.deleteById(id);
    res.send(".");
  } catch (error) {
    next(error);
  }
});

export default router;
