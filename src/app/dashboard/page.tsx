"use client";

import Navbar from "@/components/Navbar"
import TaskCard from "@/components/TaskCard";
import React, { useState, useEffect } from "react";

// 1. Updated the Task type to include the new status field
type Task = {
  _id: string;
  title: string;
  description: string;
  priority: string;
  completion: boolean;
  assignee: string;
  department: string;
  status: 'To Do' | 'In Progress' | 'Done'; 
};

export default function Home(){

    const [tasks, setTasks] = useState<Task[]>([]);

    async function fetchTasks() {
      const response = await fetch("/api/tasks", { cache: "no-store" });
      const data = await response.json();
      setTasks(data);
    }

    useEffect(() => {
      fetchTasks();
    }, []);

    // 2. Filter the main tasks array into three separate arrays based on status
    const todoTasks = tasks.filter((task) => task.status === 'To Do'|| !task.status);
    const inProgressTasks = tasks.filter((task) => task.status === 'In Progress');
    const doneTasks = tasks.filter((task) => task.status === 'Done');

    return (
      <>
        <Navbar />
        {/* PRIORITY COLOR LEGEND */}
        <div className="mb-8 flex gap-6 justify-center items-center bg-white border-2 border-black rounded-xl p-3 w-fit mx-auto shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <h3 className="font-bold text-sm uppercase tracking-wider">Priority Legend:</h3>
            
            <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-red-400 border-2 border-black block shadow-[2px_2px_0px_rgba(0,0,0,1)]"></span>
                <span className="text-xs font-bold">High</span>
            </div>
            
            <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-black block shadow-[2px_2px_0px_rgba(0,0,0,1)]"></span>
                <span className="text-xs font-bold">Medium</span>
            </div>
            
            <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-400 border-2 border-black block shadow-[2px_2px_0px_rgba(0,0,0,1)]"></span>
                <span className="text-xs font-bold">Low</span>
            </div>
        </div>        
        {/* 3. Changed to a 3-column grid for the Kanban board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          
          {/* Column 1: To Do */}
          <div className="bg-orange-50 p-4 rounded-lg min-h-[500px]">
            <h2 className="text-xl font-bold mb-4 text-center">To Do</h2>
            <div className="flex flex-col gap-4">
              {todoTasks.map((task) => (
                <TaskCard 
                  key={task._id}
                  _id={task._id}
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  completion={task.completion}
                  status={task.status}
                  department={task.department} 
                  assignee={task.assignee}   
                  onRefresh={fetchTasks}
                />
              ))}
            </div>
          </div>

          {/* Column 2: In Progress */}
          <div className="bg-orange-50 p-4 rounded-lg min-h-[500px]">
            <h2 className="text-xl font-bold mb-4 text-center">In Progress</h2>
            <div className="flex flex-col gap-4">
              {inProgressTasks.map((task) => (
                <TaskCard 
                  key={task._id}
                  _id={task._id}
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  completion={task.completion}
                  status={task.status}
                  assignee={task.assignee}
                  department={task.department}    
                  onRefresh={fetchTasks}
                />
              ))}
            </div>
          </div>

          {/* Column 3: Done */}
          <div className="bg-orange-50 p-4 rounded-lg min-h-[500px]">
            <h2 className="text-xl font-bold mb-4 text-center">Done</h2>
            <div className="flex flex-col gap-4">
              {doneTasks.map((task) => (
                <TaskCard 
                  key={task._id}
                  _id={task._id}
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  assignee={task.assignee}
                  completion={task.completion}
                  status={task.status}   
                  department={task.department} 
                  onRefresh={fetchTasks}
                />
              ))}
            </div>
          </div>

        </div>
      </>
    );
}