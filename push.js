var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BEGHRI_Y5ifl4FI0jrrpBc3sIjn2qwUPxfbsueQkTK_Aez3nqpMPqLnQnQmBpUX_Sdz7FRvqrxEvA5qiairzsPQ",
  privateKey: "GXCJwZHslXZ5zTTB7S44YwLRu-uxQeVLw4gXaEetdig",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/djZj0EyB2I0:APA91bFk0oaEj9ut0YjKTihCZSrxXlSEPMx3QXNsdJOf-sXrd86cOJGxG_CVB8vNLF9f_LH06Bzs54DTNQkMb0w6a-cTjhSQZ3Svds2XuJgOddFCu196crPvMBFSQxUloXqilsL76F8r",
  keys: {
    p256dh:
      "BFYYpXYuTAkDw7zlGfaeFXh9MIgne9Y9uYR0pKBcZE5HHjZ81x9dEQsFeXehqkoyVklmhMctbTtLhxC16lLbUQY=",
    auth: "DFa89jHCkI0QNxfcmgjhbQ==",
  },
};
var payload = "Congratulations! You Got Ballmons App Notification!";

var options = {
  gcmAPIKey: "716718986488",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
