import mongoose from "mongoose";
import Teams from "../models/teamsModel.js";
import { capital } from "../util/util.js";




async function viewAllTeams(req,res) {

    try {

        if(req.params.team){
            const q = {$or:[{name:req.params.team},{abbreviation:(req.params.team).toUpperCase()}]}
            const result = await Teams.find(q);
            res.send(result);
            return
        }

       const result =  await Teams.find({})
       res.send(result)
        
    } catch (error) {

        console.log(error)
        
    }
    
}


async function addTeam(req, res) {
  try {
    const result = await Teams.create(req.body);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}


async function deleteTeam(req, res) {
  try {
   const q = {
     $or: [
       { name: req.params.team },
       { abbreviation: req.params.team.toUpperCase() },
     ],
   };
    const result = await Teams.findOneAndDelete(q);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}




async function updateChampionships(req, res) {
  try {
    const q = {
      $or: [
        { name: req.params.team },
        { abbreviation: req.params.team.toUpperCase() },
      ],
    };
    const result = await Teams.findOneAndUpdate(
      q,
      {
        $set: { championships: req.body.championships },
      },
      { returnDocument: "after" },
    );
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}


export {viewAllTeams,addTeam,deleteTeam,updateChampionships}
