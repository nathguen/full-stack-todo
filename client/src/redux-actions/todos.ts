import { ReduxAction, ITodo } from "../types";

export const ADD_TODO = 'todos/ADD_TODO'
export const REMOVE_TODO = 'todos/REMOVE_TODO'
export const UPDATE_TODO = 'todos/UPDATE_TODO'
export const SET_TODOS = 'todos/SET_TODOS'
export const SET_LOADING = 'todos/SET_IS_LOADING'
export const SET_LOADED = 'todos/SET_HAS_LOADED'
export const SET_TODO_SAVING = 'todos/SET_TODO_SAVING'

interface AddTodoAction extends ReduxAction {
    todo: ITodo
}

interface RemoveTodoAction extends ReduxAction {
    id: string
}

interface UpdateTodoAction extends ReduxAction {
    todo: ITodo
}

interface SetTodosAction extends ReduxAction {
    todos: ITodo[]
}

interface SetTodosLoadingAction extends ReduxAction {
    loading: boolean
}

interface SetTodosLoadedAction extends ReduxAction {}

interface SetTodoSavingAction extends ReduxAction {
    id: string
    saving: boolean
}

export interface TodoActions extends
    AddTodoAction,
    RemoveTodoAction,
    UpdateTodoAction,
    SetTodosAction,
    SetTodosLoadingAction,
    SetTodosLoadedAction,
    SetTodoSavingAction {}

export function addTodoAction(todo: ITodo): AddTodoAction {
    return {
        type: ADD_TODO,
        todo
    }
}

export function removeTodoAction(id: string): RemoveTodoAction {
    return {
        type: REMOVE_TODO,
        id
    }
}

export function updateTodoAction(todo: ITodo): UpdateTodoAction {
    return {
        type: UPDATE_TODO,
        todo
    };
}

export function setTodosAction(todos: ITodo[]): SetTodosAction {
    return {
        type: SET_TODOS,
        todos
    };
}

export function setTodosLoadingAction(loading: boolean): SetTodosLoadingAction {
    return {
        type: SET_LOADING,
        loading
    };
}

export function setTodosLoadedAction(): SetTodosLoadedAction {
    return {
        type: SET_LOADED,
    };
}

export function setTodoSavingAction(id: string,saving: boolean): SetTodoSavingAction {
    return {
        type: SET_TODO_SAVING,
        id,
        saving
    };
}