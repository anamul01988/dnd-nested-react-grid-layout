import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDrop } from "react-dnd";
import { COMPONENT, ROW, COLUMN } from "./constants";

const ACCEPTS = [ROW, COLUMN, COMPONENT];

const TrashDropZone = ({ data, onDrop }) => {
  const [objTree, setObjectTree] = useState({});
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ACCEPTS,
    drop: (item, monitor) => {
      onDrop(data, item);
    },
    canDrop: (item, monitor) => {
      const layout = data.layout;
      const itemPath = item.path;
      const splitItemPath = itemPath.split("-");
      const itemPathRowIndex = splitItemPath[0];
      const itemRowChildrenLength =
        layout[itemPathRowIndex] && layout[itemPathRowIndex].children?.length;

      // prevent removing a col when row has only one col
      if (
        item.type === COLUMN &&
        itemRowChildrenLength &&
        itemRowChildrenLength < 2
      ) {
        return false;
      }

      return true;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;
  // console.log("trash Data", data);
  useEffect(() => {
    const objTree1 = JSON.stringify(data, undefined, 4);
    setObjectTree(objTree1);
  }, [data]);
  // const objTree = JSON.stringify(data, undefined, 4)
  // console.log("objTree", objTree);
  return (
    <>
      <div
        className={classNames("trashDropZone", { active: isActive })}
        ref={drop}
      >
        TRASH
      </div>
      <div style={{ textAlign: "center" }}>
        <textarea
          style={{
            color: "#000",
            height: "700px",
            width: "600px",
            border: "2px solid #777",
            marginTop: "20px",
          }}
          name="postContent"
          readOnly
          // defaultValue={JSON.parse(objTree)}
          value={objTree}
          // rows={100}
          // cols={10}
        />
      </div>

 
    </>
  );
};
export default TrashDropZone;
