import React, { useMemo, useState } from 'react'
import '../App.css'
import KanbanBoard from '../components/kanban/KanbanBoard.jsx'
import SearchBar from '../components/kanban/SearchBar.jsx'
import TaskForm from '../components/kanban/TaskForm.jsx'
import {
    COLUMN_MAP,
    DEFAULT_COLUMNS,
    DEFAULT_TASKS,
    STORAGE_KEY,
} from '../kanban/constants.js'
import useLocalStorageState from '../kanban/useLocalStorageState.js'

function Practice() {
    const [tasks, setTasks] = useLocalStorageState(
        STORAGE_KEY,
        DEFAULT_TASKS,
        (value) => Array.isArray(value)
    )
    const columnOrder = DEFAULT_COLUMNS
    const [titleInput, setTitleInput] = useState('')
    const [priorityInput, setPriorityInput] = useState('medium')
    const [searchQuery, setSearchQuery] = useState('')
    const [editingTaskId, setEditingTaskId] = useState(null)
    const [editingValue, setEditingValue] = useState('')

    const filteredTasks = useMemo(() => {
        if (!searchQuery.trim()) {
            return tasks
        }
        const query = searchQuery.trim().toLowerCase()
        return tasks.filter((task) => task.title.toLowerCase().includes(query))
    }, [tasks, searchQuery])

    const tasksByStatus = useMemo(() => {
        return columnOrder.reduce((acc, columnId) => {
            acc[columnId] = filteredTasks.filter((task) => task.status === columnId)
            return acc
        }, {})
    }, [filteredTasks, columnOrder])

    const handleAddTask = (event) => {
        event.preventDefault()
        const trimmedTitle = titleInput.trim()
        if (!trimmedTitle) return

        const newTask = {
            id: `task-${Date.now()}`,
            title: trimmedTitle,
            status: 'todo',
            priority: priorityInput,
        }

        setTasks((prev) => [newTask, ...prev])
        setTitleInput('')
        setPriorityInput('medium')
    }

    const handleDeleteTask = (taskId) => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId))
        if (editingTaskId === taskId) {
            setEditingTaskId(null)
            setEditingValue('')
        }
    }

    const handleMoveTask = (taskId, status) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId ? { ...task, status } : task
            )
        )
    }

    const handlePriorityChange = (taskId, priority) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId ? { ...task, priority } : task
            )
        )
    }

    const handleEditStart = (task) => {
        setEditingTaskId(task.id)
        setEditingValue(task.title)
    }

    const handleEditSave = (taskId) => {
        const trimmedTitle = editingValue.trim()
        if (!trimmedTitle) return

        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId ? { ...task, title: trimmedTitle } : task
            )
        )
        setEditingTaskId(null)
        setEditingValue('')
    }

    const handleEditCancel = () => {
        setEditingTaskId(null)
        setEditingValue('')
    }

    return (
        <div className="kanban-shell">
            <header className="kanban-header">
                <div>
                    <p className="kanban-kicker">Prodesk Mission</p>
                    <h1>TO-DO App</h1>
                </div>
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </header>

            <TaskForm
                title={titleInput}
                priority={priorityInput}
                onTitleChange={setTitleInput}
                onPriorityChange={setPriorityInput}
                onSubmit={handleAddTask}
            />

            <KanbanBoard
                columnOrder={columnOrder}
                columns={COLUMN_MAP}
                tasksByStatus={tasksByStatus}
                tasks={tasks}
                setTasks={setTasks}
                editingTaskId={editingTaskId}
                editingValue={editingValue}
                setEditingValue={setEditingValue}
                onEditStart={handleEditStart}
                onEditSave={handleEditSave}
                onEditCancel={handleEditCancel}
                onDelete={handleDeleteTask}
                onMove={handleMoveTask}
                onPriorityChange={handlePriorityChange}
            />
        </div>
    )
}

export default Practice
