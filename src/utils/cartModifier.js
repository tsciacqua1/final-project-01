import { promises as fs } from "fs";
import ProductModifier from "./productModifier.js";

const productModifier = new ProductModifier("products");

class Modifier {
  constructor(fileName) {
    this.fileName = fileName;
  }

  createCart = async (object) => {
    try {
      await fs.readFile(`./${this.fileName}.txt`);
    } catch (err) {
      await fs.writeFile(`./${this.fileName}.txt`, "");
    }

    try {
      const file = await fs.readFile(`./${this.fileName}.txt`);
      if (!file.length) {
        object.id = file.length + 1;
        let array = [...file, object];
        await fs.writeFile(`./${this.fileName}.txt`, JSON.stringify(array));
      } else {
        const parsedFile = JSON.parse(file);
        object.id = parsedFile.length + 1;
        let array = [...parsedFile, object];
        await fs.writeFile(`./${this.fileName}.txt`, JSON.stringify(array));
      }
      return object.id;
    } catch (error) {
      console.error(error.message);
    }
  };

  deleteCart = async (id) => {
    const file = JSON.parse(await fs.readFile(`./${this.fileName}.txt`));
    const index = file.findIndex((el) => el.id === +id);
    if (index > -1) {
      file.splice(index, 1);
      await fs.writeFile(`./${this.fileName}.txt`, JSON.stringify(file));
    }
  };

  getById = async (id) => {
    const file = JSON.parse(await fs.readFile(`./${this.fileName}.txt`));
    const result = file.find((el) => el.id === +id);
    if (!result) return null;
    return result.products;
  };

  addProductById = async (id) => {
    const product = productModifier.getById(+id);
    return JSON.parse(await fs.readFile(`./${this.fileName}.txt`));
  };

  deleteById = async (id) => {
    const file = JSON.parse(await fs.readFile(`./${this.fileName}.txt`));
    const index = file.findIndex((el) => el.id === +id);
    if (index > -1) {
      file.splice(index, 1);
      await fs.writeFile(`./${this.fileName}.txt`, JSON.stringify(file));
    }
  };
}

export default Modifier;
