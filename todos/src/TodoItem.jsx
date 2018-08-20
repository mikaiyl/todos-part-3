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
                    <input type="checkbox" name="checkbox" className="toggle" onChange={ this.toggleComplete } checked={ this.props.completed } />
                    <label>{ this.props.label }</label>
                    <button className="destroy" onClick={ this.destroy } ></button>
                </div>
            </li>
        )
    }
}

export default TodoItem
