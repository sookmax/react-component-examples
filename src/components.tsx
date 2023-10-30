import React from "react";

const modules = import.meta.glob("./components/*.tsx");
const components: {
  [index: string]: {
    path: string;
    module: () => Promise<unknown>;
    displayName: string;
  };
} = {};

for (const path in modules) {
  const split = path.split("/");
  const componentFileName = split[split.length - 1].replace(".tsx", "");
  const componentId = componentFileName.toLowerCase();
  components[componentId] = {
    path,
    module: modules[path],
    displayName: componentFileName,
  };
}

export function getComponent(id: string) {
  if (!components[id]) {
    throw `Component '${id}' not found.`;
  }

  return components[id]
    .module()
    .then((module) => (module as { default: () => React.ReactNode }).default);
}

let componentMetaCache: { displayName: string; path: string }[] | undefined;
export function getAllComponentMeta() {
  if (componentMetaCache) return componentMetaCache;

  componentMetaCache = [];

  for (const componentId in components) {
    componentMetaCache.push({
      displayName: components[componentId].displayName,
      path: `/${componentId}`,
    });
  }

  return componentMetaCache;
}

export type ComponentMeta = ReturnType<typeof getAllComponentMeta>[number];
