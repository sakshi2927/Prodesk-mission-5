import React from 'react'

function TaskForm({
    title,
    priority,
    onTitleChange,
    onPriorityChange,
    onSubmit,
}) {
    return (
        <section className="kanban-controls">
            <form className="task-form" onSubmit={onSubmit}>
                <div className="task-form-group">
                    <label htmlFor="taskTitle">New task</label>
                    <input
                        id="taskTitle"
                        type="text"
                        placeholder="Write a task"
                        value={title}
                        onChange={(event) => onTitleChange(event.target.value)}
                    />
                </div>
                <div className="task-form-group">
                    <label htmlFor="taskPriority">Priority</label>
                    <select
                        id="taskPriority"
                        value={priority}
                        onChange={(event) => onPriorityChange(event.target.value)}
                    >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>
                <button className="primary" type="submit">Add task</button>
            </form>
        </section>
    )
}

export default TaskForm
