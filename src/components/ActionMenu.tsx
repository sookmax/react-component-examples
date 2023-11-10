import {
  Button,
  MenuItem,
  Menu,
  MenuTrigger,
  Popover,
  Separator,
} from "react-aria-components";
import type { MenuItemProps } from "react-aria-components";
import { Bars3Icon } from "@heroicons/react/24/outline";
// import RailIcon from "@spectrum-icons/workflow/Rail";

export default function MenuExample() {
  return (
    <div className="w-full h-full p-8 bg-gradient-to-r to-blue-500 from-violet-500">
      <MenuTrigger>
        <Button
          aria-label="Menu"
          className="inline-flex items-center justify-center rounded-md bg-black bg-opacity-20 bg-clip-padding border border-white/20 px-3 py-2 text-white hover:bg-opacity-30 pressed:bg-opacity-40 transition-colors cursor-default outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          {/* <RailIcon size="S" /> */}
          <Bars3Icon className="w-6 h-6" />
        </Button>
        <Popover className="p-1 w-56 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 entering:animate-in entering:fade-in entering:zoom-in-95 exiting:animate-out exiting:fade-out exiting:zoom-out-95 fill-mode-forwards origin-top-left">
          <Menu className="outline-none">
            <MyMenuItem id="new">New…</MyMenuItem>
            <MyMenuItem id="open">Open…</MyMenuItem>
            <Separator className="bg-gray-300 h-[1px] mx-3 my-1" />
            <MyMenuItem id="save">Save</MyMenuItem>
            <MyMenuItem id="save-as">Save as…</MyMenuItem>
            <Separator className="bg-gray-300 h-[1px] mx-3 my-1" />
            <MyMenuItem id="print">Print…</MyMenuItem>
          </Menu>
        </Popover>
      </MenuTrigger>
    </div>
  );
}

function MyMenuItem(props: MenuItemProps) {
  return (
    <MenuItem
      {...props}
      className="group flex w-full items-center rounded-md px-3 py-2 box-border outline-none cursor-default text-gray-900 focus:bg-violet-500 focus:text-white"
    />
  );
}
