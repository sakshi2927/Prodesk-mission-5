import React, { useMemo, useState } from 'react'
import {
    DndContext,
    DragOverlay,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import SortableColumn from './SortableColumn.jsx'

function KanbanBoard({
    columnOrder,
    columns,
    tasksByStatus,
    tasks,
    setTasks,
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
    const [activeTaskId, setActiveTaskId] = useState(null)
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
    )

    const activeTask = useMemo(
        () => tasks.find((task) => task.id === activeTaskId),
        [tasks, activeTaskId]
    )

    const findTaskStatus = (taskId) => {
        const task = tasks.find((item) => item.id === taskId)
        return task ? task.status : null
    }

    const handleDragStart = (event) => {
        setActiveTaskId(event.active.id)
    }

    const handleDragEnd = (event) => {
        const { active, over } = event
        if (!over) {
            setActiveTaskId(null)
            return
        }

        const overId = over.id
        const nextStatus = columns[overId] ? overId : findTaskStatus(overId)
        if (!nextStatus) {
            setActiveTaskId(null)
            return
        }

        setTasks((prev) =>
            prev.map((task) =>
                task.id === active.id ? { ...task, status: nextStatus } : task
            )
        )
        setActiveTaskId(null)
    }

    const handleDragCancel = () => {
        setActiveTaskId(null)
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <section className="kanban-board">
                {columnOrder.map((columnId, index) => (
                    <SortableColumn
                        key={columnId}
                        column={columns[columnId]}
                        columnIndex={index}
                        tasks={tasksByStatus[columnId] || []}
                        editingTaskId={editingTaskId}
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
            </section>
            <DragOverlay>
                {activeTask ? (
                    <div className={`task-card task-overlay priority-${activeTask.priority}`}>
                        <div className="task-head">
                            <span className="drag-handle">Moving</span>
                            <span className="task-status">{activeTask.status}</span>
                        </div>
                        <p className="task-title">{activeTask.title}</p>
                        <div className="task-overlay-meta">
                            Priority: {activeTask.priority}
                        </div>
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}

export default KanbanBoard
