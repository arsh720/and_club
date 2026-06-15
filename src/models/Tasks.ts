import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'To Do',
    },
    assignee: {
        type: String,
        default: 'Unassigned',
    },
    department: {
        type: String,
        enum: ['Technical', 'Design', 'Marketing', 'PR', 'General'],
        default: 'General',
    },
});

const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);

export default Task;