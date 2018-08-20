import React, { Component } from 'react'
import TodoItem from './TodoItem.jsx'

class TodoList extends Component {
    render() {
        return (
            this.props.todos.map( todo =>
                <TodoItem key={ Date.now().toString() + Math.floor( Math.random() * 100000 ) } class={ todo.completed ? "completed" : "" } label={ todo.title } id={ todo.id } userId={ todo.userId } hoistId={ this.props.hoistId } hoistEvent={ this.props.hoistEvent } completed={ todo.completed } />
            )
        )
    }
}

export default TodoList
