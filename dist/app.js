"use strict";

var _express = _interopRequireWildcard(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("./routes/index.js"));

var _dotenv = require("dotenv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

(0, _dotenv.config)();
const {
  PORT
} = process.env;
const port = PORT || 8080;
const app = (0, _express.default)();
app.use((0, _express.json)());
app.use((0, _express.urlencoded)({
  extended: true
}));
app.use((0, _morgan.default)("dev"));
app.use("/api", _index.default);

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(500).send({
    error: true,
    error: err.message
  });
};

app.all("*", (req, res) => {
  res.status(404).json({
    error: true,
    message: `${req.path} doesn't exist`
  });
});
app.use(errorHandler);
app.listen(port, () => {
  console.log(`server on port ${port}`);
});