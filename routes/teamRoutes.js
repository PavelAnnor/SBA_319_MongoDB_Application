import mongoose from "mongoose";
import express from "express";
import {
  viewAllTeams,
  addTeam,
  deleteTeam,
  updateChampionships,
} from "../controllers/teamsMethods.js";


const Router = express.Router()

Router.route("/").get(viewAllTeams).post(addTeam)

Router.route("/:team").get(viewAllTeams).delete(deleteTeam)

Router.route("/:team/updateChampionships").patch(
  updateChampionships,
);




export default Router;