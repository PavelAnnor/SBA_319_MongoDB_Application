import mongoose from "mongoose";


const playerSchema = mongoose.Schema({
  fName: {
    required: true,
    type: String,
  },
  lName: {
    required: true,
    type: String,
  },
  team:{
    type:String,
    default:"Free Agent"
  },
  jerseyNumber: {
    required: true,
    type: Number,
  },
  positions:{
    required:true,
    type:[]
  },
  stats:{
    type:Object,

    default:{
        "gamesPlayed":0,
        "minPerGame":0,
        "pointsPerGame":0,
        "reboundsPerGame":0,
        "assistsPerGame":0,
        "turnoversPerGame":0,
        "blocksPerGame":0,
        "3pt%":0.0,
        "fieldGoal%":0.0,
        "freethrow%":0.0

    }
  }

});


export default mongoose.model("players",playerSchema,"players")