import React from 'react'

function TaskCard({
    task,
    dragHandleProps,
    dragHandleAttributes,
    isEditing,
    editingValue,
    setEditingValue,
    onEditStart,
    onEditSave,
    onEditCancel,
    onDelete,
    onMove,
    onPriorityChange,
}) {
    return (
        <div
            className={`task-card priority-${task.priority}`}
            onClick={() => onEditStart(task)}
        >
            <div className="task-head">
                <span className="drag-handle" {...dragHandleAttributes} {...dragHandleProps}>
                    Drag
                </span>
                <span className="task-status">{task.status}</span>
            </div>

            {isEditing ? (
                <div className="task-edit" onClick={(event) => event.stopPropagation()}>
                    <input
                        type="text"
                        value={editingValue}
                        onChange={(event) => setEditingValue(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                onEditSave(task.id)
                            }
                        }}
                    />
                    <div className="task-edit-actions">
                        <button
                            className="primary"
                            type="button"
                            onClick={() => onEditSave(task.id)}
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={onEditCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <p className="task-title">{task.title}</p>
            )}

            <div
                className="task-meta"
                onClick={(event) => event.stopPropagation()}
            >
                <label htmlFor={`priority-${task.id}`}>Priority</label>
                <select
                    id={`priority-${task.id}`}
                    value={task.priority}
                    onChange={(event) => onPriorityChange(task.id, event.target.value)}
                >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>

            <div
                className="task-actions"
                onClick={(event) => event.stopPropagation()}
            >
                <label htmlFor={`move-${task.id}`}>Move</label>
                <select
                    id={`move-${task.id}`}
                    value={task.status}
                    onChange={(event) => onMove(task.id, event.target.value)}
                >
                    <option value="todo">TO-DO</option>
                    <option value="inProgress">In-Progress</option>
                    <option value="done">DONE</option>
                </select>
                <button type="button" className="danger" onClick={() => onDelete(task.id)}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default TaskCard
