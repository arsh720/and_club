"use client";

import { useState } from "react";

// 1. Added _id, status, and an onRefresh function to the props
type TaskCardProps = {
    _id: string;
    title: string;
    description: string;
    priority: string;
    completion: boolean;
    status: string;
    assignee: string;
    department: string;
    onRefresh: () => void; 
};

const TaskCard = ({ _id, title, description, priority, completion, status, onRefresh }: TaskCardProps) => {
    const [isUpdating, setIsUpdating] = useState(false);

    // 2. This function triggers when you change the dropdown menu
    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        setIsUpdating(true);

        try {
            // Tell our new PATCH route to update this specific task
            const res = await fetch("/api/tasks", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: _id, status: newStatus }),
            });

            if (res.ok) {
                onRefresh(); // Tell the main page to fetch the new data so the card moves columns visually!
            }
        } catch (error) {
            console.error("Failed to update status", error);
        } finally {
            setIsUpdating(false);
        }
    };
    const handleDelete = async () => {
        setIsUpdating(true);
        try {
            const res = await fetch("/api/tasks", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: _id }),
            });

            if (res.ok) {
                onRefresh(); // Refresh the page so the card disappears!
            }
        } catch (error) {
            console.error("Failed to delete task", error);
            setIsUpdating(false); // Only turn off loading if it fails, otherwise let it unmount
        }
    };

    const bgClass =
        priority.toLowerCase() === "high"
            ? "bg-red-400"
            : priority.toLowerCase() === "medium"
            ? "bg-yellow-400"
            : "bg-green-400";

    return (
        <div className={`flex h-auto w-64 self-start flex-col rounded-2xl border-2 border-black overflow-hidden shrink-0 ${bgClass} ${isUpdating ? "opacity-50" : ""}`}>
            {/* 3. Modified this header to hold the title AND the dropdown menu side-by-side */}
            <div className="bg-black p-3 flex justify-between items-center text-teal-200">
                <h2 className="text-xl font-bold truncate pr-2">{title}</h2>
                
                {/* The Dropdown Menu */}
                <select 
                    value={status} 
                    onChange={handleStatusChange}
                    disabled={isUpdating}
                    className="bg-white text-black text-xs p-1 rounded font-bold cursor-pointer"
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>

            <div className="p-3">
                <div className="rounded-xl border border-black bg-teal-200 p-3 text-sm wrap-break-words">
                    {description}
                </div>
            </div>
                        {/* CONDITIONAL RENDERING: Only show this button if the task is in the 'Done' stage */}
            {status === 'Done' && (
                <div className="p-3 pt-0">
                    <button 
                        onClick={handleDelete}
                        disabled={isUpdating}
                        className="w-full bg-red-600 text-white font-bold py-2 rounded-xl hover:bg-red-700 transition-colors"
                    >
                        Delete Task
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskCard;