// Load local environment variables from .env (if present)
require('dotenv').config();

const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const passportSetup = require("./Passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const trendingRoute = require("./routes/trending");
const upcomingRoute = require("./routes/upcoming");
const recommendedRoute = require("./routes/recommended");
const topratedRoute = require("./routes/toprated");
const searchpagesRoute = require("./routes/searchpages");
const filterRoute = require("./routes/filter");
const carousel1Route = require("./routes/carousel1");
const carousel2Route = require("./routes/carousel2");
const carousel3Route = require("./routes/carousel3");
const carousel4Route = require("./routes/carousel4");
const carousel5Route = require("./routes/carousel5");
const request = require("request");

// Swagger dependencies
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();

// Cookie session
app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);
const session = require("express-session");

// Passport
app.use(passport.initialize());
app.use(passport.session());

// CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie Recommendation API",
      version: "1.0.0",
      description: "API documentation for trending and upcoming movies",
    },
    servers: [{ url: `http://localhost:${process.env.APP_PORT}` }],
  },
  apis: ["./routes/*.js", "./server.js"], // scans ALL route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Endpoint to get all top rated movies
app.get('/api/findmovies', async (req, res) => {
  try {
    const movies = await prisma.tbl_toprated.findMany();
    res.json({
      success: true,
      data: movies
    });
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching top rated movies'
    });
  }
});

// Routes
app.use("/toprated", topratedRoute);
app.use("/auth", authRoute);
app.use("/trending", trendingRoute);
app.use("/upcoming", upcomingRoute);
app.use("/recommended", recommendedRoute);
app.use("/searchpages", searchpagesRoute);
app.use("/carousel1", carousel1Route);
app.use("/carousel2", carousel2Route);
app.use("/carousel3", carousel3Route);
app.use("/carousel4", carousel4Route);
app.use("/carousel5", carousel5Route);
app.use("/filter", filterRoute);


// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Movie Recommendation API",
    version: "1.0.0",
    endpoints: {
      auth: "/auth",
      trending: "/trending",
      upcoming: "/upcoming",
      recommended: "/recommended",
      toprated: "/toprated",
      searchpages: "/searchpages",
      carousel1: "/carousel1",
      carousel2: "/carousel2",
      carousel3: "/carousel3",
      carousel4: "/carousel4",
      carousel5: "/carousel5",
      filter: "/filter",
      docs: "/api-docs"
    }
  });
});


app.use((req, res, next) => {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb) => cb(); // no-op
  }
  if (req.session && !req.session.save) {
    req.session.save = (cb) => cb(); // no-op
  }
  next();
});

// Start server
app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running! on PORT ${process.env.APP_PORT}`);
});
