import { TodoItem } from "./todoItem";
import { Checkbox, Flex, IconButton, Text, TextField } from "@radix-ui/themes";
import * as React from "react";
import { GripVertical, Trash2 } from "lucide-react";
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";

type TodoProps = {
  todo: TodoItem;
  onCheckedChange: () => void;
  onTextChange: (newText: string) => void;
  focused: boolean;
  onFocusChange: (focused: boolean) => void;
  onDelete: () => void;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
  onInsert: () => void;
};
export const Todo = ({
  todo: { checked, text, isCheckPending },
  onTextChange,
  onCheckedChange,
  focused,
  onFocusChange,
  dragHandleProps,
  onDelete,
  onInsert,
}: TodoProps) => {
  return (
    <Flex
      className={"group -ml-4"}
      align={"center"}
      gap={"2"}
      justify={"between"}
    >
      <Flex align={"center"} gap={"2"}>
        <div {...dragHandleProps}>
          <GripVertical
            className={"group-hover:opacity-100 opacity-0"}
            width={"16"}
            height={"16"}
          />
        </div>
        <Checkbox
          onCheckedChange={() => onCheckedChange()}
          checked={isCheckPending ? "indeterminate" : checked}
        />
        <TextField.Root
          onFocus={() => onFocusChange(true)}
          onBlurCapture={() => {
            if (!text) {
              onDelete();
            } else {
              onFocusChange(false);
            }
          }}
          tabIndex={0}
        >
          {focused ? (
            <TextField.Input
              autoFocus
              placeholder={"New todo"}
              value={text}
              onKeyDown={(e) => {
                if (e.code === "Enter" && !!text) {
                  onInsert();
                }
                if (e.code === "Backspace" && !text) {
                  onDelete();
                }
              }}
              onChange={(e) => onTextChange(e.target.value)}
            />
          ) : (
            <Text
              className={checked ? "line-through text-gray-500" : ""}
              size={"2"}
            >
              {text}
            </Text>
          )}
        </TextField.Root>
      </Flex>
      <IconButton
        className={"opacity-0 group-hover:opacity-100"}
        variant={"ghost"}
        onClick={onDelete}
      >
        <Trash2 width={"16"} height={"16"} />
      </IconButton>
    </Flex>
  );
};
