import { React, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
const Cards = ({ home, setInputDiv, data, setUpdatedData }) => {
  const handleCompleteTask = async (id) => {
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`, // Corrected token usage
      };
      const response = await axios.put(
        `http://localhost:8000/api/v2/update-complete-task/${id}`,
        {},
        { headers }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleImportantTask = async (id) => {
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`, // Corrected token usage
      };
      const response = await axios.put(
        `http://localhost:8000/api/v2/update-imp-task/${id}`,
        {},
        { headers }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteTask = async (id) => {
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`, // Corrected token usage
      };
      const response = await axios.delete(
        `http://localhost:8000/api/v2/delete-task/${id}`,
        { headers }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdate = (id, title, desc) => {
    setInputDiv("fixed");
    setUpdatedData({
      id: id,
      title: title,
      desc: desc,
    });
  };

  const [ImportantButton, setImportantButton] = useState("Incomplete");

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data &&
        data.map((items, i) => (
          <div
            key={i}
            className="flex flex-col justify-between bg-gray-800 rounded-sm p-4"
          >
            <div>
              <h3 className="text-xl font-semibold">{items.title}</h3>
              <p className="text-gray-300 my-2">{items.desc}</p>
              <p className="text-sm text-gray-400">Status: {items.status}</p>
              <div className="mt-4 w-full flex items-center">
                <button
                  className={`p-2 rounded w-3/6 ${
                    items.complete === true ? "bg-green-700" : "bg-red-400"
                  }`}
                  onClick={() => handleCompleteTask(items._id)}
                >
                  {items.complete === true ? "Completed" : "In Completed"}
                </button>
                <div className="text-white  p-2 w-3/6 text-2xl font-semibold flex justify-around">
                  <button onClick={() => handleImportantTask(items._id)}>
                    {items.important === false ? (
                      <CiHeart />
                    ) : (
                      <FaHeart className="text-red-500" />
                    )}
                  </button>
                  {home !== "false" && (
                    <button
                      onClick={() =>
                        handleUpdate(items._id, items.title, items.desc)
                      }
                    >
                      <FaEdit />
                    </button>
                  )}
                  <button onClick={() => deleteTask(items._id)}>
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <button
          onClick={() => setInputDiv("fixed")}
          className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300"
        >
          <IoIosAddCircle className="text-5xl" />
          <h2 className="text-2xl mt-4">Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
