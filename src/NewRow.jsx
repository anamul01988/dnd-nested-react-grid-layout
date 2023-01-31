import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { ROW } from "./constants";
import DropZone from "./DropZone";
import Column from "./Column";
import Modal from "./Modal";

const style = {};
const NewRow = ({ data, components, handleDrop, path }) => {
  const [modal, setModal] = useState(false);
  const toggleModal = (e) => {
    // console.log("clicked ", modal);
    setModal(!modal);
  };
  console.log(" In new Row ", data);
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ROW,
      id: data.id,
      children: data.children,
      path,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const renderColumn = (column, currentPath) => {
    // console.log("column",column);
    return (
      <Column
        key={column.id}
        data={column}
        components={components}
        handleDrop={handleDrop}
        path={currentPath}
      />
    );
  };

  return (
    <div ref={ref} onClick={toggleModal} style={{ ...style, opacity }} className="base draggable row">
      {data.id}
      {
        data.children.length === 0 && <div><h3>Empty Row</h3></div>
      }
         <DropZone
            data={{
              path: path,
              childrenCount: data.children.length,
            }}
            onDrop={handleDrop}
            isLast
          />
      {/* <div className="columns">
        {data?.children?.map((column, index) => {
          const currentPath = `${path}-${index}`;

          return (
            <React.Fragment key={column.id}>
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: data.children.length,
                }}
                onDrop={handleDrop}
                className="horizontalDrag"
              />
              {renderColumn(column, currentPath)}
            </React.Fragment>
          );
        })}
        <DropZone
          data={{
            path: `${path}-${data?.children?.length}`,
            childrenCount: data?.children?.length,
          }}
          onDrop={handleDrop}
          className="horizontalDrag"
          isLast
        />
      </div> */}
         {modal && <Modal modal={modal} setModal={setModal} id={data.id}></Modal>}
    </div>
  );
};
export default NewRow;
