import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, HomeIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  Outlet,
  useLoaderData,
  NavLink,
  useNavigation,
  Form,
  useSubmit,
  LoaderFunctionArgs,
} from "react-router-dom";
import Fuse from "fuse.js";
import { getAllComponentMeta } from "../components";
import { GithubSvg } from "../GithubSvg";

function classNames(...classes: (string | boolean | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("search") ?? "";
  const searchResult = searchQuery
    ? new Fuse(getAllComponentMeta(), {
        includeMatches: true,
        keys: ["displayName"],
      })
        .search(searchQuery)
        .map((result) => {
          const highlights: { char: string; highlight: boolean }[] = [];
          for (const char of result.item.displayName) {
            highlights.push({ char, highlight: false });
          }
          result.matches?.[0].indices.forEach(([start, end]) => {
            for (let i = start; i <= end; i++) {
              highlights[i].highlight = true;
            }
          });

          return {
            item: result.item,
            highlights,
          };
        })
    : getAllComponentMeta().map((meta) => {
        const highlights: { char: string; highlight: boolean }[] = [];
        for (const char of meta.displayName) {
          highlights.push({ char, highlight: false });
        }

        return {
          item: meta,
          highlights,
        };
      });

  return {
    searchQuery,
    searchResult,
  };
}

export default function Root() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { searchQuery, searchResult } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;
  const navigation = useNavigation();
  const submit = useSubmit();

  const sideBar = (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-4 pb-4">
      <div className="flex h-16 shrink-0 border-b border-gray-200">
        <Form
          id="search-form"
          role="search"
          action={window.location.pathname}
          className="relative flex flex-1"
        >
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <MagnifyingGlassIcon
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 sm:text-sm outline-none"
            placeholder="Search..."
            type="search"
            name="search"
            aria-label="Search components"
            // defaultValue={searchQuery}
            value={searchQuery}
            onChange={(event) => {
              submit(event.currentTarget.form, {
                replace: !!searchQuery,
              });
            }}
          />
        </Form>
      </div>
      <nav className="flex flex-1 flex-col space-y-6">
        <h2 className="font-mono text-gray-900 group">
          <NavLink
            to="/"
            className={({ isActive }) =>
              classNames(
                "flex items-center space-x-2 group-hover:text-indigo-600",
                isActive && "text-indigo-600"
              )
            }
            onClick={() => setSidebarOpen(false)}
          >
            <HomeIcon className="h-6 w-6 shrink-0" />
            <span>Home</span>
          </NavLink>
        </h2>
        <div>
          <h3 className="font-mono mb-4">React Aria Components</h3>
          <ul role="list" className="space-y-1">
            {searchResult.map((result) => (
              <li
                key={result.item.displayName}
                onClick={() => setSidebarOpen(false)}
              >
                <NavLink
                  to={result.item.path}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? "bg-gray-50 text-indigo-600"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )
                  }
                >
                  <span>
                    {result.highlights.map(({ char, highlight }, index) => (
                      <span
                        key={index}
                        className={classNames(highlight && "text-red-500")}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );

  return (
    <>
      <div className="flex w-full h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5 outline-none"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  {sideBar}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:w-72 lg:flex-col lg:relative lg:z-10">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          {sideBar}
        </div>

        <div className="grow flex flex-col h-full">
          <div className="lg:hidden relative z-10 flex h-16 shrink-0 items-center justify-between gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <a
              className="flex justify-center items-center"
              href="https://github.com/sookmax"
              target="_blank"
            >
              <GithubSvg className="h-7 w-7" />
            </a>
          </div>
          <main
            className={classNames(
              "grow",
              navigation.state === "loading" ?? "opacity-25"
            )}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
