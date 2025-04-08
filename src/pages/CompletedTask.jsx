import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "../components/home/Cards";
const CompletedTask = () => {
  const [Data, setData] = useState();
  const fetchTasks = async () => {
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const response = await axios.get(
        "https://task-mangement-lumm.onrender.com/api/v2/get-complete-tasks",
        { headers }
      );
      //console.log(response.data);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  });
  return (
    <div>
      <Cards home={"false"} data={Data} />
    </div>
  );
};

export default CompletedTask;
