import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { COLUMN } from "./constants";
import DropZone from "./DropZone";
import Component from "./Component";

const style = {};
const getStyle = (isDragging) => (
  {
    opacity : isDragging ? 0 : 1,
    background: isDragging?'blue':'white',
    flex: isDragging? 2: 1,
  }
)
const NewColumn = ({ data, components, handleDrop, path }) => {
  const ref = useRef(null);
  // console.log("data",data);
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: COLUMN,
      id: data.id,
      children: data.children,
      path
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;
  // const backg = isDragging ? "#000" : "yellow";
  drag(ref);

  const renderComponent = (component, currentPath) => {
    return (
      <Component
        key={component.id}
        data={component}
        components={components}
        path={currentPath}
      />
    );
  };

  return (
    <div
      ref={ref}
      // style={{ ...style, opacity }}
      style={getStyle(isDragging)}
      className="base draggable column"
    >
      {data.id}
      <h3>New Column </h3>
      {/* {data.children.map((component, index) => {
        const currentPath = `${path}-${index}`;

        return (
          <React.Fragment key={component.id}>
            <DropZone
              data={{
                path: currentPath,
                childrenCount: data.children.length
              }}
              onDrop={handleDrop}
            />
            {renderComponent(component, currentPath)}
          </React.Fragment>
        );
      })}
      <DropZone
        data={{
          path: `${path}-${data.children.length}`,
          childrenCount: data.children.length
        }}
        onDrop={handleDrop}
        isLast
      /> */}
    </div>
  );
};
export default NewColumn;

