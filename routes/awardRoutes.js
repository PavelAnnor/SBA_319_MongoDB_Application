import express from "express"
import { capital } from "../util/util.js"
import { viewAwards ,addAward,addAwardWinner,viewAwardsByYear} from "../controllers/awardsMethods.js";



const Router = express.Router()

Router.route("/").get(viewAwards).post(addAward)

Router.route("/:award").get(viewAwards).patch(addAwardWinner)

Router.route("/year/:year").get(viewAwardsByYear)







export default Router