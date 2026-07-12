import mongoose from "mongoose";
import express from "express"
import {viewAllPlayers,addPlayer,viewPlayerByPosition,updateStats,deletePlayer} from "../controllers/playerMethods.js"

const Router = express.Router()


Router.route("/").get(viewAllPlayers).post(addPlayer)

Router.route("/:name").get(viewAllPlayers).delete(deletePlayer)

Router.route("/position/:position").get(viewPlayerByPosition)

Router.route("/:name/updateStat/").patch(updateStats)

export default Router;


