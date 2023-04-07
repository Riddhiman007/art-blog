import React, { useState } from "react";

//css
import styles from "../../../styles/editor/toolbar.module.css";
// combobox
import { Combobox, Transition } from "@headlessui/react";

// icons
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";

// editor imports
import { $createHeadingNode, HeadingTagType } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  $createParagraphNode,
  $isRangeSelection,
  $getSelection,
  LexicalEditor,
  $getRoot,
  DEPRECATED_$isGridSelection,
} from "lexical";
import { btnOnClick } from "./utils";

export const blockTypeToBlockName = {
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  quote: "Quote Block",
  paragraph: "Paragraph Block",
};

export function BlockStylesToolBar({
  blockType,
  editor,
}: {
  blockType: keyof typeof blockTypeToBlockName;
  editor: LexicalEditor;
}): JSX.Element {
  const formatParagraph = () => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
          $setBlocksType(selection, () => $createParagraphNode());
        }
      });
    }
  };

  const formatHeading = (tag: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
    });
  };

  const fonts: Array<{
    id: string | HeadingTagType;
    name: string;
    className: string;
    onClick: () => any;
    height: string;
  }> = [
    {
      id: "h1",
      name: "Heading 1",
      className: "h1",
      onClick: () => {
        formatHeading("h1");
      },
      height: "h-8",
    },
    {
      id: "h2",
      name: "Heading 2",
      className: "h2",
      onClick: () => {
        formatHeading("h2");
      },
      height: "h-[1.7rem]",
    },
    {
      id: "h3",
      name: "Heading 3",
      className: "h3",
      onClick: () => formatHeading("h3"),
      height: "h-[1.65rem]",
    },
    {
      id: "h4",
      name: "Heading 4",
      className: "h4",
      onClick: () => formatHeading("h4"),
      height: "h-[1.57rem]",
    },
    {
      id: "h5",
      name: "Heading 5",
      className: "h5",
      onClick: () => formatHeading("h5"),
      height: "h-[1.52rem]",
    },
    {
      id: "h6",
      name: "Heading 6",
      className: "h6",
      onClick: () => formatHeading("h6"),
      height: "h-[1.4rem]",
    },
    { id: "quote", name: "Quote Block", className: "", onClick: () => {}, height: "" },
    { id: "paragraph", name: "Paragraph", className: "", onClick: () => {}, height: "" },
  ];
  // which font is selected
  const [selected, setSelected] = useState(fonts[7]);

  // filtering font on search
  const [query, setQuery] = useState("");
  const filteredFont =
    // whether the font matches the search
    query === ""
      ? fonts
      : fonts.filter((font) =>
          font.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className={styles.fontStyles}>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1 mr-1 bg-zinc-100">
          <div className="group relative flex cursor-default flex-row overflow-hidden rounded-lg bg-zinc-100 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className=" w-20 border-none bg-zinc-50 py-2 pl-3 text-sm leading-5 text-gray-900 focus:outline-transparent focus:ring-0 group-focus:outline-transparent"
              //@ts-ignore
              displayValue={(font) => font.name}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
            <Combobox.Button className="">
              <ChevronUpDownIcon
                className="mx-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              as="div"
              className="fixed z-50 mt-2 inline h-40 list-none overflow-auto rounded-md bg-zinc-50 bg-opacity-100 shadow-md shadow-zinc-300 sm:text-sm"
            >
              {filteredFont.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredFont.map((font) => (
                  <Combobox.Option
                    as="div"
                    onClick={font.onClick}
                    key={font.id}
                    className={({ active }) =>
                      `${
                        font.className
                      } relative cursor-default select-none py-2 pl-5 pr-4 ${
                        active
                          ? "flex flex-row justify-between gap-2 bg-teal-600 !pl-0 text-white"
                          : "text-gray-900"
                      }`
                    }
                    value={font}
                  >
                    {({ selected, active }) => (
                      <>
                        {active ? (
                          <span
                            className={` flex items-center  ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon
                              className="h-5 w-10 text-zinc-50"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                        <span
                          onClick={font.onClick}
                          className={`${font.id} ${font.height} block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {font.name}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

/**
 *
 * @returns JSX.Element
 */
export function FontStyles() {
  // fonts
  const fonts: Array<{ id: string | number; name: string }> = [
    { id: 1, name: "Calibri" },
    { id: 2, name: "Arial" },
    { id: 3, name: "Helvetica" },
  ];
  // which font is selected
  const [selected, setSelected] = useState(fonts[0]);

  // filtering font on search
  const [query, setQuery] = useState("");
  const filteredFont =
    // whether the font matches the search
    query === ""
      ? fonts
      : fonts.filter((font) =>
          font.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className={styles.fontStyles}>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1 mr-1 bg-zinc-100">
          <div className="group relative flex cursor-default flex-row overflow-hidden rounded-lg bg-zinc-100 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className=" w-20 border-none bg-zinc-50 py-2 pl-3 text-sm leading-5 text-gray-900 focus:outline-transparent focus:ring-0 group-focus:outline-transparent"
              //@ts-ignore
              displayValue={(font) => font.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="">
              <ChevronUpDownIcon
                className="mx-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              as="div"
              className="fixed z-50 mt-2 inline list-none rounded-md bg-zinc-50 bg-opacity-100 shadow-md shadow-zinc-300 sm:text-sm"
            >
              {filteredFont.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredFont.map((font) => (
                  <Combobox.Option
                    key={font.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-5 pr-4 ${
                        active
                          ? "flex flex-row justify-between gap-2 bg-teal-600 !pl-0 text-white"
                          : "text-gray-900"
                      }`
                    }
                    value={font}
                  >
                    {({ selected, active }) => (
                      <>
                        {active ? (
                          <span
                            className={` flex items-center  ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon
                              className="h-5 w-10 text-zinc-50"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {font.name}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

// {/**{/* H2 */}
//                   <Combobox.Option
//                     onClick={() => formatHeading("h2")}
//                     key="h2"
//                     className={({ active }) =>
//                       `h2 relative cursor-default select-none py-2 pl-5 pr-4 ${
//                         active
//                           ? "flex flex-row justify-between gap-2 bg-teal-600 !pl-0 text-white"
//                           : "text-gray-900"
//                       }`
//                     }
//                     value="h2"
//                   >
//                     {({ selected, active }) => (
//                       <>
//                         {active ? (
//                           <span
//                             className={` flex items-center  ${
//                               active ? "text-white" : "text-teal-600"
//                             }`}
//                           >
//                             <CheckIcon
//                               className="h-5 w-10 text-zinc-50"
//                               aria-hidden="true"
//                             />
//                           </span>
//                         ) : null}
//                         <span
//                           className={`h2 block h-[1.7rem] truncate ${
//                             selected ? "font-medium" : "font-normal"
//                           }`}
//                         >
//                           {blockTypeToBlockName.h2}
//                         </span>
//                       </>
//                     )}
//                   </Combobox.Option>

//                   {/* H3 */}
//                   <Combobox.Option
//                     onClick={() => formatHeading("h3")}
//                     key="h3"
//                     className={({ active }) =>
//                       `h3 relative cursor-default select-none py-2 pl-5 pr-4 ${
//                         active
//                           ? "flex flex-row justify-between gap-2 bg-teal-600 !pl-0 text-white"
//                           : "text-gray-900"
//                       }`
//                     }
//                     value="h3"
//                   >
//                     {({ selected, active }) => (
//                       <>
//                         {active ? (
//                           <span
//                             className={` flex items-center  ${
//                               active ? "text-white" : "text-teal-600"
//                             }`}
//                           >
//                             <CheckIcon
//                               className="h-5 w-10 text-zinc-50"
//                               aria-hidden="true"
//                             />
//                           </span>
//                         ) : null}
//                         <span
//                           className={`h3 block h-[1.65rem] truncate ${
//                             selected ? "font-medium" : "font-normal"
//                           }`}
//                         >
//                           {blockTypeToBlockName.h3}
//                         </span>
//                       </>
//                     )}
//                   </Combobox.Option>

//                   {/* H4 */}
//                   <Combobox.Option
//                     onClick={() => formatHeading("h4")}
//                     key="h4"
//                     className={({ active }) =>
//                       `h4 relative cursor-default select-none py-2 pl-5 pr-4 ${
//                         active
//                           ? "flex flex-row justify-between gap-2 bg-teal-600 !pl-0 text-white"
//                           : "text-gray-900"
//                       }`
//                     }
//                     value="h4"
//                   >
//                     {({ selected, active }) => (
//                       <>
//                         {active ? (
//                           <span
//                             className={` flex items-center  ${
//                               active ? "text-white" : "text-teal-600"
//                             }`}
//                           >
//                             <CheckIcon
//                               className="h-5 w-10 text-zinc-50"
//                               aria-hidden="true"
//                             />
//                           </span>
//                         ) : null}
//                         <span
//                           className={`h4 block h-[1.57rem] truncate ${
//                             selected ? "font-medium" : "font-normal"
//                           }`}
//                         >
//                           {blockTypeToBlockName.h4}
//                         </span>
//                       </>
//                     )}
//                   </Combobox.Option>

//                   {/* H5 */}
//                   <Combobox.Option
//                     onClick={() => formatHeading("h5")}
//                     key="h5"
//                     className={({ active }) =>
//                       `h5 relative cursor-default select-none py-2 pl-5 pr-4 ${
//                         active
//                           ? "flex flex-row justify-between gap-2 bg-teal-600 !pl-0 text-white"
//                           : "text-gray-900"
//                       }`
//                     }
//                     value="h5"
//                   >
//                     {({ selected, active }) => (
//                       <>
//                         {active ? (
//                           <span
//                             className={` flex items-center  ${
//                               active ? "text-white" : "text-teal-600"
//                             }`}
//                           >
//                             <CheckIcon
//                               className="h-5 w-10 text-zinc-50"
//                               aria-hidden="true"
//                             />
//                           </span>
//                         ) : null}
//                         <span
//                           className={`h5 block h-[1.52rem] truncate ${
//                             selected ? "font-medium" : "font-normal"
//                           }`}
//                         >
//                           {blockTypeToBlockName.h5}
//                         </span>
//                       </>
//                     )}
//                   </Combobox.Option>

//                   {/* H6 */}
//                   <Combobox.Option
//                     onClick={() => formatHeading("h6")}
//                     key="h6"
//                     className={({ active }) =>
//                       `h6 relative cursor-default select-none py-2 pl-5 pr-4 ${
//                         active
//                           ? "flex flex-row justify-between gap-2 bg-teal-600 !pl-0 text-white"
//                           : "text-gray-900"
//                       }`
//                     }
//                     value="h6"
//                   >
//                     {({ selected, active }) => (
//                       <>
//                         {active ? (
//                           <span
//                             className={` flex items-center  ${
//                               active ? "text-white" : "text-teal-600"
//                             }`}
//                           >
//                             <CheckIcon
//                               className="h-5 w-10 text-zinc-50"
//                               aria-hidden="true"
//                             />
//                           </span>
//                         ) : null}
//                         <span
//                           className={`h6 block h-[1.4rem] truncate ${
//                             selected ? "font-medium" : "font-normal"
//                           }`}
//                         >
//                           {blockTypeToBlockName.h6}
//                         </span>
//                       </>
//                     )}
//                   </Combobox.Option>

//                   {/* Quote */}
//                   <Combobox.Option
//                     key="quote"
//                     className={({ active }) =>
//                       ` relative cursor-default select-none py-2 pl-5 pr-4 ${
//                         active
//                           ? "flex flex-row justify-between gap-2 bg-teal-600 !pl-0 text-white"
//                           : "text-gray-900"
//                       }`
//                     }
//                     value="quote"
//                   >
//                     {({ selected, active }) => (
//                       <>
//                         {active ? (
//                           <span
//                             className={` flex items-center  ${
//                               active ? "text-white" : "text-teal-600"
//                             }`}
//                           >
//                             <CheckIcon
//                               className="h-5 w-10 text-zinc-50"
//                               aria-hidden="true"
//                             />
//                           </span>
//                         ) : null}
//                         <span
//                           className={`block truncate ${
//                             selected ? "font-medium" : "font-normal"
//                           }`}
//                         >
//                           {blockTypeToBlockName.quote}
//                         </span>
//                       </>
//                     )}
//                   </Combobox.Option>

//                   {/* Paragraph */}
//                   <Combobox.Option
//                     defaultChecked
//                     key="paragraph"
//                     className={({ active }) =>
//                       ` relative cursor-default select-none py-2 pl-5 pr-4 ${
//                         active
//                           ? "flex flex-row justify-between gap-2 bg-teal-600 !pl-0 text-white"
//                           : "text-gray-900"
//                       }`
//                     }
//                     value="paragraph"
//                   >
//                     {({ selected, active }) => (
//                       <>
//                         {active ? (
//                           <span
//                             className={` flex items-center  ${
//                               active ? "text-white" : "text-teal-600"
//                             }`}
//                           >
//                             <CheckIcon
//                               className="h-5 w-10 text-zinc-50"
//                               aria-hidden="true"
//                             />
//                           </span>
//                         ) : null}
//                         <span
//                           className={`block truncate ${
//                             selected ? "font-medium" : "font-normal"
//                           }`}
//                         >
//                           {blockTypeToBlockName.paragraph}
//                         </span>
//                       </>
//                     )}
//                   </Combobox.Option>
//                 </> */
