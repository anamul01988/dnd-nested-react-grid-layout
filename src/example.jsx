import React, { useState, useCallback } from "react";

import DropZone from "./DropZone";
import TrashDropZone from "./TrashDropZone";
import SideBarItem from "./SideBarItem";
import Row from "./Row";
import initialData from "./initial-data";
import {
  handleMoveWithinParent,
  handleMoveToDifferentParent,
  handleMoveSidebarComponentIntoParent,
  handleMoveSidebarComponentIntoParent1,
  handleMoveSidebarComponentIntoParent2,
  handleRemoveItemFromLayout,
} from "./helpers";

import { SIDEBAR_ITEMS, SIDEBAR_ITEM, COMPONENT, COLUMN } from "./constants";
import shortid from "shortid";
import NewRow from "./NewRow";
import NewColumn from "./NewColumn";

const Container = () => {
  const initialLayout = initialData.layout;
  const initialComponents = initialData.components;
  const [layout, setLayout] = useState(initialLayout);
  const [components, setComponents] = useState(initialComponents);

  const handleDropToTrashBin = useCallback(
    (dropZone, item) => {
      const splitItemPath = item.path.split("-");
      setLayout(handleRemoveItemFromLayout(layout, splitItemPath));
    },
    [layout]
  );

  const handleDrop = useCallback(
    (dropZone, item) => {
      // console.log('dropZone', dropZone)
      console.log("item", item);

      const splitDropZonePath = dropZone.path.split("-");
      const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");

      // const newItem = { id: item.id, type: item.type };
      // if (item.component.type === COLUMN) {
      //   newItem.children = item.children;
      // }
// =============== 3 ta hoilo row er moto input, row, column, er jonno start ========
      // sidebar into
      if (item.type === SIDEBAR_ITEM && item.component.content !== "New Row" && item.component.content !== "New_column1") {
        // 1. Move sidebar item into page
        const newComponent = {
          id: shortid.generate(),
          ...item.component,
        };
        const newItem = {
          id: newComponent.id,
          type: COMPONENT,
          // type: item.component.content,
        };
        setComponents({
          ...components,
          [newComponent.id]: newComponent,
        });
        setLayout(
          handleMoveSidebarComponentIntoParent(
            layout,
            splitDropZonePath,
            newItem
          )
        );
        return;
      }
      // sidebar into for row 
      if (item.type === SIDEBAR_ITEM && item.component.content === "New Row") {
        // 1. Move sidebar item into page
        const newComponent = {
          id: shortid.generate(),
          ...item.component,
        };
        const newItem = {
          id: newComponent.id,
          // type: COMPONENT,
          type: item.component.content,
        };
        setComponents({
          ...components,
          [newComponent.id]: newComponent,
        });
        setLayout(
          handleMoveSidebarComponentIntoParent1(
            layout,
            splitDropZonePath,
            newItem
          )
        );
        return;
      }
      // sidebar into for row 
      if (item.type === SIDEBAR_ITEM && item.component.content === "New_column1") {
        // 1. Move sidebar item into page
        const newComponent = {
          id: shortid.generate(),
          ...item.component,
        };
        const newItem = {
          id: newComponent.id,
          // type: COMPONENT,
          type: item.component.content,
        };
        setComponents({
          ...components,
          [newComponent.id]: newComponent,
        });
        setLayout(
          handleMoveSidebarComponentIntoParent2(
            layout,
            splitDropZonePath,
            newItem
          )
        );
        return;
      }
// =============== 3 ta hoilo row er moto input, row, column, er jonno end ========
      // move down here since sidebar items dont have path
      const splitItemPath = item.path.split("-");
      const pathToItem = splitItemPath.slice(0, -1).join("-");

      // 2. Pure move (no create)
      if (splitItemPath.length === splitDropZonePath.length) {
        // 2.a. move within parent
        if (pathToItem === pathToDropZone) {
          setLayout(
            handleMoveWithinParent(layout, splitDropZonePath, splitItemPath)
          );
          return;
        }

        // 2.b. OR move different parent
        // TODO FIX columns. item includes children
        setLayout(
          handleMoveToDifferentParent(
            layout,
            splitDropZonePath,
            splitItemPath,
            newItem
          )
        );
        return;
      }

      // 3. Move + Create
      setLayout(
        handleMoveToDifferentParent(
          layout,
          splitDropZonePath,
          splitItemPath,
          newItem
        )
      );
    },
    [layout, components]
  );

  const renderRow = (row, currentPath) => {
    console.log("row", row);
    if (row.type === "row") {
      return (
        <>
          <Row
            key={row.id}
            data={row}
            handleDrop={handleDrop}
            components={components}
            path={currentPath}
          />
        </>
      );
    }
    if (row.type === "new_row") {
      console.log("paici new Row");
      return (
        <>
          <NewRow
            key={row.id}
            data={row}
            handleDrop={handleDrop}
            components={components}
            path={currentPath}
          ></NewRow>
        </>
      );
    }
    if (row.type === "new_column") {
      console.log("paici new column");
      return (
        <>
          <NewColumn
            key={row.id}
            data={row}
            handleDrop={handleDrop}
            components={components}
            path={currentPath}
          ></NewColumn>
        </>
      );
    }
  };

  // dont use index for key when mapping over items
  // causes this issue - https://github.com/react-dnd/react-dnd/issues/342
  // console.log("main Layout data",layout);
  return (
    <div className="body">
      <div className="sideBar">
        {Object.values(SIDEBAR_ITEMS).map((sideBarItem, index) => (
          <SideBarItem key={sideBarItem.id} data={sideBarItem} />
        ))}
      </div>
      <div className="pageContainer">
        <div className="page">
          {layout.map((row, index) => {
            const currentPath = `${index}`;
            // console.log("currentPath",currentPath);
            return (
              <React.Fragment key={row.id}>
                <DropZone
                  data={{
                    path: currentPath,
                    childrenCount: layout.length,
                  }}
                  onDrop={handleDrop}
                  path={currentPath}
                />
                {renderRow(row, currentPath)}
              </React.Fragment>
            );
          })}
          <DropZone
            data={{
              path: `${layout.length}`,
              childrenCount: layout.length,
            }}
            onDrop={handleDrop}
            isLast
          />
        </div>

        <TrashDropZone
          data={{
            layout,
          }}
          onDrop={handleDropToTrashBin}
        />
      </div>
    </div>
  );
};
export default Container;
