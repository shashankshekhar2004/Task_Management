import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";

const Sidebar = () => {
  const [Data, setData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("id"); // Corrected
    localStorage.removeItem("token"); // Corrected
    navigate("/signup");
  };

  const data = [
    { title: "All task", icons: <CgNotes />, link: "/" },
    {
      title: "Important task",
      icons: <MdLabelImportant />,
      link: "/importantTask",
    },
    {
      title: "Completed task",
      icons: <FaCheckDouble />,
      link: "/completedTask",
    },
    {
      title: "Incomplete task",
      icons: <TbNotebookOff />,
      link: "/incompleteTask",
    },
  ];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const headers = {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`, // Corrected token usage
        };

        const response = await axios.get(
          "https://task-mangement-lumm.onrender.com/api/v2/get-all-tasks",
          { headers }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    if (localStorage.getItem("id") && localStorage.getItem("token"))
      fetchTasks();
  });

  return (
    <>
      {Data && (
        <div>
          <h2 className="text-xl font-semibold">{Data.username}</h2>
          <h4 className="mb-1 text-gray-400">{Data.email}</h4>
          <hr />
        </div>
      )}
      <div>
        {data.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            className="p-2 hover:bg-gray-600 rounded cursor-pointer flex items-center my-2 transition-all duration-300"
          >
            {item.icons} <span className="ml-2">{item.title}</span>
          </Link>
        ))}
      </div>
      <div>
        <button className="bg-gray-600 w-full p-2 rounded" onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
