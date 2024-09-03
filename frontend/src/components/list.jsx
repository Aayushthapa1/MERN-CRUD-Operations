import React from "react";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";

const list = ({ id, task, setUpdateUI, updateMode }) => {
  const removeTask = () => {
    axios
      .delete(`${baseURL}/delete/${id}`)
      .then((res) => console.log(res.data));

    setUpdateUI((prevState) => !prevState);
  };
  return (
    <div>
      <li>
        <div className="icon_holder">
          <BiEditAlt onClick={()=>updateMode(id,task)} className="cursor-pointer" />
          <BsTrash onClick={removeTask} className="cursor-pointer" />
        </div>
      </li>
    </div>
  );
};

export default list;
