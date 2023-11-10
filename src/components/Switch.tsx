import { Switch } from "react-aria-components";

export default function SwitchExample() {
  return (
    <div className="bg-gradient-to-r from-yellow-300 to-orange-300 p-12 w-full h-full flex justify-center items-center">
      <Switch className="group flex gap-2 items-center text-black font-semibold text-lg">
        <div className="flex h-[26px] w-[44px] shrink-0 cursor-default rounded-full shadow-inner bg-clip-padding border border-solid border-white/30 p-[3px] box-border transition duration-200 ease-in-out bg-yellow-600 group-pressed:bg-yellow-700 group-selected:bg-amber-800 group-selected:group-pressed:bg-amber-900 outline-none group-focus-visible:ring-2 ring-black">
          <span className="h-[18px] w-[18px] transform rounded-full bg-white shadow transition duration-200 ease-in-out translate-x-0 group-selected:translate-x-[100%]" />
        </div>
        Wi-Fi
      </Switch>
    </div>
  );
}
