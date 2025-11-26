// const cookieSession = require("cookie-session");
// const express = require("express");
// const cors = require("cors");
// const passportSetup = require("./passport");
// const passport = require("passport");
// const authRoute = require("./routes/auth");
// const trendingRoute = require("./routes/trending");
// const app = express();
// const request = require("request")


// app.use(
//   cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
// );

// app.use(passport.initialize());
// app.use(passport.session());


// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );

// app.use("/auth", authRoute);
// app.use("/trending", trendingRoute);


// // app.get('/:id', function (req, res) {
// app.get('/recomm/:id', function (req, res) {
//   // const { id } = useParams();

//   // request(`http://127.0.0.1:5000/movie/Hulk`, function (error, response, body) {
//   request(`http://127.0.0.1:5000/movie/` + req.params.id, function (error, response, body) {
//     console.error('error:', error); // Print the error
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     console.log('body:', body); // Print the data received
//     res.send(body); //Display the response on the website
//   });
// });



// app.listen("5000", () => {
//   console.log("Server is running! on PORT 5000");
// });


// Load local environment variables from .env (if present)
require('dotenv').config();

const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./Passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const trendingRoute = require("./routes/trending");
const upcomingRoute = require("./routes/upcoming");
const request = require("request");

// Swagger dependencies
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();

// Cookie session
app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

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
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./routes/*.js"], // 👈 scans ALL route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/auth", authRoute);
app.use("/trending", trendingRoute);
app.use("/upcoming", upcomingRoute);

app.get("/recomm/:id", function (req, res) {
  request(`http://127.0.0.1:5000/movie/${req.params.id}`, function (error, response, body) {
    console.error("error:", error);
    console.log("statusCode:", response && response.statusCode);
    console.log("body:", body);
    res.send(body);
  });
});

// Start server
app.listen("5000", () => {
  console.log("Server is running! on PORT 5000");
});
