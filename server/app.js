////// THIS IS FOR THE CODE THAT IS SPECIFIC FOR THE EXPRESS.

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
// const tourRouter = require("./routes/tourRoutes");
// const userRouter = require("./routes/userRoutes");
// const rideRouter = require("./routes/rideRoutes");
const dataRouter = require("./routes/dataRoutes");

const app = express();
app.use(cors());

//*** MIDDLEWARES FROM EXPRESS ***//
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// CUSTOM MIDDLEWARES :
app.use((req, res, next) => {
  console.log("Hello World from the middleware 👋🏻");
  next();
});

app.use("/api/v1/data", dataRouter);

// Handling all the routes other then the defined one's :
app.all("*", (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} in this server !!`);
  // err.statusCode = 404;
  // err.status = 'Fail',

  next(new AppError(`Can't find ${req.originalUrl} in this server !!`, 404));
});

// GLOBAL ERROR HANDLING FUNCTION :
app.use(globalErrorHandler);

module.exports = app;
