import { ListBoxItem, ListBox, ProgressBar, Text } from "react-aria-components";
import { useAsyncList } from "react-stately";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef } from "react";
import SpinnerSvg from "../SpinnerSvg";

type Item = {
  user: { name: string };
  urls: { regular?: string };
  alt_description: string;
};

export default function ImageGridExample() {
  const listBoxRef = useRef<React.ElementRef<typeof ListBox>>(null);
  //   const [lastItem, setLastItem] = useState<React.ElementRef<typeof Item>>();

  const list = useAsyncList<Item, number>({
    async load({ signal, cursor }) {
      const page = cursor || 1;
      const res = await fetch(
        `https://api.unsplash.com/photos?page=${page}&per_page=25&client_id=AJuU-FPh11hn7RuumUllp4ppT8kgiLS7LtOHp_sp4nc`,
        { signal }
      );
      const items = await res.json();
      return { items, cursor: page + 1 };
    },
  });

  const items: Item[] = list.isLoading
    ? [
        ...list.items,
        ...Array(25)
          .fill(null)
          .map((_, idx) => ({
            user: { name: `loading-${idx}` },
            urls: {},
            alt_description: `loading-${idx}`,
          })),
      ]
    : list.items;

  const renderEmptyState = () => {
    if (list.isLoading) {
      return <ProgressCircle />;
    }
  };

  //   useEffect(() => {
  //     if (!listBoxRef.current || !lastItem) return;
  //     // console.log(lastItem);
  //     const observer = new IntersectionObserver(
  //       (entries) => {
  //         entries.forEach((entry) => {
  //           if (entry.isIntersecting) {
  //             list.loadMore();
  //           }
  //         });
  //       },
  //       { root: listBoxRef.current, threshold: 0 }
  //     );
  //     observer.observe(lastItem);
  //     return () => {
  //       observer.disconnect();
  //     };
  //   }, [lastItem, list.loadMore]);

  useEffect(() => {
    if (!listBoxRef.current) return;

    const listBox = listBoxRef.current;
    const { height: listBoxHeight } = listBox.getBoundingClientRect();

    const scrollCallback = () => {
      // console.log(listBox.scrollTop + listBoxHeight, listBox.scrollHeight);
      if (
        (listBox.scrollTop + listBoxHeight) / listBox.scrollHeight > 0.95 &&
        !list.isLoading
      ) {
        console.log("loading new data...");
        list.loadMore();
      }
    };
    listBox.addEventListener("scroll", scrollCallback);
    return () => {
      listBox.removeEventListener("scroll", scrollCallback);
    };
  }, [list.loadMore, list.isLoading]);

  return (
    <div className="bg-gradient-to-r from-sky-500 to-teal-500 p-2 sm:p-8 w-full h-full flex flex-col justify-center items-center space-y-2">
      <div>item counts: {list.items.length}</div>
      <ListBox
        ref={listBoxRef}
        aria-label="Images"
        items={items}
        selectionMode="multiple"
        layout="grid"
        renderEmptyState={renderEmptyState}
        className="overflow-auto outline-none bg-white rounded-lg shadow p-2 h-[500px] w-full max-w-[500px] grid grid-cols-3 gap-3 empty:flex"
      >
        {(item) => (
          <ListBoxItem
            key={item.urls.regular || item.user.name}
            textValue={item.user.name}
            className="relative rounded outline-none group cursor-default h-[120px]"
          >
            <div className="w-full h-full flex justify-center items-center">
              <SpinnerSvg className="animate-spin -ml-1 mr-3 h-6 w-6 text-sky-800" />
            </div>
            {item.urls.regular && (
              <div className="absolute top-0 w-full h-full flex flex-col">
                <img
                  src={item.urls.regular}
                  alt={item.alt_description}
                  className="w-full h-[90px] object-cover rounded group-selected:ring-2 group-focus-visible:ring-4 group-selected:group-focus-visible:ring-4 ring-offset-2 ring-sky-600"
                />

                <Text
                  slot="label"
                  className="text-[11px] text-gray-700 font-semibold overflow-hidden text-ellipsis whitespace-nowrap max-w-full block mt-1.5"
                >
                  {item.user.name}
                </Text>
                <div className="absolute top-1 left-1 text-sky-800 bg-white rounded-full leading-[0] hidden group-selected:block">
                  <CheckCircleIcon className="w-5 h-5" />
                </div>
              </div>
            )}
          </ListBoxItem>
        )}
        {/* {items.map((item, idx) => {
          return (
            <Item
              ref={
                idx === list.items.length - 1
                  ? (ref) => ref && setLastItem(ref)
                  : undefined
              }
              key={idx}
              textValue={item.user.name}
              className="relative rounded outline-none group cursor-default h-[120px]"
            >
              <div className="w-full h-full flex justify-center items-center">
                <SpinnerSvg className="animate-spin -ml-1 mr-3 h-6 w-6 text-sky-800" />
              </div>
              {item.urls.regular && (
                <div className="absolute top-0 w-full h-full flex flex-col">
                  <img
                    src={item.urls.regular}
                    alt={item.alt_description}
                    className="w-full h-[90px] object-cover rounded group-selected:ring-2 group-focus-visible:ring-4 group-selected:group-focus-visible:ring-4 ring-offset-2 ring-sky-600"
                  />

                  <Text
                    slot="label"
                    className="text-[11px] text-gray-700 font-semibold overflow-hidden text-ellipsis whitespace-nowrap max-w-full block mt-1.5"
                  >
                    {item.user.name}
                  </Text>
                  <div className="absolute top-1 left-1 text-sky-800 bg-white rounded-full leading-[0] hidden group-selected:block">
                    <CheckCircleIcon className="w-5 h-5" />
                  </div>
                </div>
              )}
            </Item>
          );
        })} */}
      </ListBox>
    </div>
  );
}

function ProgressCircle() {
  return (
    <ProgressBar
      aria-label="Loading…"
      isIndeterminate
      className="flex items-center justify-center w-full"
    >
      <svg
        className="animate-spin h-5 w-5 text-sky-800"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25 stroke-current stroke-[4px]"
          cx="12"
          cy="12"
          r="10"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </ProgressBar>
  );
}
