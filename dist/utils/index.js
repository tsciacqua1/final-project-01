"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

class Modifier {
  constructor(fileName) {
    this.fileName = fileName;
  }

  save = async object => {
    try {
      await _fs.promises.readFile(`./${this.fileName}.txt`);
    } catch (err) {
      await _fs.promises.writeFile(`./${this.fileName}.txt`, "");
    }

    try {
      const file = await _fs.promises.readFile(`./${this.fileName}.txt`);

      if (!file.length) {
        object.id = file.length + 1;
        let array = [...file, object];
        await _fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(array));
      } else {
        const parsedFile = JSON.parse(file);
        object.id = parsedFile.length + 1;
        let array = [...parsedFile, object];
        await _fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(array));
      }

      return object.id;
    } catch (error) {
      console.error(error.message);
    }
  };
  saveInCart = async object => {
    if (object) {
      const file = await _fs.promises.readFile(`./${this.fileName}.txt`, "utf8");
      const parsedFile = JSON.parse(file);
      const array = [...parsedFile, object];
      await _fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(array));
    }
  };
  updateById = async (id, object) => {
    const file = JSON.parse(await _fs.promises.readFile(`./${this.fileName}.txt`));
    const index = file.findIndex(el => el.id === +id);

    if (index > -1) {
      file[index] = {
        id: +id,
        timestamp: file[index].timestamp,
        ...object
      };
      await _fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(file));
    }
  };
  getById = async id => {
    const file = await _fs.promises.readFile(`./${this.fileName}.txt`);
    const parsedFile = JSON.parse(file);
    const result = parsedFile.find(el => el.id === +id);
    if (!result) return null;
    return result;
  };
  getAll = async () => {
    return JSON.parse(await _fs.promises.readFile(`./${this.fileName}.txt`));
  };
  deleteById = async id => {
    const file = JSON.parse(await _fs.promises.readFile(`./${this.fileName}.txt`));
    const index = file.findIndex(el => el.id === +id);

    if (index > -1) {
      file.splice(index, 1);
      await _fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(file));
    }
  };
  deleteAll = async () => {
    await _fs.promises.rm(`./${this.fileName}.txt`);
  };
  createCart = async () => {
    try {
      await _fs.promises.readFile(`./${this.fileName}.txt`);
    } catch (err) {
      await _fs.promises.writeFile(`./${this.fileName}.txt`, "[]");
    }
  };
}

var _default = Modifier;
exports.default = _default;