
SBA 318 - Express Server Application Date: 07/12/26

📋 Description Project created for Per Scholas Software Engineering Track intended to show profiency with node's express module and mongoose

An API for information on the NBA. Including information about players, awards, and teams.

🔧 Technology HTML, CSS, JS, Express, Mongoose, MongoDB

💡 Notes N/A

🔗 References N/A


Player Routes
Endpoint: “/players”
EX: “http://localhost:3000/players”
GET: Retrieves all player documents in the database
POST: Adds a document representing a player and their corresponding information to the database
Sample request body sent in a Post request to add a player to the players collection:
{
  "fName": "Bam",
  "lName": "Adebayo",
  "team": "Miami Heat",
  "jerseyNumber": 222,
  "positions": [
    "PG",
    "SG"
  ],
  "stats": {
    "gamesPlayed": 70,
    "minPerGame": 0,
    "pointsPerGame": 83,
    "reboundsPerGame": 4,
    "assistsPerGame": 6.6,
    "turnoversPerGame": 0,
    "blocksPerGame": 0,
    "3pt%": 0,
    "fieldGoal%": 0,
    "freethrow%": 0
  }
}
Endpoint: “/players/:name”
EX: “http://localhost:3000/players/edwards/” OR  “http://localhost:3000/players/anthony/” 
GET: Retrieves player information for a player with specified last OR first name. NOTE: First letter in req.params.name can be lowercase. Be aware of hyphenated names, names with other special characters
DELETE: Deletes player information for a player with specified last OR first name. NOTE: First letter in req.params.name can be lowercase. Be aware of hyphenated names, names with other special characters
Endpoint: “/players/:name/updateStat”
EX: “http://localhost:3000/players/edwards/updateStat”
PATCH: Updates the stats field of a specified player. NOTE. req.body can contain any number of properties. Properties present in req.body but not in the stats field will be added. Properties existing in both will be replaced.
Sample req.body sent in a patch request to “http://localhost:3000/players/edwards/updateStat”
In order to update the stats of the player anthony edwards 
 {
    "gamesPlayed": 45,
    "minPerGame": 32.1,
    "pointsPerGame": 26.7,
    "reboundsPerGame": 4.9,
    "assistsPerGame": 10.6,
    "turnoversPerGame": 4.5,
    "blocksPerGame": 3.4,
    "3pt%": 55.6,
    "fieldGoal%": 46.5,
    "freethrow%": 56.7
  }

OR

 {
    "gamesPlayed": 70,
 }


Endpoint: “/players/position/:position”
EX: “http://localhost:3000/players/position/sg”
GET: Retrieves all players within the database that have the specified req.params.position within the “positions” field (an array). Possible values for req.params.position include pg,sg,sf,pf,c (representing the 5 positions in basketball)








Team Routes 
Endpoint: “/teams”
GET: Retrieves all teams within the database with corresponding names, years, founded, and players
POST: Adds a document representing a team and their corresponding information to the database
Sample request body sent in a post request  to add a team to the teams collection
{ "name": "Los Angeles Lakers", "abbreviation": "LAL", "founded": 1947, "championships": 17, "players": [], "location": { "city": "Los Angeles", "state": "California" } }


Endpoint: “/teams/:team”
EX: “http://localhost:3000/teams/NYK” or “http://localhost:3000/teams/New%20York%20Knicks”
GET: Retrieves teams with a specified name OR abbreviated name from req.params.team (EX New York Knicks or nyk) 
NOTE: First letter in req.params.name can be lowercase. Be aware of hyphenated names, names with other special characters
DELETE: Deletes teams with a specified name OR abbreviated name from req.params.team (EX New York Knicks or nyk) 
NOTE: First letter in req.params.name can be lowercase. Be aware of hyphenated names, names with other special characters

Endpoint: “/teams/:team/updateChampionships”
EX:“http://localhost:3000/teams/NYK/updateChampionships”
PATCH: Updates the”championships” field of a team (name or abbreviated name)

Sample req.body sent in a patch request to “http://localhost:3000/teams/NYK/updateChampionships”
In order to update the championships field of the New York Knicks (NYK) 
{
    "championships":45
}




Awards Routes
Endpoint: “/awards”

GET: Retrieves all nba awards within the database, with corresponding winners, descriptions,etc
POST: Adds a document representing an award and  corresponding information to the database
Sample request body sent in a post request  to add an award to the database 
{
  "name":"Most Valuable Player",
  "abbreviation":"MVP",
  "description":"The Kia NBA Most Valuable Player (MVP) is the league’s most prestigious individual honor, recognizing the best-performing regular-season player in the NBA",
  "currentHolder":{"name":"Shai Gilgeous Alexander","year":2026},
  "previousWinners":[
    {"name":"Shai Gilgeous Alexander","year":2026},
    {"name":"Shai Gilgeous Alexander","year":2025},
    {"name":"Nikola Jokic","year":2024},
    {"name":"Joel Embiid","year":2023}]
}
  
Endpoint: “/awards/:award”
EX: “http://localhost:3000/awards/mvp”
GET: Retrieves a specified nba awards within the database, with corresponding winners, descriptions,etc 
PATCH: Adds an object to the previousWinners field of a specified document. Object contains the name of the winner and the year the award was won

Sample request body sent in a post request to  to add an award winner to the previousWinners field 
{"name":"Shai Gilgeous Alexander","year":2027},

Endpoint: “/awards/year/:year”
EX:”http://localhost:3000/awards/year/2022”
GET: Retrieves nba awards winners for a specified year 



