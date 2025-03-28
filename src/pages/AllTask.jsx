import React, { useEffect, useState } from "react";
import Cards from "../components/home/Cards";
import { IoIosAddCircle } from "react-icons/io";
import InputData from "../components/home/InputData";
import axios from "axios";

const AllTask = () => {
  const [InputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState([]);
  const [updatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    desc: "",
  });

  const fetchTasks = async () => {
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const response = await axios.get(
        "http://localhost:8000/api/v2/get-all-tasks",
        { headers }
      );
      setData(response.data.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token"))
      fetchTasks();
  });

  return (
    <>
      <div>
        <div className="w-full flex justify-end px-4 py-2">
          <button
            onClick={() => setInputDiv("fixed")}
            className="hover:scale-110 transition-all duration-300"
            aria-label="Add New Task"
          >
            <IoIosAddCircle className="text-4xl text-gray-300" />
          </button>
        </div>
        {Data.length > 0 && (
          <Cards
            home="true"
            setInputDiv={setInputDiv}
            data={Data}
            setData={setData}
            setUpdatedData={setUpdatedData}
          />
        )}
      </div>
      <InputData
        InputDiv={InputDiv}
        setInputDiv={setInputDiv}
        updatedData={updatedData}
        setUpdatedData={setUpdatedData}
      />
    </>
  );
};

export default AllTask;
