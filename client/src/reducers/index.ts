import { combineReducers } from 'redux';
import { RootState } from '../types';
import todos, { defaultTodosState } from './todos';

export default combineReducers({
    todos
});

export const defaultState: RootState = {
    todos: defaultTodosState
};
