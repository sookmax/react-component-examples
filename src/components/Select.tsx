import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";
import type { ListBoxItemProps } from "react-aria-components";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function SelectExample() {
  return (
    <div className="bg-gradient-to-tl from-amber-500 to-rose-700 p-8 w-full h-full flex justify-center items-center">
      <Select className="flex flex-col gap-1 w-[200px]" placeholder="Choose...">
        <Label className="text-white cursor-default">Status</Label>
        <Button className="flex items-center cursor-default rounded-lg border-0 bg-white bg-opacity-90 pressed:bg-opacity-100 transition py-2 pl-5 pr-2 text-base text-left leading-normal shadow-md text-gray-700 focus:outline-none focus-visible:ring-2 ring-white ring-offset-2 ring-offset-rose-700">
          <SelectValue className="flex-1 truncate placeholder-shown:italic" />
          <ChevronUpDownIcon className="h-6 w-6" />
        </Button>
        <Popover className="max-h-60 w-[--trigger-width] overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out">
          <ListBox className="outline-none p-1">
            <StatusItem textValue="Backlog">
              <Status className="bg-gray-500" />
              Backlog
            </StatusItem>
            <StatusItem textValue="In Progress">
              <Status className="bg-blue-500" />
              In Progress
            </StatusItem>
            <StatusItem textValue="In Review">
              <Status className="bg-yellow-500" />
              In Review
            </StatusItem>
            <StatusItem textValue="Done">
              <Status className="bg-green-500" />
              Done
            </StatusItem>
            <StatusItem textValue="Won't Do">
              <Status className="bg-red-500" />
              Won't Do
            </StatusItem>
          </ListBox>
        </Popover>
      </Select>
    </div>
  );
}

function StatusItem(props: ListBoxItemProps & { children: React.ReactNode }) {
  return (
    <ListBoxItem
      {...props}
      className="group flex items-center gap-2 cursor-default select-none py-2 px-4 outline-none rounded text-gray-900 focus:bg-rose-600 focus:text-white"
    >
      {({ isSelected }) => (
        <>
          <span className="flex-1 flex items-center gap-2 truncate font-normal group-selected:font-medium">
            {props.children}
          </span>
          <span className="w-5 flex items-center text-rose-600 group-focus:text-white">
            {isSelected && <CheckIcon />}
          </span>
        </>
      )}
    </ListBoxItem>
  );
}

function Status({ className }: { className: string }) {
  return (
    <span
      className={`w-3 h-3 rounded-full border border-solid border-white ${className}`}
    />
  );
}
