import express from "express";
let configViewEngine = (app) => {
  app.use(express.static("./src/public/")); // cấu hình đường links
  app.set("view engine", "ejs"); // cấu hình view engine
  app.set("views", "./src/views");
};
module.exports = configViewEngine;
