import { useState } from "react";
import { TodoItem } from "./todoItem";
import { v4 } from "uuid";

const reorder = <T>(list: T[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
export const useTodos = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  function toggleTodoChecked(id: string) {
    setTodos(
      todos.map((todo) =>
        id === todo.id
          ? {
              ...todo,
              checked: !todo.checked,
            }
          : todo,
      ),
    );
  }

  function changeTodoText(id: string, newText: string) {
    setTodos(
      todos.map((todo) =>
        id === todo.id
          ? {
              ...todo,
              text: newText,
            }
          : todo,
      ),
    );
  }

  function addTodo(index?: number) {
    const newTodo = {
      text: "",
      checked: false,
      id: v4(),
    };
    if (!!index) {
      todos.splice(index + 1, 0, newTodo);
    } else {
      setTodos([...todos, newTodo]);
    }
    return newTodo;
  }

  function deleteTodo(id: string) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function reorderTodo(todoIndex: number, newIndex: number) {
    setTodos(reorder(todos, todoIndex, newIndex));
  }

  return {
    todos,
    toggleTodoChecked,
    changeTodoText,
    addTodo,
    deleteTodo,
    reorderTodo,
  };
};
