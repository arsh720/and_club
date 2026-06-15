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