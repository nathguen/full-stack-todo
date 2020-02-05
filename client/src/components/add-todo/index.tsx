import { Button, FormControl, FormHelperText, Input, InputLabel, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import * as uuid from 'uuid';
import { ITodo } from '../../types';

const AddTodoWrapper = styled.div`
    position: relative;
    margin: 30px 0;
`;

const AddTodoLine = styled.hr`
    border-color: #eee;
`;

interface AddTodoProps {
    createTodo: (todo: ITodo) => void
}

export const AddTodo = (props: AddTodoProps) => {
    const [ todoName, setTodoName ] = React.useState('');
    const [ dueDate, setDueDate ] = React.useState(moment());

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDueDate(moment(value));
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTodoName(value);
    };

    const handleSubmit = () => {
        props.createTodo({
            name: todoName,
            dueDate: dueDate.toISOString(),
            isCompleted: false,
            id: uuid.v4(),
            assignees: []
        });
        setTodoName('');
        setDueDate(moment());
    };

    return (
        <AddTodoWrapper>
            <AddTodoLine />
            <FormControl>
                <InputLabel htmlFor="todo-name">Create a Todo</InputLabel>
                <Input
                    value={todoName}
                    onChange={handleNameChange}
                    id="todo-name"
                    aria-describedby="todo-name-helper-text" />
                <FormHelperText id="todo-name-helper-text">i.e., Take out the trash</FormHelperText>
            </FormControl>

            <TextField
                id="todo-date"
                label="Due Date"
                type="date"
                value={dueDate.format('YYYY-MM-DD')}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleDateChange}
            />

            <Button variant='contained' onClick={handleSubmit}>
                <AddIcon />
            </Button>
        </AddTodoWrapper>
    );
};