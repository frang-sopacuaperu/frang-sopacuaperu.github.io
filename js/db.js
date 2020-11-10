var dbPromised = idb.open("ballmons", 1, function (upgradeDb) {
  var teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id",
  });
  teamsObjectStore.createIndex("team_name", "team_name", { unique: true });
});

function saveStarTeam(team) {
  dbPromised
    .then((db) => {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      console.log(team);
      store.put(team);
      return tx.complete;
    })
    .then(function () {
      console.log("Your Star Team Saved!");
    });
}

function getAll() {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then((teams) => {
        resolve(teams);
      });
  });
}

const DeleteStarTeam = (team) => {
  dbPromised
    .then((db) => {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      console.log(team);
      store.delete(team);
      return tx.complete;
    })
    .then(function () {
      console.log("Your Star Team Deleted!");
    });
};
