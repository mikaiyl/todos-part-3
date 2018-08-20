import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'

import './App.css'
import './index.css'

import todoList from './todos.json'
import TodoList from './TodoList.jsx'

class App extends Component {

    state = { todos: todoList, currentTodoIndex: todoList.length + 1 }

    constructor( props ) {
        super( props )
        this.removeTodo = this.removeTodo.bind(this)
        this.handleEnter = this.handleEnter.bind(this)
        this.hoistEvent = this.hoistEvent.bind(this)
        this.clearCompleted = this.clearCompleted.bind(this)
    }

    hoistEvent( e ) {
        if ( e.target.checked ) {
            // e.target.parentElement.parentElement.classList.add( 'completed' )
            this.setState( { todos:
                this.state.todos.map( todo => {
                    if( parseInt(e.target.parentElement.id, 10) === todo.id ) {
                        todo.completed = true
                        console.log( todo )
                    }
                    return todo
                } )
            } )
        } else {
            this.setState( { todos:
                this.state.todos.map( todo => {
                    if( parseInt(e.target.parentElement.id, 10) === todo.id ) {
                        todo.completed = false
                        console.log( todo )
                    }
                    return todo
                } )
            } )
            // e.target.parentElement.parentElement.classList.remove( 'completed' )
        }

    }

    addTodo( newTodo ) {
        this.setState( { todos: [ ...this.state.todos, newTodo ], currentTodoIndex: this.state.currentTodoIndex + 1 } )
    }

    handleEnter( e ) {
        if( e.key === 'Enter' && e.target.value !== '' ) {
            const newTodo = {
                id: this.state.currentTodoIndex,
                userId: 1,
                title: e.target.value,
                completed: false
            }
            this.addTodo( newTodo )

            e.target.value = ''
        }
    }

    removeTodo( id ) {
        const todos = this.state.todos.filter( todo => todo.id !== parseInt(id, 10) )

        this.setState( { todos: todos } )
    }

    clearCompleted(  ) {
        this.setState( { todos: this.state.todos.filter( ( todo ) => todo.completed ? null : todo ) } )
    }

    render() {
        return (
            <div className="App">
                <section className="todoapp">
                    <header className="header">
                        <h1>todos</h1>
                        <input className="new-todo" placeholder="What needs to be done?" onKeyPress={ this.handleEnter } autoFocus />
                    </header>

                    <section className="main">

                        <ul className="todo-list">
                            <Switch>
                                <Route exact path='/' hash='#/'
                                    render={ ( props ) => <TodoList todos={ this.state.todos } hoistId={ this.removeTodo } add={ this.state.addTodo } hoistEvent={ this.hoistEvent }/> }
                                />

                                <Route path='/active/'
                                    render={ ( props ) => <TodoList todos={ this.state.todos.filter( todo => todo.completed === false ) } hoistId={ this.removeTodo } add={ this.state.addTodo } hoistEvent={ this.hoistEvent }/> }
                                />

                                <Route path='/completed/'
                                    render={ ( props ) => <TodoList todos={ this.state.todos.filter( todo => todo.completed === true ) } hoistId={ this.removeTodo } add={ this.state.addTodo } hoistEvent={ this.hoistEvent }/> }
                                />

                            </Switch>
                        </ul>
                    </section>

                    <footer className="footer">
                        <span className="todo-count"><strong>{ this.state.todos.length - this.state.todos.filter( todo => todo.completed === true ).length }</strong> item(s) left</span>
                        <ul className="filters">
                            <li>
                                <Link to='/'>All</Link>
                            </li>
                           <li>
                                <Link to="/active/">Active</Link>
                            </li>
                            <li>
                                <Link to="/completed/">Completed</Link>
                        </li>
                    </ul>

                    <button onClick={ this.clearCompleted } className="clear-completed">Clear completed</button>

                    </footer>
                </section>
            </div>
        );
    }
}

export default App;
