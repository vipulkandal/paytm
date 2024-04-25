const express = require("express");
const mainRouter = require("./routes/index");

const app = express();

app.use("/api/v1", mainRouter);

/*
 * /api/v1 => mainRouter so that in future if we want to add more routes we can easily do it
 * /api/v2 => another route here in future we can add it as well 
 * 
 * Also we can have /api/v1/user and /api/v1/product and so on
 * but better way is to have /api/v1 and then add /user and /product and so on
 * 
 * Basically at the end of the day api will be /api/v1/user/login
 * It's better to manage it in one place
*/