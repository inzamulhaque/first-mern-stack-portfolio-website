const dotenv = require('dotenv');
require('dotenv').config({path: "./.env"});
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 7000;

require("./db/conn");

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(require("./router/auth"));

if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
}

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});