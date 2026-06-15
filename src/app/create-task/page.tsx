"use client";

import Navbar from '@/components/Navbar'
import React, { useState } from "react";

const CreateTask = () => {

    const [department, setDepartment] = useState("General");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");
    const [assignee, setAssignee] = useState(""); // 1. Added state for Assignee

    async function handleSubmit(event: React.FormEvent){
        event.preventDefault();

        try{
            const response = await fetch("/api/tasks",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // 2. Added assignee to the data we send to the database
                body: JSON.stringify({ title, description, priority, assignee, department }), 
            });

            const data = await response.json();
            console.log(data);

            setTitle("");
            setDescription("");
            setPriority("low");
            setAssignee("");// 3. Reset the input field after succes
            setDepartment("General"); 

            alert("Task created successfully!");
        } catch (error) {
            console.error("Error creating task:", error);
            alert("Failed to create task.");
        }
    }

    return (
        <div>
            <Navbar />
            <h1 className="text-6xl font-bold m-3 p-3 text-teal-200 text-outline-black">Want to create a new task?</h1>

            <form onSubmit={handleSubmit} className="flex justify-center flex-col gap-4 m-4 p-3">

                <h3 className="text-2xl">Whats the task name?</h3>
                <input type="text" placeholder="Task name" value={title}  onChange={(event)=>{setTitle(event.target.value)}} className="w-full p-3 bg-white  rounded-xl focus:outline-none focus:ring-2 focus:ring-white appearance-none" />

                <h3 className="text-2xl">Describe it!!</h3>
                <textarea  placeholder="Task description" value={description} onChange={(event)=>{setDescription(event.target.value)}} className="w-full p-3 bg-white  rounded-xl  focus:outline-none focus:ring-2 focus:ring-white appearance-none"></textarea>
           
                {/* 4. Added the new Input Field for department */}
                
                <h3 className="text-2xl">Which Department?</h3>       
                <select
                    value={department}
                    onChange={(event)=>{setDepartment(event.target.value)}}
                    className="w-full p-3 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white appearance-none"
                >
                    <option value="General">General</option>
                    <option value="Technical">Technical</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="PR">PR</option>
                </select>
                 
                {/* 4. Added the new Input Field for Assignee */}
                <h3 className="text-2xl">Who is working on it?</h3>
                <input type="text" placeholder="Assignee Name (e.g. Rahul, Design Lead)" value={assignee} onChange={(event)=>{setAssignee(event.target.value)}} className="w-full p-3 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white appearance-none" />

                <h3 className="text-2xl">How important is it?</h3>
                <select
                    value={priority}
                    onChange={(event)=>{setPriority(event.target.value)}}
                    className="w-full p-3 bg-white  rounded-xl  focus:outline-none focus:ring-2 focus:ring-white appearance-none"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <button type="submit"  className="w-full p-3 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-white appearance-none" >Create Task</button>

            </form>
        </div>
    )
}

export default CreateTask