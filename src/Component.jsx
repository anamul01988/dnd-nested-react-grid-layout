import React, { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { COMPONENT } from "./constants";
import Modal from "./Modal";

const style = {
  border: "1px dashed black",
  padding: "0.5rem 1rem",
  backgroundColor: "white",
  cursor: "move",
};
const Component = ({ data, components, path }) => {
  const [modal, setModal] = useState(false);
  const toggleModal = (e) => {
    // console.log("clicked ", modal);
    setModal(!modal);
  };
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: { type: COMPONENT, id: data.id, path },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  // console.log("drag",drag);
  const opacity = isDragging ? 0 : 1;
  drag(ref);

  const component = components[data.id];
  // console.log("component", component);
  return (
    <div
      ref={ref}
      onClick={toggleModal}
      style={{
        ...style,
        opacity,
      }}
      className="component draggable"
    >
      <div>{data.id}</div>
      {/* <button  >Click me</button> */}
      <div>{component.content}</div>
      {modal && <Modal modal={modal} setModal={setModal} id={data.id}></Modal>}
    </div>
  );
};
export default Component;
