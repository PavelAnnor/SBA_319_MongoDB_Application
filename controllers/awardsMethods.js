import mongoose from "mongoose";
import Award from "../models/awardsModel.js";


async function viewAwards(req,res) {


    try {

        if(req.params.award){

            const q = { $or: [{ name: req.params.award }, { abbreviation:(req.params.award).toUpperCase()}] };
            const result = await Award.find(q);
            res.send(result);

            return
        }
        const result = await Award.find({})
        res.send(result)

    } catch (error) {
        
        console.log(error)
    }
    
}



async function addAward(req, res) {
  try {
    const result = await Award.create(req.body);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}


async function addAwardWinner(req, res) {
  try {
     const q = {
       $or: [
         { name: req.params.award },
         { abbreviation: req.params.award.toUpperCase() },
       ],
     };
    
    const result = await Award.findOneAndUpdate(
      q,
      { $push: { previousWinners: req.body } },
      { returnDocument: "after" },
    );
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

async function viewAwardsByYear(req, res) {
  try {
   
    const result = await Award.aggregate([
      {
        $match: {
          "previousWinners.year": Number(req.params.year),
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          description: 1,
          winner: {
            $filter: {
              input: "$previousWinners",
              as: "winner",
              cond: { $eq: ["$$winner.year", Number(req.params.year)] },
            },
          },
        },
      },
    ]);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}






export {viewAwards,addAward,addAwardWinner,viewAwardsByYear}