import {
  Collection,
  Header,
  ListBoxItem,
  ListBox,
  Section,
  Text,
} from "react-aria-components";

const favorites = [
  {
    id: "tony",
    name: "Tony Baldwin",
    username: "@tony",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "jlangstrath",
    name: "Julienne Langstrath",
    username: "@jlangstrath",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "rgonzalez",
    name: "Roberto Gonzalez",
    username: "@rgonzalez",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const people = [
  {
    id: 1,
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Gilberto Miguel",
    username: "@gilberto_miguel",
  },
  {
    id: 2,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Maia Pettegree",
    username: "@mpettegree",
  },
  {
    id: 3,
    avatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Wade Redington",
    username: "@redington",
  },
  {
    id: 4,
    avatar:
      "https://images.unsplash.com/photo-1528763380143-65b3ac89a3ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Kurtis Gurrado",
    username: "@kurtis",
  },
  {
    id: 5,
    avatar:
      "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Sonja Balmann",
    username: "@sbalmann",
  },
  {
    id: 6,
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: "Brent Mickelwright",
    username: "@brent_m",
  },
  {
    id: 7,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    name: "Charles Webb",
    username: "@cwebb",
  },
];

export default function ContactListExample() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-sky-500 p-8 h-full w-full flex justify-center items-center">
      <ListBox
        aria-label="Contacts"
        selectionMode="multiple"
        selectionBehavior="replace"
        className="w-72 max-h-[290px] overflow-auto outline-none bg-white text-gray-700 p-2 flex flex-col gap-2 rounded-lg shadow scroll-pt-6"
      >
        <ContactSection title="Favorites" items={favorites}>
          {(item) => <Contact item={item} />}
        </ContactSection>
        <ContactSection title="All Contacts" items={people}>
          {(item) => <Contact item={item} />}
        </ContactSection>
      </ListBox>
    </div>
  );
}

function ContactSection<T extends object>({
  title,
  children,
  items,
}: {
  title: string;
  items: Iterable<T>;
  children?: React.ReactNode | ((item: T) => React.ReactNode);
}) {
  return (
    <Section>
      <Header className="sticky -top-2 bg-white z-10 font-bold px-2 mb-1 text-slate-700">
        {title}
      </Header>
      <Collection items={items}>{children}</Collection>
    </Section>
  );
}

function Contact({
  item,
}: {
  item: { id: number | string; avatar: string; name: string; username: string };
}) {
  return (
    <ListBoxItem
      id={item.id}
      textValue={item.name}
      className="group relative py-1 px-2 outline-none cursor-default grid grid-rows-2 grid-flow-col auto-cols-max gap-x-3 rounded selected:bg-blue-500 text-slate-700 selected:text-white selected:[&:has(+[data-selected])]:rounded-b-none [&[data-selected]+[data-selected]]:rounded-t-none focus-visible:ring-2 ring-offset-2 ring-blue-500"
    >
      <img
        src={item.avatar}
        alt=""
        className="row-span-2 place-self-center h-8 w-8 rounded-full"
      />
      <Text slot="label" className="font-semibold truncate">
        {item.name}
      </Text>
      <Text
        slot="description"
        className="truncate text-sm text-slate-600 group-selected:text-white"
      >
        {item.username}
      </Text>
      <div className="absolute left-12 right-2 bottom-0 h-px bg-gray-200 group-selected:bg-blue-400 [.group[data-selected]:has(+:not([data-selected]))_&]:hidden [.group:not([data-selected]):has(+[data-selected])_&]:hidden [.group[data-selected]:last-child_&]:hidden" />
    </ListBoxItem>
  );
}
