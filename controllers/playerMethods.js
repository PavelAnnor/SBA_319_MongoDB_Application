import mongoose from "mongoose";
import Players from "../models/playersModel.js";
import {capital} from "../util/util.js"

async function viewAllPlayers(req,res) {


    try {

        if(req.params.name){
            const q = {
              $or: [
                { fName: capital(req.params.name.toLowerCase()) },
                { lName: capital(req.params.name.toLowerCase()) },
              ],
            };
             const result = await Players.find(q);
             res.send(result)
             return
        }
        
        const result = await Players.find({});
        res.send(result)
        
    } catch (error) {

        console.log(error)
        
    }

   
}


async function viewPlayerByPosition(req,res){


    try {

        const q = { positions: { $in: [req.params.position.toUpperCase()] } };
        const result = await Players.find(q)
        
        res.send(result);
        
    } catch (error) {
        console.log(error);
        
    }

}


async function addPlayer(req,res) {

    try {
        const result = Players.create(req.body)
        res.send(result)
    } catch (error) {

        console.log(error)
        
    }
    
}

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

    for(let i in req.body){
        x[i] = req.body[i]
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

async function deletePlayer(req,res) {


    try {
         const q = {
           $or: [
             { fName: capital(req.params.name.toLowerCase()) },
             { lName: capital(req.params.name.toLowerCase()) },
           ],
         };
        const result = await Players.findOneAndDelete(q);

        res.send(result)
        
    } catch (error) {

        console.log(error)
        
    }
    
}




export {viewAllPlayers, addPlayer, viewPlayerByPosition, updateStats, deletePlayer}