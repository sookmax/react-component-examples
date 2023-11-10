import { Label, Radio, RadioGroup } from "react-aria-components";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function RadioGroupExample() {
  return (
    <div className="bg-gradient-to-r from-blue-300 to-indigo-300 w-full h-full flex justify-center items-center">
      <RadioGroup
        className="flex flex-col gap-2 w-full max-w-[300px]"
        defaultValue="Standard"
      >
        <Label className="text-xl text-slate-900 font-semibold font-serif">
          Shipping
        </Label>
        <ShippingOption
          name="Standard"
          time="4-10 business days"
          price="$4.99"
        />
        <ShippingOption
          name="Express"
          time="2-5 business days"
          price="$15.99"
        />
        <ShippingOption name="Lightning" time="1 business day" price="$24.99" />
      </RadioGroup>
    </div>
  );
}

function ShippingOption({
  name,
  time,
  price,
}: {
  name: string;
  time: string;
  price: string;
}) {
  return (
    <Radio
      value={name}
      className={({ isFocusVisible, isSelected, isPressed }) => `
      group relative flex cursor-default rounded-lg px-4 py-3 shadow-lg outline-none bg-clip-padding border border-solid
      ${
        isFocusVisible
          ? "ring-2 ring-blue-600 ring-offset-1 ring-offset-white/80"
          : ""
      }
      ${
        isSelected
          ? "bg-blue-600 border-white/30 text-white"
          : "border-transparent"
      }
      ${isPressed && !isSelected ? "bg-blue-50" : ""}
      ${!isSelected && !isPressed ? "bg-white" : ""}
    `}
    >
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex items-center shrink-0 text-blue-300 group-selected:text-white">
          <CheckCircleIcon className="h-6 w-6" />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="text-lg font-serif font-semibold text-gray-900 group-selected:text-white">
            {name}
          </div>
          <div className="inline text-gray-500 group-selected:text-sky-100">
            {time}
          </div>
        </div>
        <div className="font-medium font-mono text-gray-900 group-selected:text-white">
          {price}
        </div>
      </div>
    </Radio>
  );
}
