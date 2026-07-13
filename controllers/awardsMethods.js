import mongoose from "mongoose";
import Award from "../models/awardsModel.js";

//Function to find all award documents 
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


//function to create a new award docu
async function addAward(req, res) {
  try {
    const result = await Award.create(req.body);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

//function to add a winner object to an award docu
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
//fucntion to retrive awards for a specific year
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
              as: "winner", //as is a variable created to reference every element in the array (like let i in for loops)
              cond: { $eq: ["$$winner.year", Number(req.params.year)] }, //n=filter the array to only include elements where the .year property is req.params.year
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