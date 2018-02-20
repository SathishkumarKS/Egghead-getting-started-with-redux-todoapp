import { createStore, combineReducers } from "redux";
import { Provider, connect } from "react-redux"
import React, { Component } from "react";
import ReactDOM from "react-dom";

// Redux setup begin
const todo = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case "TOGGLE_TODO":
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TOGGLE_TODO":
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = "ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});
// React setup end

//Action Creators
let nextId = 0;
const addTodo = todoText => {
  return { type: "ADD_TODO", text: todoText, id: nextId++ };
};
const toggleTodo = id => {
  return { type: "TOGGLE_TODO", id };
};

// React components begin
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "ALL":
      return todos;
    case "ACTIVE":
      return todos.filter(todo => !todo.completed);
    case "COMPLETED":
      return todos.filter(todo => todo.completed);
  }
};

const setVisibilityFilter = filter => {
  return {
    type: "SET_VISIBILITY_FILTER",
    filter: filter
  };
};

let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input ref={node => (input = node)} />
      <button
        onClick={() => {
          dispatch(addTodo(input.value));
          input.value = "";
        }}
      >
        Add Todo
      </button>
    </div>
  );
};
AddTodo = connect()(AddTodo);

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{ textDecoration: completed ? "line-through" : "none" }}
  >
    {text}
  </li>
);

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo => (
      <Todo
        key={todo.id}
        text={todo.text}
        completed={todo.completed}
        onClick={() => onTodoClick(todo.id)}
      />
    ))}
  </ul>
);

const mapStateToTodoListProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};
const mapDispatchToTodoListProps = dispatch => {
  return {
    onTodoClick: id => dispatch(toggleTodo(id))
  };
};
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);

const Link = ({ active, children, onClick }) => {
  if (active) return <span> {children} </span>;

  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

const mapStateToLinkProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  };
};
const mapDispatchToLinkProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  };
};
const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

const Footer = () => (
  <p>
    <FilterLink filter="ALL">ALL</FilterLink>{" "}
    <FilterLink filter="ACTIVE">ACTIVE</FilterLink>{" "}
    <FilterLink filter="COMPLETED">COMPLETED</FilterLink>
  </p>
);
// React components end

// TodApp Smart Component
const TodoApp = () => {
  return (
    <div>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
  );
};

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById("root")
);
