import { ITodo } from '.'

export interface TodosMap {
    [key: string]: ITodo
}

export interface TodosState {
    todos: TodosMap
    loading: boolean
    hasLoaded: boolean
}

export interface RootState {
    todos: TodosState
}