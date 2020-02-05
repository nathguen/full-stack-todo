import * as _ from 'lodash'
import { setTodosLoadingAction, setTodosAction, setTodosLoadedAction, setTodoSavingAction, updateTodoAction, removeTodoAction, addTodoAction } from "../redux-actions/todos";
import { Dispatch } from "redux";
import { fetchTodos, patchTodoCompletedStatus, deleteTodo, createTodo } from "../api";
import { RootState, ITodo } from '../types';
import { getTodo } from '../reducers/todos';

export function getTodos() {
    return async (dispatch: Dispatch) => {
        dispatch(setTodosLoadingAction(true))

        // fetch todos
        const resp = await fetchTodos();
        dispatch(setTodosLoadedAction());

        if (!_.inRange(resp.status, 200, 299)) {
            // @TODO handle error
            debugger
            return;
        }

        dispatch(setTodosAction(resp.data));
    };
}

export function setTodoCompletedStatus(id: string, isCompleted: boolean) {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        dispatch(setTodoSavingAction(id, true))

        const resp = await patchTodoCompletedStatus(id, isCompleted);
        dispatch(setTodoSavingAction(id, false))

        if (!_.inRange(resp.status, 200, 299)) {
            // @TODO handle error
            debugger
            return;
        }

        const todo = getTodo(getState(), id);

        if (todo) {
            todo.isCompleted = isCompleted;
            dispatch(updateTodoAction(todo))
        }
    };
}

export function removeTodo(id: string) {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        dispatch(setTodoSavingAction(id, true))

        const resp = await deleteTodo(id);
        dispatch(setTodoSavingAction(id, false))

        if (!_.inRange(resp.status, 200, 299)) {
            // @TODO handle error
            debugger
            return;
        }

        dispatch(removeTodoAction(id))
    };
}

export function addTodo(todo: ITodo) {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        // @TODO add loading status

        const resp = await createTodo(todo);

        if (!_.inRange(resp.status, 200, 299)) {
            // @TODO handle error
            debugger
            return;
        }

        dispatch(addTodoAction(todo));
    };
}