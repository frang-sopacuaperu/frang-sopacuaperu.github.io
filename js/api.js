const BASE_URL = "https://api.football-data.org/v2/";
const API_KEY = "0de80ef3755341acac677c5e06d57609";

const LEAGUE_ID = 2021;

const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;

const TEAM_ID = 61;
const TEAM_SQUAD = `${BASE_URL}teams/${TEAM_ID}`;

function showLoading() {
  const content = document.getElementById("body-content");
  content.innerHTML = "";
  const html = `
            <div class="preloader-wrapper big active">
              <div class="spinner-layer spinner-blue-only">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                  <div class="circle"></div>
                </div><div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
            </div>
        `;
  document.getElementById("loader").innerHTML = html;
}

function hideLoading() {
  document.getElementById("loader").innerHTML = "";
}

const fetchAPI = (url) => {
  return fetch(url, {
    headers: {
      "X-Auth-Token": API_KEY,
    },
  })
    .then((res) => {
      if (res.status !== 200) {
        console.log("Error: " + res.status);
        return Promise.reject(new Error(res.statusText));
      } else {
        return Promise.resolve(res);
      }
    })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

function getAllStandings() {
  showLoading();
  if ("caches" in window) {
    caches.match(ENDPOINT_COMPETITION).then((response) => {
      if (response) {
        response.json().then((data) => {
          console.log("Competition Data: " + data);
          showStanding(data);
        });
      }
      hideLoading();
    });
  }

  fetchAPI(ENDPOINT_COMPETITION)
    .then((data) => {
      showStanding(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function showStanding(data) {
  let standings = "";
  let standingElement = document.getElementById("homeStandings");

  data.standings[0].table.forEach((standing) => {
    standings += `
                <tr>
                    <td><img src="${standing.team.crestUrl.replace(
                      /^http:\/\//i,
                      "https://"
                    )}" width="30px" alt="badge"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>
                    <a 
                    href="./team.html?id=${standing.team.id}"
                    class="waves-effect waves-light blue btn">
                    More
                    </a>
                    </td>
                </tr>
        `;
  });

  standingElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="highlight responsive-table">
                    <thead>
                        <tr>
                            <th>Logo</th>
                            <th>Team Name</th>
                            <th>Win</th>
                            <th>Full Info</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standings}
                    </tbody>
                </table>
                
                </div>
    `;
}

function getAllSquad() {
  if ("caches" in window) {
    caches.match(TEAM_SQUAD).then((response) => {
      if (response) {
        response.json().then((data) => {
          console.log("Squad Data: " + data);
          showSquad(data);
        });
      }
    });
  }

  fetchAPI(TEAM_SQUAD)
    .then((data) => {
      showSquad(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function showSquad(data) {
  let squads = "";
  let squadElement = document.getElementById("teamSquad");

  data.squad.forEach((player) => {
    squads += `
                <tr>
                    <td>${player.name}</td>
                    <td>${player.position}</td>
                    <td>${player.dateOfBirth}</td>
                    <td>${player.countryOfBirth}</td>
                    <td>${player.nationality}</td>
                    <td>${player.shirtNumber}</td>
                </tr>
        `;
  });

  squadElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="highlight responsive-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Birth Date</th>
                            <th>Birth Country</th>
                            <th>Nationality</th>
                            <th>Shirt Number</th>
                        </tr>
                     </thead>
                    <tbody id="squads">
                        ${squads}
                    </tbody>
                </table>
                
                </div>
    `;
}

function getTeamById() {
  return new Promise((resolve) => {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    let teamHTML = "";
    if ("caches" in window) {
      caches.match(`${BASE_URL}teams/${idParam}`).then((response) => {
        if (response) {
          response.json().then((data) => {
            document.getElementById("body-content").innerHTML = teamHTML;
            resolve(data);
          });
        }
      });
    }
    fetchAPI(`${BASE_URL}teams/${idParam}`)
      .then(status)
      .then(function (data) {
        console.log(data);
        var teamHTML = `
          <div class="card col s12 m6">
            <div class="card-content">          
              <img 
                src="${data.crestUrl}" 
                alt="Team Logo" 
                class="responsive-img center-block" 
                width="350" 
                height="350" 
              />
              <h3 class="header center blue-text">${data.name}</h3>    
              <div class="center-align">      
                <p><span class="flow-text">Founded in ${data.founded}</span></p>
                <p><span class="flow-text">Club Color: ${data.clubColors}</span></p>
                <p><span class="flow-text">Venue: ${data.venue}</span></p>
                <p><span class="flow-text">Email: ${data.email}</span></p>
                <p><span class="flow-text">Address: ${data.address}</span></p>
                <p><span class="flow-text">Phone: ${data.phone}</span></p>
              </div>
              <div>
                <a 
                href="./index.html"
                class="waves-effect waves-light blue btn">
                Back
                </a>
              </div>
            </div>
          </div>
        `;
        document.getElementById("body-content").innerHTML = teamHTML;
        resolve(data);
      });
  });
}

function getStaredTeams() {
  getAll().then((teams) => {
    console.log(teams);

    var teamsHTML = "";
    teams.forEach((team) => {
      teamsHTML += `            
            <div class="divider"></div>
              <br>
                  <div class="card-image center">
                      <img src="${team.crestUrl.replace(
                        /^http:\/\//i,
                        "https://"
                      )}" width="250px" alt="badge"/>
                        <h3>${team.name}</h3>
                  </div>
                  <div class="section">
                      <div class="card-content">
                          <p>Founded in ${team.founded}</p>
                          <p>Club Color: ${team.clubColors}</p>
                          <p>Venue: ${team.venue}</p>
                      </div>
                  </div>
                  <div class="card-action">
                      <a 
                      href="./team.html?id=${team.id}&stared=true"
                      class="waves-effect waves-light blue btn">
                      More
                      </a>
                  </div>
                  <br>
            </div>
              
      `;
    });
    document.getElementById("body-content").innerHTML = teamsHTML;
  });
}

function getStaredTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then((team) => {
    let teamHTML = `
          <div class="card col s12 m6">
          <div class="card-content">
            <img
              src="${team.crestUrl.replace(/^http:\/\//i, "https://")}"
              alt="Team Logo"
              class="responsive-img center-block"
              width="350"
              height="350"
            />
            <h3 class="header center blue-text">${team.name}</h3>
            <div class="center-align">
              <p><span class="flow-text">Founded in ${team.founded}</span></p>
              <p><span class="flow-text">Club Color: ${
                team.clubColors
              }</span></p>
              <p><span class="flow-text">Venue: ${team.venue}</span></p>
              <p><span class="flow-text">Email: ${team.email}</span></p>
              <p><span class="flow-text">Address: ${team.address}</span></p>
              <p><span class="flow-text">Phone: ${team.phone}</span></p>
            </div>
            <div>
              <a
              href="./index.html"
              class="waves-effect waves-light blue btn">
              Back
              </a>
            </div>
          </div>
        </div>
    `;
    document.getElementById("body-content").innerHTML = teamHTML;
  });
}

function getById(id) {
  return new Promise((resolve) => {
    dbPromised
      .then((db) => {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(id);
      })
      .then((team) => {
        resolve(team);
      });
  });
}
