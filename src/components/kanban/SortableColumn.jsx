import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import DraggableTask from './DraggableTask.jsx'

function SortableColumn({
    column,
    columnIndex,
    tasks,
    editingTaskId,
    editingValue,
    setEditingValue,
    onEditStart,
    onEditSave,
    onEditCancel,
    onDelete,
    onMove,
    onPriorityChange,
}) {
    const { setNodeRef, isOver } = useDroppable({ id: column.id })

    return (
        <div className="kanban-column">
            <header className="column-header">
                <div>
                    {/* //<p className="column-index">Column {columnIndex + 1}</p> */}
                    <h2>{column.title}</h2>
                </div>
                <span className="column-count">{tasks.length}</span>
            </header>
            <div
                ref={setNodeRef}
                className={`column-body${isOver ? ' is-over' : ''}`}
            >
                {tasks.map((task) => (
                    <DraggableTask
                        key={task.id}
                        task={task}
                        isEditing={editingTaskId === task.id}
                        editingValue={editingValue}
                        setEditingValue={setEditingValue}
                        onEditStart={onEditStart}
                        onEditSave={onEditSave}
                        onEditCancel={onEditCancel}
                        onDelete={onDelete}
                        onMove={onMove}
                        onPriorityChange={onPriorityChange}
                    />
                ))}
            </div>
        </div>
    )
}

export default SortableColumn
