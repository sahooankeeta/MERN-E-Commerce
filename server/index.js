const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config()

const port = process.env.PORT || 8000;
const app = express();
const DB = process.env.DB.replace("<password>", process.env.PASSWORD);
//connect mongoose and express
mongoose.connect(DB).then((con) => {
  console.log("connection made to database");
})
.catch(err => console.log(err.message));

app.use(express.json())
app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use("/", require("./routes"));
app.all("*",(req, res) => {
    res.status(404).json({
        success:false,
        message :  `Cannot find ${req.originalUrl} on this server`
    })
}) 

 
app.listen(port, function (err) {
    if (err) {
      console.log("error on running port");
    }
    console.log(`server running on ${port}`);
});