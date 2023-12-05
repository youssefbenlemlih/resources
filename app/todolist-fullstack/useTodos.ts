"use client";
import { useState } from "react";
import { TodoItem } from "./todoItem";
import { v4 } from "uuid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Configuration, TodosControllerApi } from "todos-api";

const reorder = <T>(list: T[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const client = new TodosControllerApi(
  new Configuration({ basePath: "http://localhost:8080" }),
);
export const useTodos = () => {
  const { data: todosData, status } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => await client.getTodos(),
  });
  const [_, setTodos] = useState<TodoItem[]>([]);
  const [pendingTodoCheckingIds, setPendingTodoCheckingIds] = useState<
    string[]
  >([]);
  const todos = ((todosData?.todos || []) as TodoItem[]).map((todo) => {
    if (pendingTodoCheckingIds.includes(todo.id)) {
      return { ...todo, isCheckPending: true };
    } else {
      return todo;
    }
  });
  const { mutate: checkTodo } = useMutation({
    mutationFn: async (id: string) => {
      if (pendingTodoCheckingIds.includes(id)) {
        await new Promise((resolve) => setTimeout(resolve, 10 * 1000));
      }
    },
    onMutate: (variables) =>
      setPendingTodoCheckingIds((pendingTodoCheckingIds) => [
        ...pendingTodoCheckingIds,
        variables,
      ]),
    onSettled: (_data, _error, variables) =>
      setPendingTodoCheckingIds((pendingTodoCheckingIds) =>
        pendingTodoCheckingIds.filter((id) => id !== variables),
      ),
  });

  function toggleTodoChecked(id: string) {
    checkTodo(id);
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
    status,
    variables: pendingTodoCheckingIds,
  };
};
