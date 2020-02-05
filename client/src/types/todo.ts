export interface ITodo {
    id: string
    name: string
    assignees: string[]
    dueDate: string
    isCompleted: boolean
    isSaving?: boolean
}