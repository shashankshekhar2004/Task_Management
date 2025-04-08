import React, { useEffect, useState } from "react";
import Cards from "../components/home/Cards";
import axios from "axios";

const ImportantTask = () => {
  const [Data, setData] = useState();
  const fetchTasks = async () => {
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const response = await axios.get(
        "https://task-mangement-lumm.onrender.com/api/v2/get-imp-tasks",
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
  //console.log(Data);
  return (
    <div>
      <Cards home={"false"} data={Data} />
    </div>
  );
};

export default ImportantTask;
