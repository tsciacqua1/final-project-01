import { promises as fs } from "fs";
import path from "path";

class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
  }

  save = async (object) => {
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

  updateById = async (id, object) => {
    const file = JSON.parse(await fs.readFile(`./${this.fileName}.txt`));
    const index = file.findIndex((el) => el.id === +id);

    if (index > -1) {
      file[index] = { id: +id, timestamp: file[index].timestamp, ...object };
      await fs.writeFile(`./${this.fileName}.txt`, JSON.stringify(file));
    }
  };

  getById = async (id) => {
    const file = await fs.readFile(`./${this.fileName}.txt`);
    const parsedFile = JSON.parse(file);
    const result = parsedFile.find((el) => el.id === +id);
    if (!result) return null;
    return result;
  };

  getAll = async () => {
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

export default Contenedor;
