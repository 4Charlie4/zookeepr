const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const express = require("express");
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const app = express();

//parses incoming data into JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);
app.listen(PORT, () => {
  console.log(`API Server now on ${PORT}`);
});
