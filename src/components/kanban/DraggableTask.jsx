import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import TaskCard from './TaskCard.jsx'

function DraggableTask({
    task,
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
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        isDragging,
    } = useDraggable({ id: task.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`task-wrapper${isDragging ? ' is-dragging' : ''}`}
        >
            <TaskCard
                task={task}
                dragHandleProps={listeners}
                dragHandleAttributes={attributes}
                isEditing={isEditing}
                editingValue={editingValue}
                setEditingValue={setEditingValue}
                onEditStart={onEditStart}
                onEditSave={onEditSave}
                onEditCancel={onEditCancel}
                onDelete={onDelete}
                onMove={onMove}
                onPriorityChange={onPriorityChange}
            />
        </div>
    )
}

export default DraggableTask
