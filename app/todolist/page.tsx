"use client";
import * as React from "react";
import { useState } from "react";
import { Button, Heading } from "@radix-ui/themes";
import { v4 as uuid } from "uuid";

import { PlusIcon } from "lucide-react";
import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from "@hello-pangea/dnd";

import { AnimatePresence, motion } from "framer-motion";
import { Todo } from "./todo";
import { TodoItem } from "./todoItem";


const reorder = <T, >(list: T[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
export default function TodosPage() {
  const [selectedId, setSelectedId] = useState<string>();
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const addTodo = () => {
    const newId = uuid();
    setTodos([
      ...todos,
      {
        text: "",
        checked: false,
        id: newId,
      },
    ]);
    setSelectedId(newId);
  };
  const onTextChange = (index: number, newText: string) => {
    todos[index].text = newText;
    setTodos([...todos]);
  };
  const onCheckedChange = (index: number, newChecked: boolean) => {
    todos[index].checked = newChecked;
    setTodos([...todos]);
  };
  const onDeleted = (index: number) => {
    todos.splice(index, 1);
    setTodos([...todos]);
    selectedId && setSelectedId(todos[index - 1]?.id);
  };

  const onDragEnd: OnDragEndResponder = ({ destination, source }) => {
    if (!destination) return;

    setTodos(reorder(todos, source.index, destination.index));
  };

  function onSubmit(index: number) {
    todos.splice(index + 1, 0, {
      text: "",
      checked: false,
      id: uuid(),
    });
    setTodos([...todos]);
    setSelectedId(todos[index + 1].id);
  }

  return (
    <div className={`[&>*]:mb-2`}>
      <Heading size={"8"} as={"h1"} mb={"4"}>
        Todos
      </Heading>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={"droppable"}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <AnimatePresence>
                {todos.map((todo, index) => (
                  <Draggable key={todo.id} index={index} draggableId={todo.id}>
                    {(provided) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <Todo
                          todo={todo}
                          onTextChange={(text) => onTextChange(index, text)}
                          onCheckedChange={(checked) =>
                            onCheckedChange(index, checked)
                          }
                          onSubmit={() => onSubmit(index)}
                          onDelete={() => onDeleted(index)}
                          dragHandleProps={provided.dragHandleProps}
                          selected={selectedId === todo.id}
                          onFocusChange={(focused) => {
                            if (!focused && selectedId === todo.id) {
                              setSelectedId(undefined);
                            } else {
                              setSelectedId(todo.id);
                            }
                          }}
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
      <Button onClick={addTodo}>
        <PlusIcon width="16" height="16" />
        Add Todo
      </Button>
    </div>
  );
}
