import React, { useState } from "react";
import "./Modal.css";

export default function Modal({modal, setModal,id}) {
//   const [modal, setModal] = useState(false);
// console.log("modal ", modal,id);
//   const toggleModal = () => {
//     console.log("modal in togFun",modal);
//     setModal(!modal);
//     console.log("togFun",modal);
//   };

//   if(modal) {
//     document.body.classList.add('active-modal')
//   } else {
//     document.body.classList.remove('active-modal')
//   }

  return (
    <>
      {/* <button onClick={toggleModal} className="btn-modal">
        Open
      </button> */}
     <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <h2>Id is : {id}</h2>
            <p>
              Following the id is the selected component of id
            </p>
            <button className="close-modal"
            //  onClick={()=>setModal(!modal)}
             >
              CLOSE
            </button>
          </div>
        </div>
    </>
  );
}