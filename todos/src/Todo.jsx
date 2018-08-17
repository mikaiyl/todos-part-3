import React, { Component } from 'react'

class TodoItem extends Component {
    constructor( props ) {
        super( props )
        this.destroy = this.destroy.bind( this )
        this.toggleComplete = this.toggleComplete.bind( this )
    }

    addTodo( newTodo ) {
        if( newTodo.title && newTodo.id && newTodo.userId ) {
            this.state.setState( { todos: [ ...this.state.todos, newTodo ] } )
        }
    }

    destroy( e ) {
        e.preventDefault()
        this.props.hoistId( e.target.parentElement.id )
    }

    toggleComplete( e ) { this.props.hoistEvent( e ) }

    render() {
        return (
            <li className={ this.props.class }>
                <div className="view" id={ this.props.id }>
                    <input type="checkbox" name="checkbox" className="toggle" onClick={ this.toggleComplete } />
                    <label>{ this.props.label }</label>
                    <button className="destroy" onClick={ this.destroy } ></button>
                </div>
            </li>
        )
    }
}

class TodoList extends Component {
    render() {
        return (
            this.props.todos.map( todo =>
                <TodoItem class={ todo.completed ? "completed" : "" } label={ todo.title } id={ todo.id } userId={ todo.userId } hoistId={ this.props.hoistId } hoistEvent={ this.props.hoistEvent } />
            )
        )
    }
}

export default TodoList
