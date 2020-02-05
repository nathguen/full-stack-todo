import axios from 'axios'
import { ITodo } from '../types';

export function fetchTodos() {
    return axios.get<ITodo[]>('http://localhost:3010/todos');
}

export function patchTodoCompletedStatus(id: string, isCompleted: boolean) {
    return axios.patch<ITodo>(`http://localhost:3010/todos/${id}`, {
        isCompleted
    });
}

export function deleteTodo(id: string) {
    return axios.delete(`http://localhost:3010/todos/${id}`);
}

export function createTodo(todo: ITodo) {
    return axios.post<ITodo>(`http://localhost:3010/todos`, {
        ...todo
    });
}