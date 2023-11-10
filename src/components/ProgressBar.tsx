import { Label, ProgressBar } from "react-aria-components";

export default function LoadingProgressBar() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-12 w-full h-full flex justify-center items-center">
      <ProgressBar value={30} className="flex flex-col gap-3 w-56 text-white">
        {({ percentage, valueText }) => (
          <>
            <div className="flex">
              <Label className="flex-1">Loading…</Label>
              <span>{valueText}</span>
            </div>
            <div className="h-2 top-[50%] transform translate-y-[-50%] w-full rounded-full bg-white bg-opacity-40">
              <div
                className="absolute h-2 top-[50%] transform translate-y-[-50%] rounded-full bg-white"
                style={{ width: percentage + "%" }}
              />
            </div>
          </>
        )}
      </ProgressBar>
    </div>
  );
}
