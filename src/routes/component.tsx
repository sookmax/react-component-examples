import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getComponent } from "../components";
import React from "react";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.componentId) throw "`params.componentId` not found.";
  const Comp = await getComponent(params.componentId);
  return { Comp };
}

export default function Component() {
  const { Comp } = useLoaderData() as { Comp: () => React.ReactElement };
  return <Comp />;
}
