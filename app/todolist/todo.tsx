import { Checkbox, Flex, IconButton, Text, TextField } from "@radix-ui/themes";
import { GripVertical, Trash2 } from "lucide-react";
import * as React from "react";
import { TodoItem } from "./todoItem";
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";

export type TodoProps = {
  todo: TodoItem;
  onTextChange: (newText: string) => void;
  onCheckedChange: (newChecked: boolean) => void;
  onDelete: () => void;
  onSubmit: () => void;
  dragHandleProps: DraggableProvidedDragHandleProps | null;
  selected: boolean;
  onFocusChange: (focused: boolean) => void;
};
export const Todo = ({
                       todo: { text, checked },
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
      <TextField.Root
        onBlurCapture={onBlurCapture}
        className={"flex-1 max-w-[50%] "}
        onFocusCapture={() => onFocusChange(true)}
        tabIndex={0}
      >
        {selected ? (
          <TextField.Input
            autoFocus={true}
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
            className={checked ? "line-through text-gray-500" : ""}
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