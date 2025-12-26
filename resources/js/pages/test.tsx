import React, { useState } from 'react';

export default function Test() {
    // 1. State for the input value and the list of tasks
    const [taskInput, setTaskInput] = useState("");
    const [tasks, setTasks] = useState([]);

    const createTask = (e) => {
        e.preventDefault();

        // 3. Prevent adding empty tasks
        if (taskInput.trim() === "") return;

        // 4. Add new task to the array and clear input
        setTasks([...tasks, taskInput]);
        setTaskInput("");
    };

    return (
        <div>
            <h1>To do list</h1>
            <div>
                <form onSubmit={createTask}>
                    <input
                        type="text"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        placeholder="Enter a task..."
                    />
                    <button type="submit">Add Task</button>
                </form>
            </div>

            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                ))}
            </ul>
        </div>
    );
}
