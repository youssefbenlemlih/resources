"use client";
import * as React from "react";
import { useState } from "react";
import { Button, Heading } from "@radix-ui/themes";
import { Todo } from "./Todo";
import { PlusIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import { useTodos } from "./useTodos";

export default function Demo() {
  const {
    todos,
    toggleTodoChecked,
    deleteTodo,
    changeTodoText,
    addTodo,
    reorderTodo,
  } = useTodos();
  const [focusedTodoId, setFocusedTodoId] = useState<string>();

  function onCheckedChange(id: string) {
    toggleTodoChecked(id);
  }

  function onTextChange(id: string, newText: string) {
    changeTodoText(id, newText);
  }

  function onAddButtonClick() {
    const newTodo = addTodo();
    setFocusedTodoId(newTodo.id);
  }

  function onDelete(id: string) {
    const index = todos.findIndex((todo) => todo.id === id);
    deleteTodo(id);
    if (index !== 0) {
      setFocusedTodoId(todos[index - 1].id);
    }
  }

  const onDragEng: OnDragEndResponder = ({ destination, source }) => {
    if (!destination) return;

    reorderTodo(source.index, destination.index);
  };

  function onInsert(id: string, index: number) {
    const newTodo = addTodo(index + 1);
    setFocusedTodoId(newTodo.id);
  }

  return (
    <div className={"[&>*]:mb-2"}>
      <Heading as={"h1"} size={"8"} mb={"4"}>
        Todos
      </Heading>
      <DragDropContext onDragEnd={onDragEng}>
        <Droppable droppableId={"droppable"}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={"[&>*]:mb-2"}
            >
              <AnimatePresence>
                {todos.map((todo, index) => (
                  <Draggable key={todo.id} index={index} draggableId={todo.id}>
                    {(provided) => (
                      <motion.div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        key={todo.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <Todo
                          dragHandleProps={provided.dragHandleProps}
                          focused={todo.id === focusedTodoId}
                          onFocusChange={(focused) => {
                            if (focused) {
                              setFocusedTodoId(todo.id);
                            } else if (focusedTodoId === todo.id) {
                              setFocusedTodoId(undefined);
                            }
                          }}
                          todo={todo}
                          onCheckedChange={() => onCheckedChange(todo.id)}
                          onTextChange={(newText) =>
                            onTextChange(todo.id, newText)
                          }
                          onDelete={() => onDelete(todo.id)}
                          onInsert={() => onInsert(todo.id, index)}
                        />
                      </motion.div>
                    )}
                  </Draggable>
                ))}
              </AnimatePresence>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button onClick={onAddButtonClick}>
        <PlusIcon width={"16"} height={"16"} /> Add Todo
      </Button>
    </div>
  );
}
