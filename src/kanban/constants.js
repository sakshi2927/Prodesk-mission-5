export const STORAGE_KEY = 'kanban.tasks.v1'

export const COLUMN_MAP = {
    todo: { id: 'todo', title: 'TO-DO' },
    inProgress: { id: 'inProgress', title: 'In-Progress' },
    done: { id: 'done', title: 'DONE' },
}

export const DEFAULT_TASKS = [
    // { id: 'task-1', title: 'Sketch user flow', status: 'todo', priority: 'high' },
    // { id: 'task-2', title: 'Build core layout', status: 'inProgress', priority: 'medium' },
    // { id: 'task-3', title: 'Review with team', status: 'done', priority: 'low' },
]

export const DEFAULT_COLUMNS = ['todo', 'inProgress', 'done']
