import * as React from "react";
import { useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
  Heading,
  IconButton,
  Text,
  TextField,
} from "@radix-ui/themes";
import { v4 as uuid } from "uuid";

import { GripVertical, PlusIcon, Trash2 } from "lucide-react";
import {
  DragDropContext,
  Draggable,
  DraggableProvidedDragHandleProps,
  Droppable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";

type TodoItem = {
  text: string;
  checked: boolean;
  id: string;
};
type TodoProps = {
  todo: TodoItem;
  onTextChange: (newText: string) => void;
  onCheckedChange: (newChecked: boolean) => void;
  onDelete: () => void;
  onSubmit: () => void;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
  selected: boolean;
  onFocusChange: (focused: boolean) => void;
};
const Todo = ({
  todo: { text, checked, id },
  onTextChange,
  onDelete,
  onCheckedChange,
  dragHandleProps,
  onSubmit,
  selected,
  onFocusChange,
}: TodoProps) => {
  const onBlurCapture = () => {
    if (!text) {
      onDelete();
    } else {
      onFocusChange(false);
    }
  };
  return (
    <Flex gap="2" className={"relative items-center group -ml-8 "}>
      <div {...dragHandleProps}>
        <GripVertical
          width="18"
          height="18"
          className={"opacity-0 group-hover:opacity-100"}
        />
      </div>
      <Checkbox onCheckedChange={onCheckedChange} checked={checked} />
      <TextField.Root className={"flex-1 max-w-[50%] "}>
        {selected ? (
          <TextField.Input
            autoFocus={true}
            tabIndex={0}
            onBlurCapture={onBlurCapture}
            placeholder="New todo"
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                if (!text) {
                  onDelete();
                } else {
                  onFocusChange(false);
                  onSubmit();
                }
              }
              if (e.code === "Backspace" && text === "") {
                onDelete();
              }
            }}
          />
        ) : (
          <Text
            placeholder={"My todo"}
            onFocusCapture={() => onFocusChange(true)}
            className={checked ? "line-through text-gray-500" : ""}
            tabIndex={0}
            size="2"
          >
            {text}
          </Text>
        )}
      </TextField.Root>
      <IconButton
        variant={"outline"}
        className={"cursor-pointer opacity-0 group-hover:opacity-100 "}
      >
        <Trash2 onClick={onDelete} width="18" height="18" />
      </IconButton>
    </Flex>
  );
};
const reorder = <T,>(list: T[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
export default function Home() {
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
    setSelectedId(todos[index - 1]?.id);
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
    <main className={`[&>*]:mb-2 p-24 `}>
      <Heading size={"8"} as={"h1"} mb={"4"}>
        Todos
      </Heading>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={"droppable"}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map((todo, index) => (
                <Draggable key={todo.id} index={index} draggableId={todo.id}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
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
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button onClick={addTodo}>
        <PlusIcon width="16" height="16" />
        Add Todo
      </Button>
    </main>
  );
}
