import {
  Label,
  Slider,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from "react-aria-components";

export default function OpacitySlider() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-12 w-full h-full flex justify-center items-center">
      <Slider defaultValue={30} className="w-[250px]">
        <div className="flex text-white">
          <Label className="flex-1">Opacity</Label>
          <SliderOutput />
        </div>
        <SliderTrack className="relative w-full h-7">
          {({ state }) => (
            <>
              {/* track */}
              <div className="absolute h-2 top-[50%] translate-y-[-50%] w-full rounded-full bg-white/40" />
              {/* fill */}
              <div
                className="absolute h-2 top-[50%] translate-y-[-50%] rounded-full bg-white"
                style={{ width: state.getThumbPercent(0) * 100 + "%" }}
              />
              <SliderThumb className="h-7 w-7 top-[50%] rounded-full border border-solid border-purple-800/75 bg-white transition dragging:bg-purple-100 outline-none focus-visible:ring-2 ring-black" />
            </>
          )}
        </SliderTrack>
      </Slider>
    </div>
  );
}
