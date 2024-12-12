import Title from "../models/titleSchema.js";

export const createToDo = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Check if required fields are present
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if a task with the same title already exists
        const existingTask = await Title.findOne({ title });
        if (existingTask) {
            return res.status(200).json({
                success: false,
                message: "Task already exists",
            });
        }

        // Create a new task
        const task = await Title.create({ 
            title, 
            description, 
            status: 'pending' 
        });

        res.status(201).json({
            success: true,
            message: "New task has been created successfully",
            task, // Returning the created task
        });
    } catch (error) {
        console.error(`Error in adding tasks: ${error}`);
        res.status(500).json({
            success: false,
            message: "Error in adding task",
            error
        });
    }
};



export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the ID is provided
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Task ID is required",
            });
        }

        // Find and delete the task
        const taskToDelete = await Title.findByIdAndDelete(id);

        // Check if the task exists
        if (!taskToDelete) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        // Successful deletion
        res.status(200).json({
            success: true,
            message: "Successfully deleted the task",
            task: taskToDelete,
        });

    } catch (error) {
        console.error(`Error in deleting tasks: ${error}`);
        res.status(500).json({
            success: false,
            message: "Error in deleting task",
            error,
        });
    }
};





export const updateTasks = async (req, res) => {
    try {
        const { title, description } = req.body;
        const { id } = req.params;

        // Validate input
        if (!title && !description) {
            return res.status(400).json({
                success: false,
                message: "At least one field (title or description) is required for update",
            });
        }

        // Construct the update object dynamically
        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;

        // Find and update the task
        const updatedTask = await Title.findByIdAndUpdate(
            id, 
            updateData, 
            { new: true, runValidators: true } // Return the updated document and validate fields
        );

        // Check if the task exists
        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        // Successful response
        res.status(200).json({
            success: true,
            message: "Successfully updated the task",
            task: updatedTask,
        });
    } catch (error) {
        console.error(`Error in updating tasks: ${error}`);
        res.status(500).json({
            success: false,
            message: "Error in updating task",
            error,
        });
    }
};
