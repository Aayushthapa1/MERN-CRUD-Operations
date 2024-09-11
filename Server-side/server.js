const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config()

const routes = require("./routes/TaskRoute");
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err))

app.use("/api", routes);



app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})