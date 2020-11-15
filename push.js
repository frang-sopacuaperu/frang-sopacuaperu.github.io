var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BAReJDcJjAoLkcH9G5jEQD1npBKR5k-P0dohU7pmZ0yPfmrwuJmSjcX3RH6GkQI_rCME_Bwo0DVf4OmcTY1PCmE",
  privateKey: "8_3Z-uiyjGIpqaBhRDETXH5oO8wGLW3aTr3fxLEFa20",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/d1tIDAs-6EA:APA91bGaZX6N_Vs383K9kXqaApDeAs1Q1e4SWHGzfSy3DxKKmm2pnacaEqevuYnUjCvycysmki60woUYn9HS-oodISt55y2cnHBF_4I563qra-B5oHsm9qPHtXXCOC34Pv33Dqm1Zexl",
  keys: {
    p256dh:
      "BL9YXNxgRkneYgWhUy0jEUl7FKeC/zxcs3bW1SJjYmrPkE8uS6dxD4RyJSAbtbRTcbjXsZL7GjCsdmsksZOI3KE=",
    auth: "WD3sMWEeYLFTVh+eB8DliA==",
  },
};
var payload = "Congratulations! You Got Ballmons App Notification!";

var options = {
  gcmAPIKey: "716718986488",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
