"use client";

import { useState } from "react";

// 1. Props (Added assignee and department here)
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

// 2. Destructured assignee and department so we can actually use them!
const TaskCard = ({ _id, title, description, priority, completion, status, assignee, department, onRefresh }: TaskCardProps) => {
    const [isUpdating, setIsUpdating] = useState(false);

    // --- YOUR EXISTING LOGIC REMAINS UNTOUCHED ---
    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        setIsUpdating(true);
        try {
            const res = await fetch("/api/tasks", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: _id, status: newStatus }),
            });
            if (res.ok) onRefresh();
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
            if (res.ok) onRefresh();
        } catch (error) {
            console.error("Failed to delete task", error);
            setIsUpdating(false); 
        }
    };

    const bgClass =
        priority.toLowerCase() === "high"
            ? "bg-red-400"
            : priority.toLowerCase() === "medium"
            ? "bg-yellow-400"
            : "bg-green-400";

    return (
        <div className={`flex h-auto w-64 self-start flex-col rounded-2xl border-2 border-black shrink-0 ${bgClass} ${isUpdating ? "opacity-50" : ""} relative`}>
            
            {/* Header: Title & Dropdown */}
            <div className="bg-black p-3 flex justify-between items-center text-teal-200 rounded-t-xl">
                <h2 className="text-lg font-bold truncate pr-2">{title}</h2>
                <select 
                    value={status} 
                    onChange={handleStatusChange}
                    disabled={isUpdating}
                    className="bg-white text-black text-xs p-1 rounded font-bold cursor-pointer shrink-0"
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>

            {/* Sub-Header: Department Badge & Assignee Name */}
            <div className="p-3 pb-1 flex justify-between items-center text-black">
                {/* Department Pill */}
                <span className="bg-white/60 border border-black px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider truncate max-w-[50%]">
                    {department || "General"}
                </span>
                {/* Assignee Name */}
                <span className="text-xs font-bold truncate max-w-[50%]" title={assignee}>
                    👤 {assignee || "Unassigned"}
                </span>
            </div>

            {/* THE NEW POP-UP TOOLTIP FEATURE */}
            <div className="px-3 py-3 flex justify-center relative group/tooltip">
                <span className="text-xs font-bold cursor-help border-b-2 border-black/30 pb-0.5 text-black/70 hover:text-black transition-colors">
                    Hover for Description
                </span>
                
                {/* The Hidden Box that appears on hover */}
                <div className="absolute top-full mt-2 w-[110%] -left-[5%] z-50 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none hidden group-hover/tooltip:block">
                    <div className="bg-black text-teal-200 p-3 rounded-xl border-2 border-teal-400 shadow-[4px_4px_0px_rgba(0,0,0,1)] text-sm break-words">
                        <span className="text-white text-[10px] uppercase tracking-wider block mb-1">Description:</span>
                        {description}
                    </div>
                </div>
            </div>

            {/* Conditional Delete Button */}
            {status === 'Done' && (
                <div className="p-3 pt-0 mt-auto">
                    <button 
                        onClick={handleDelete}
                        disabled={isUpdating}
                        className="w-full bg-red-600 text-white font-bold py-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px] transition-all"
                    >
                        Delete Task
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskCard;