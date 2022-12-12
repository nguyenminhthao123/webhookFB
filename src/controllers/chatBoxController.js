import request from "request";
require("dotenv").config();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const verifyToken = process.env.VERIFY_TOKEN;

let getHomePage = (req, res) => {
  return res.send("Thế giới di động 188204 Minh Thao 123412");
};
let getWebhook = (req, res) => {
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === verifyToken) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED", verifyToken);
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
      console.log("Không thẻ chạy được");
    }
  }
};

let postWebhook = (req, res) => {
  let body = req.body;

  console.dir(body, { depth: null });
  if (body.object === "page") {
    body.entry.forEach(function (entry) {
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
      let sender_psid = webhook_event.sender.id;
      console.log("sender_psid Nguyễn Minh Thao", sender_psid);
      if (webhook_event.message) {
        handlerMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlerPostback(sender_psid, webhook_event.postback);
      }
    });
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
};
let handlerMessage = (sender_psid, received_message) => {
  let response;

  // Check if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message
    response = {
      text: `Cảm ơn bạn đã quan tâm đến sản phẩm của chúng tôi`,
    };
  }

  // Sends the response message
  callSendAPI(sender_psid, response);
};
let handlerPostback = (sebder_psid, received_postback) => {};
let callSendAPI = (sender_psid, response) => {
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
};
module.exports = {
  getHomePage: getHomePage, // key:value export function
  getWebhook: getWebhook,
  postWebhook: postWebhook,
};
