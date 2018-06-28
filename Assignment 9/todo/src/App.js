import React, {Component} from 'react';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Name name={"To-Do"}/>
                <TodoList todo/>
            </div>
        );
    }
}

class Name extends Component {
    render() {
        return (
            <h1>{this.props.name}</h1>
        );
    }
}

class TodoList extends React.Component {
    constructor() {
        super();
        this.state = {
            todoList: []
        }
        this.addTodo = this
            .addTodo
            .bind(this);
    }

    addTodo(e) {
        if (this._inputElement.value !== "") {
            var newTodo = {
                value: this._inputElement.value,
                key: Date.now()
            };

            this.setState((prevState) => {
                return {
                    todoList: prevState
                        .todoList
                        .concat(newTodo)
                };
            });
            // Reset value
            this._inputElement.value = "";
        } else {
            alert("Input is empty!!!")
        }

        console.log(this.state.todoList);

        //To stop the page from reloading
        e.preventDefault();
    }

    deleteTodo(key, e) {
        this.setState((prevState) => {
            return {
                todoList: prevState
                    .todoList
                    .filter(function (todoInList) {
                        return todoInList.key !== key;
                    })
            };
        });
    }

    createList(todo) {
        return (
            <li key={todo.key}>
                {todo.value}
                <button
                    onClick={this
                    .deleteTodo
                    .bind(this, todo.key)}>X</button>
            </li>
        )
    }

    render() {
        var listTodo = this
            .state
            .todoList
            .map((todo) => this.createList(todo));

        return (
            <div>
                <div>
                    <form onSubmit={this.addTodo}>
                        <input ref={(a) => this._inputElement = a}/>
                        <button type="submit">+</button>
                    </form>
                </div>
                <div>
                    <ol>{listTodo}</ol>
                </div>
            </div>
        );
    }
}

export default App;