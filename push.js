var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BDu7lLRJ-fUgG0O3tPF3hpBTskNL10u2fi_PVusKs0jJ_2_Ti48NEWKsqz7OQvg09hpQ5HTFdIHgU5wS4-_l0Tc",
  privateKey: "__AO48YrAMEve1MTbUrbVwtZwaK7CZ14J06cwnKxRB0",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/dYkGciInAcQ:APA91bGSpjJfmPvGir5mx4V_t1kUVyMjVsdABfdyfzo80Z1nTOImS-SiE9L_DigyRkZm_EoNPHbzrDo8wzbD6aPOo8vfc2hO9yKa0WETTFOS8RoBBqtm-Z3ddCkCe05UoUz_MtX7ak6k",
  keys: {
    p256dh:
      "BLQxBZeE6rEowevopdZx3XApVW/gGQB2IRZI065PtOTcEZIpDLHTAujdlIEGpTTbz44Ru9l4utgoNWT4UbcFUQg=",
    auth: "0LTXhOfRKwzbqHV06EJxwA==",
  },
};
var payload = "Congratulations! You Got Ballmons App Notification!";

var options = {
  gcmAPIKey: "716718986488",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
