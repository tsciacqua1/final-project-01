"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdmin = void 0;
const isAdminBool = true;

const isAdmin = (req, res, next) => {
  return isAdminBool ? next() : res.status(400).json({
    error: true,
    message: "not allowed"
  });
};

exports.isAdmin = isAdmin;