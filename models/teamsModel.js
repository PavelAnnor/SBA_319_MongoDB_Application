import mongoose from "mongoose";

const teamSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },

  abbreviation: {
    required: true,
    type: String,
  },
  founded: {
    required: true,
    type: Number,
  },
  championships: {
    required: true,
    type: Number,
  },
  players: {
    type: [],
    default: [],
  },
  location: {
    _id: false,
    required: true,
    type: {
      city: {
        type: String
      },
      state: {
        type: String
      },
    },
  },
});

export default mongoose.model("teams",teamSchema,"teams");