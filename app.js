const express = require("express");

const app = express();
const cors = require("cors");
const helmet = require("helmet");

const morgan = require("morgan");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const hairSalonRouter = require("./routes/HairSalonRoutes");
const beautySalonRouter = require("./routes/ BeautySalonRoutes");
const userRouter = require("./routes/UserRoutes");
const bookingRouter = require("./routes/BookingRoutes");
const townshipRouter = require("./routes/TownshipRoutes");
const serviceRouter = require("./routes/ServiceRoutes");

console.log(process.env.NODE_ENV);

// middleware
// Implement CORS

app.use(cors());

app.options("*", cors());

app.use(express.json());

// serving static files
app.use(express.static(`${__dirname}/public`));

// set security http headers

app.use(helmet());

// developpement logging

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  console.log("hello from the middleWare");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      titlle: "lizzy API",
      description:
        "la plateforme  qui vous offre  le moyen d'explorer et de réserver dans un des salons de Kinshasa",
      contact: {
        name: "Arslène KABINDA",
        email: "arskabinda@gmail.com",
      },
      server: "http:127.0.0.1:4000",
    },
  },
  apis: ["app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
/**
 * @swagger
 * /restaurants/all:
 *  get:
 *      description : get all restaurants figuring in the yuding platform
 *      responses :
 *        '200':
 *          description : successfull !
 */
const corsOptions = {
  origin: "http://localhost:3002",
  optionsSuccessStatus: 200,
};
app.use("/api/hairSalons", cors(corsOptions), hairSalonRouter);
app.use("/api/beautySalons", beautySalonRouter, cors(corsOptions));
app.use("/api/users", userRouter, cors(corsOptions));
app.use("/api/booking", bookingRouter, cors(corsOptions));
app.use("/api/township", townshipRouter, cors(corsOptions));
app.use("/api/services", serviceRouter, cors(corsOptions));

module.exports = app;
