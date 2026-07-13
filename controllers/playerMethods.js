import mongoose from "mongoose";
import Players from "../models/playersModel.js";
import Teams from "../models/teamsModel.js"
import { capital } from "../util/util.js";

//function to view all players
async function viewAllPlayers(req, res) {
  try {
    if (req.params.name) {
      const q = {
        $or: [
          { fName: capital(req.params.name.toLowerCase()) },
          { lName: capital(req.params.name.toLowerCase()) },
        ],
      };
      const result = await Players.find(q);
      res.send(result);
      return;
    }

    const result = await Players.find({});
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

//function to view players with a specified positon in the positons array
async function viewPlayerByPosition(req, res) {
  try {
    const q = { positions: { $in: [req.params.position.toUpperCase()] } };
    const result = await Players.find(q);

    res.send(result);
  } catch (error) {
    console.log(error);
  }
}
//function to add a player docu
async function addPlayer(req, res) {
  try {
    const result = Players.create(req.body);
    addPlayerToTeam(req,res)
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}
//function toupdate/add stats to stats field of a docu
async function updateStats(req, res) {
  try {
    const q = {
      $or: [
        { fName: capital(req.params.name.toLowerCase()) },
        { lName: capital(req.params.name.toLowerCase()) },
      ],
    };
    const x = {
      gamesPlayed: 0,
      minPerGame: 0,
      pointsPerGame: 25,
      reboundsPerGame: 0,
      assistsPerGame: 0,
      turnoversPerGame: 0,
      blocksPerGame: 0,
      "3pt%": 0,
      "fieldGoal%": 0,
      "freethrow%": 0,
    };

    for (let i in req.body) {
      x[i] = req.body[i];
    }

    const result = await Players.findOneAndUpdate(
      q,
      { $set: { stats: x } },
      { returnDocument: "after" },
    );

    res.send(result);
  } catch (error) {
    console.log(error);
  }
}
//function to delete a player
async function deletePlayer(req, res) {
  try {
    const q = {
      $or: [
        { fName: capital(req.params.name.toLowerCase()) },
        { lName: capital(req.params.name.toLowerCase()) },
      ],
    };
    const result = await Players.findOneAndDelete(q);

    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

//function that runs when a player document is created. It adds them to the corresponding tams array within the teams collection
async function addPlayerToTeam(req, res) {
  try {
    const q = {
      $or: [
        { name: req.body.team },
        { abbreviation: req.body.team.toUpperCase() },
      ],
    };
    const playerName = capital(req.body.fName) +" " + capital(req.body.lName)
    const result = await Teams.findOneAndUpdate(q,{$push:{players:playerName}},{returnDocument:"after"});
   
  } catch (error) {
    console.log(error);
  }
}

export {
  viewAllPlayers,
  addPlayer,
  viewPlayerByPosition,
  updateStats,
  deletePlayer,
};
