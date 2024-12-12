import express from "express"
import { createToDo } from "../controllers/titleControllers.js"


const router = express.Router()

router.post("/create-tasks" , createToDo)


export default router