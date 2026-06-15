import connectDB from "@/lib/mongodb";
import Task from "@/models/Tasks";

export async function GET(){
    try{
        await connectDB();

        const tasks = await Task.find();

        return Response.json(tasks);

    }catch(error){

        console.log(error);

        return Response.json(
            {message:"Failed to fetch tasks"},
            {status: 500}
        );
    }
}

export async function POST(request: Request){
    try{
        await connectDB();

        const body = await request.json();

        const task = await Task.create(body);

        return Response.json(task,{status: 201});
    }catch(error){
        console.log(error);
        return Response.json(
            {message:"Failed to create task"},
            {status: 500}
        );
    }
}

export async function PATCH(request: Request) {
    try {
        await connectDB();
        

        const body = await request.json();
        const { _id, status } = body;

        if (!_id || !status) {
            return Response.json({ message: "Missing id or status" }, { status: 400 });
        }


        const updatedTask = await Task.findByIdAndUpdate(
            _id,
            { status: status },
            { new: true } 
        );

        return Response.json(updatedTask, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ message: "Failed to update task" }, { status: 500 });
    }
}
export async function DELETE(request: Request) {
    try {
        await connectDB();
        
        const body = await request.json();
        const { _id } = body;

        if (!_id) {
            return Response.json({ message: "Missing task ID" }, { status: 400 });
        }

        // Tell MongoDB to find the task by ID and destroy it
        await Task.findByIdAndDelete(_id);

        return Response.json({ message: "Task deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ message: "Failed to delete task" }, { status: 500 });
    }
}