import mongoose from "mongoose";


const awardSchedma = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  abbreviation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  currentHolder: {
    type: {
      name: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
    },
    required: true,
  },
  previousWinners: {
    type: [
      {
         _id: false ,
   
        name: {
          type: String,
          required: true,
        },
        year: {
          type: Number,
          required: true,
        },
      },
    ],
    required: true,
  },
});


export default mongoose.model("award",awardSchedma,"awards")