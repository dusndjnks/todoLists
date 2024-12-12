import express from "express"
import { createToDo, deleteTask, updateTasks } from "../controllers/titleControllers.js"


const router = express.Router()

router.post("/create-tasks" , createToDo)
router.delete("/delete-tasks/:id" , deleteTask)
router.put("/update-tasks/:id" , updateTasks)


export default router