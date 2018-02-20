import { connect } from "react-redux";
import TodoList from "./TodoList";

const toggleTodo = id => ({ type: "TOGGLE_TODO", id });

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "ALL":
      return todos;
    case "ACTIVE":
      return todos.filter(todo => !todo.completed);
    case "COMPLETED":
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

const mapStateToTodoListProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
});
const mapDispatchToTodoListProps = dispatch => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  }
});
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);

export default VisibleTodoList;
