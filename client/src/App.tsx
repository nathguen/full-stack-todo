import { Typography } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import './App.css';
import { TodoList } from './components/todo-list';
import { getTodosArr } from './reducers/todos';
import { getTodos, setTodoCompletedStatus, removeTodo, addTodo } from './redux-thunk/todos';
import { ITodo, RootState } from './types';
import { AddTodo } from './components/add-todo';


const TodosWrapper = styled.div`
  position: relative;
  max-width: 600px;
  width: 80%;
  margin: auto;
`;

const TodosHeader = styled.div`
  display: flex;
  align-items: center;
`;

const TodosHeaderText = styled.div`
  position: relative;
  width: 100%;
`;

const TodosList = styled.div`
  margin-top: 30px;
`;


const App = (props: AppStateProps) => {
  const dispatch = useDispatch();
  const today = moment();

  const handleTodoClick = (todo: ITodo) => {
    dispatch(setTodoCompletedStatus(todo.id, !todo.isCompleted))
  };

  const handleRemoveTodo = (id: string) => {
    dispatch(removeTodo(id));
  };

  const handleCreateTodo = (todo: ITodo) => {
    dispatch(addTodo(todo));
  };

  if (!props.todosLoading && !props.todosLoaded) {
    dispatch(getTodos())
  }

  return (
    <TodosWrapper>
      <TodosHeader>
        <TodosHeaderText>
          <Typography variant='h2'>{today.format('ddd, Do')}</Typography>
          <Typography variant='body1'>{today.format('MMMM')}</Typography>
        </TodosHeaderText>

        <Typography variant='body1'>{props.todos.length} Tasks</Typography>
      </TodosHeader>

      <AddTodo createTodo={handleCreateTodo} />

      <TodoList
        todos={props.todos}
        toggleIsCompleted={handleTodoClick}
        removeTodo={handleRemoveTodo} />

    </TodosWrapper>
  );
}

interface AppStateProps {
  todosLoading: boolean
  todosLoaded: boolean
  todos: ITodo[]
}

function mapStateToProps(state: RootState): AppStateProps {
  return {
    todosLoading: state.todos.loading,
    todosLoaded: state.todos.hasLoaded,
    todos: getTodosArr(state)
  };
}

export default connect(mapStateToProps)(App);
