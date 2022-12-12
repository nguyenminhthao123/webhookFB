import express from "express";
import chatBoxController from "../controllers/chatBoxController";
let router = express.Router();
let initWebRoute = (app) => {
  router.get("/", chatBoxController.getHomePage);
  router.get("/webhook", chatBoxController.getWebhook);
  router.post("/webhook", chatBoxController.postWebhook);
  return app.use("/", router);
};
module.exports = initWebRoute;
