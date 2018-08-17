import React, { Component } from 'react'
import './App.css'
import todoList from './todos.json'
import TodoList from './Todo'

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
        if( e.key === 'Enter' ) {
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
                {
                    //    <!-- This section should be hidden by default and shown when there are todos -->
                }
                <section className="main">
                    <ul className="todo-list">
                        {
                            //<!-- These are here just to show the structure of the list items -->
                            //<!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
                            <TodoList todos={ this.state.todos } hoistId={ this.removeTodo } add={ this.state.addTodo } hoistEvent={ this.hoistEvent }/>
                                /*
                                <li className="completed">
                                <div className="view">
                                <input className="toggle" type="checkbox" checked />
                                <label>Taste JavaScript</label>
                                <button className="destroy"></button>
                                </div>
                                </li>
                                <li>
                                <div className="view">
                                <input className="toggle" type="checkbox" />
                                <label>Buy a unicorn</label>
                                <button className="destroy"></button>
                                </div>
                                </li> */}
                            </ul>
                </section>
                {
                    //<!-- This footer should hidden by default and shown when there are todos -->
                }
                <footer className="footer">
                    {
                        //   <!-- This should be `0 items left` by default -->
                    }
                    <span className="todo-count"><strong>{ this.state.todos.length - this.state.todos.filter( todo => todo.completed === true ).length }</strong> item(s) left</span>
                {
                    //    <!-- Remove this if you don't implement routing -->
                    //    <!-- Hidden if no completed items are left ↓ -->
                }
                <button onClick={ this.clearCompleted } className="clear-completed">Clear completed</button>
                </footer>
                </section>

                </div>
        );
    }
}

export default App;
