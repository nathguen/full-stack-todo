import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, ListItemIconProps, ListItemTextProps, IconButton, IconButtonProps, Button, Typography, TypographyProps } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import IconCheck from '@material-ui/icons/Check'
import styled from 'styled-components';
import { ITodo } from '../../types';
import moment from 'moment';

interface TodoItemTextProps extends ListItemTextProps {
    isCompleted: boolean
}

const TodoItemText = styled(ListItemText) <TodoItemTextProps>`
    text-decoration: ${props => props.isCompleted ? 'line-through' : 'none'};
    min-width: 70%;
`;

interface TodoCompletedIconWrapperProps extends ListItemIconProps {
    isCompleted: boolean
}

const TodoCompletedIconWrapper = styled(ListItemIcon) <TodoCompletedIconWrapperProps>`
    visibility: ${props => props.isCompleted ? 'visible' : 'hidden'};
`;

const TodoDeleteButton = styled(IconButton) <IconButtonProps>`
    position: absolute !important;
    right: -50px;
`;

const ListItemWrapper = styled.div`
    display: flex;
`;

const getRelativeDate = (date: string): string => {
    const dueDate = moment(date);
    const isDueToday = dueDate.isSame(new Date(), 'day');
    if (isDueToday) {
        return dueDate.format('h:mma');
    }

    return dueDate.format('MMM Do')
};


interface TodoListProps {
    todos: ITodo[]
    toggleIsCompleted: (todo: ITodo) => void
    removeTodo: (id: string) => void
}

export const TodoList = (props: TodoListProps) => {
    return (
        <List>
            {props.todos.sort((a, b) => {
                return new Date(a.dueDate).valueOf() - new Date(b.dueDate).valueOf();
            }).map(todo => (
                <ListItemWrapper key={todo.id}>
                    <ListItem button onClick={() => props.toggleIsCompleted(todo)}>
                        <TodoCompletedIconWrapper isCompleted={todo.isCompleted}>
                            <IconCheck />
                        </TodoCompletedIconWrapper>

                        <TodoItemText isCompleted={todo.isCompleted} primary={todo.name} />

                        <Typography variant='body2'>{getRelativeDate(todo.dueDate)}</Typography>
                    </ListItem>


                    <TodoDeleteButton onClick={() => props.removeTodo(todo.id)}>
                        <DeleteIcon />
                    </TodoDeleteButton>
                </ListItemWrapper>
            ))}
        </List>
    );
};
