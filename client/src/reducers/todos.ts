import * as _ from 'lodash';
import { TodosState, TodosMap, RootState, ITodo } from "../types";
import { TodoActions, ADD_TODO, REMOVE_TODO, UPDATE_TODO, SET_TODOS, SET_LOADING, SET_LOADED, SET_TODO_SAVING } from "../redux-actions/todos";

export const defaultTodosState: TodosState = {
    todos: {},
    loading: false,
    hasLoaded: false
};

export default function todoReducer(state = defaultTodosState, action: TodoActions): TodosState {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: {
                    ..._.cloneDeep(state.todos),
                    [action.todo.id]: action.todo
                }
            };

        case REMOVE_TODO:
            return {
                ...state,
                todos: {
                    ...Object.keys(state.todos).reduce((map, id) => {
                        if (action.id !== id) {
                            map[id] = _.cloneDeep(state.todos[id]);
                        }
                        return map;
                    }, {} as TodosMap)
                }
            };

        case UPDATE_TODO:
            return {
                ...state,
                todos: {
                    ..._.cloneDeep(state.todos),
                    [action.todo.id]: _.cloneDeep(action.todo)
                }
                
            };

        case SET_TODOS:
            return {
                ...state,
                todos: action.todos.reduce((map, todo) => {
                    map[todo.id] = _.cloneDeep(todo);
                    return map;
                }, {} as TodosMap)
            }

        case SET_LOADING:
            return {
                ..._.cloneDeep(state),
                loading: action.loading
            };

        case SET_LOADED:
            return {
                ..._.cloneDeep(state),
                loading: false,
                hasLoaded: true
            };

        case SET_TODO_SAVING:
            return {
                ...state,
                todos: {
                    ..._.cloneDeep(state.todos),
                    [action.id]: {
                        ..._.cloneDeep(state.todos[action.id]),
                        isSaving: !!action.saving
                    }
                }
            };
    
        default:
            return state;
    }
}

export function getTodosArr(state: RootState): ITodo[] {
    const todos = state.todos.todos;
    return Object.keys(todos).reduce((arr, id) => {
        arr.push(todos[id]);
        return arr;
    }, [] as ITodo[]);
}

export function getTodo(state: RootState, id: string): ITodo | undefined {
    return _.cloneDeep(state.todos.todos[id]);
}