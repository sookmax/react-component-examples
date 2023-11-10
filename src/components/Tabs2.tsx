import {
  Collection,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "react-aria-components";
import {
  animate,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";

const tabs = [
  { id: "world", label: "World" },
  { id: "ny", label: "N.Y." },
  { id: "business", label: "Business" },
  { id: "arts", label: "Arts" },
  { id: "science", label: "Science" },
];

export default function AnimatedTabs() {
  const [selectedKey, setSelectedKey] = useState(tabs[0].id);

  const tabListRef = useRef<React.ElementRef<typeof TabList>>(null);
  const tabPanelsRef = useRef<HTMLDivElement>(null);

  // Track the scroll position of the tab panel container.
  const { scrollXProgress } = useScroll({
    container: tabPanelsRef,
  });

  // Find all the tab elements so we can use their dimensions.
  const [tabElements, setTabElements] = useState([] as any[]);
  useEffect(() => {
    if (tabElements.length === 0 && tabListRef.current) {
      const tabs = tabListRef.current.querySelectorAll("[role=tab]");
      setTabElements(Array.from(tabs));
    }
  }, [tabElements]);

  // This function determines which tab should be selected
  // based on the scroll position.
  const getIndex = useCallback(
    (x: number) => Math.max(0, Math.floor((tabElements.length - 1) * x)),
    [tabElements]
  );

  // This function transforms the scroll position into the X position
  // or width of the selected tab indicator.
  const transform = (x: number, property: string) => {
    if (!tabElements.length) return 0;

    // Find the tab index for the scroll X position.
    const index = getIndex(x);

    // Get the difference between this tab and the next one.
    const difference =
      index < tabElements.length - 1
        ? tabElements[index + 1][property] - tabElements[index][property]
        : tabElements[index].offsetWidth;

    // Get the percentage between tabs.
    // This is the difference between the integer index and fractional one.
    const percent = (tabElements.length - 1) * x - index;

    // Linearly interpolate to calculate the position of the selection indicator.
    const value = tabElements[index][property] + difference * percent;

    // iOS scrolls weird when translateX is 0 for some reason. 🤷‍♂️
    return value || 0.1;
  };

  const x = useTransform(scrollXProgress, (x) => transform(x, "offsetLeft"));
  const width = useTransform(scrollXProgress, (x) =>
    transform(x, "offsetWidth")
  );

  // When the user scrolls, update the selected key
  // so that the correct tab panel becomes interactive.
  useMotionValueEvent(scrollXProgress, "change", (x) => {
    if (animationRef.current || !tabElements.length) return;
    setSelectedKey(tabs[getIndex(x)].id);
  });

  // When the user clicks on a tab perform an animation of
  // the scroll position to the newly selected tab panel.
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  const onSelectionChange: React.ComponentPropsWithoutRef<
    typeof Tabs
  >["onSelectionChange"] = (selectedKey) => {
    setSelectedKey(selectedKey as string);

    // If the scroll position is already moving but we aren't animating
    // then the key changed as a result of a user scrolling. Ignore.
    if (scrollXProgress.getVelocity() && !animationRef.current) {
      return;
    }

    const tabPanel = tabPanelsRef.current;
    const index = tabs.findIndex((tab) => tab.id === selectedKey);
    animationRef.current?.stop();

    if (tabPanel) {
      animationRef.current = animate(
        tabPanel.scrollLeft,
        tabPanel.scrollWidth * (index / tabs.length),
        {
          type: "spring",
          bounce: 0.2,
          duration: 0.6,
          onUpdate: (v) => {
            tabPanel.scrollLeft = v;
          },
          onPlay: () => {
            // Disable scroll snap while the animation is going or weird things happen.
            tabPanel.style.scrollSnapType = "none";
          },
          onComplete: () => {
            tabPanel.style.scrollSnapType = "";
            animationRef.current = null;
          },
        }
      );
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-gray-100 flex justify-center p-4">
        <Tabs
          className="w-fit max-w-[min(100%,350px)]"
          selectedKey={selectedKey}
          onSelectionChange={onSelectionChange}
        >
          <div className="relative">
            <TabList ref={tabListRef} className="flex -mx-1" items={tabs}>
              {(tab) => (
                <Tab className="cursor-default px-3 py-1.5 text-md transition outline-none touch-none">
                  {({ isSelected, isFocusVisible }) => (
                    <>
                      {tab.label}
                      {isFocusVisible && isSelected && (
                        // Focus ring.
                        <motion.span
                          className="absolute inset-0 z-10 rounded-full ring-2 ring-black ring-offset-2"
                          style={{ x, width }}
                        />
                      )}
                    </>
                  )}
                </Tab>
              )}
            </TabList>
            {/* Selection indicator. */}
            <motion.span
              className="absolute inset-0 z-10 bg-white rounded-full mix-blend-difference"
              style={{ x, width }}
            />
          </div>
          <div
            ref={tabPanelsRef}
            className="my-4 overflow-auto snap-x snap-mandatory no-scrollbar flex"
            style={{ scrollbarWidth: "none" }}
          >
            <Collection items={tabs}>
              {(tab) => (
                <TabPanel
                  shouldForceMount
                  className="flex-shrink-0 w-full px-2 box-border snap-start outline-none -outline-offset-2 rounded focus-visible:outline-black"
                >
                  <h2>{tab.label} contents...</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean sit amet nisl blandit, pellentesque eros eu,
                    scelerisque eros. Sed cursus urna at nunc lacinia dapibus.
                  </p>
                </TabPanel>
              )}
            </Collection>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
