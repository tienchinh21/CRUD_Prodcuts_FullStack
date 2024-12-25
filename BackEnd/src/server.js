require('dotenv').config();
const express = require('express');
const app = express();
const router = require("./routes/api");
const cors = require("cors");


const port = process.env.PORT || 3001;
const hostname = process.env.DB_HOST;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use("/v1/api/", router);


app.listen(port, hostname, () => {
    console.log(`Example app listening on http://${hostname}:${port}`);
});
