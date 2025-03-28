import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const InputData = ({ InputDiv, setInputDiv, updatedData, setUpdatedData }) => {
  const [Data, setData] = useState({ title: "", desc: "" });

  useEffect(() => {
    setData({ title: updatedData.title, desc: updatedData.desc });
  }, [updatedData]);

  // Function to capture voice input and process it
  const startVoiceRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = async (event) => {
      const voiceText = event.results[0][0].transcript;
      console.log("Recognized Text:", voiceText);

      // Send to backend for AI processing
      console.log(voiceText);
      processTaskWithAI(voiceText);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
    };
  };

  // Function to process the extracted text with AI
  const processTaskWithAI = async (taskText) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v3/gemini/process-task",
        { taskText }
      );

      console.log("AI Response:", response.data);

      // Ensure response has expected structure
      if (response.data && response.data.taskDetails) {
        setData((prevData) => ({
          ...prevData,
          title: response.data.taskDetails.title || prevData.title,
          desc: response.data.taskDetails.desc || prevData.desc,
        }));
      } else {
        console.error("Invalid AI response format:", response.data);
      }
    } catch (error) {
      console.error("Error processing task:", error);
    }
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const submitData = async () => {
    if (Data.title.trim() === "" || Data.desc.trim() === "") {
      alert("Please fill all fields");
      return;
    }

    const response = await axios.post(
      "http://localhost:8000/api/v2/create-task",
      Data,
      { headers }
    );
    console.log(response.data.message);
    setData({ title: "", desc: "" });
    setInputDiv("hidden");
  };

  const updateTask = async () => {
    if (Data.title.trim() === "" || Data.desc.trim() === "") {
      alert("Please fill all fields");
      return;
    }

    const response = await axios.put(
      `http://localhost:8000/api/v2/update-task/${updatedData.id}`,
      Data,
      { headers }
    );
    setUpdatedData({ id: "", title: "", desc: "" });
    setData({ title: "", desc: "" });
    console.log(response.data.message);
    setInputDiv("hidden");
  };

  return (
    <>
      <div
        className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}
      ></div>
      <div
        className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}
      >
        <div className="w-2/6 bg-gray-900 p-4 rounded">
          <div className="flex justify-end">
            <button
              onClick={() => {
                setInputDiv("hidden");
                setData({ title: "", desc: "" });
                setUpdatedData({ id: "", title: "", desc: "" });
              }}
              className="text-2xl"
            >
              <RxCross2 />
            </button>
          </div>

          {/* Task Input Fields */}
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 w-full rounded bg-gray-700 my-3"
            value={Data.title}
            onChange={change}
          />
          <textarea
            placeholder="Description"
            name="desc"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            rows="5"
            cols="30"
            value={Data.desc}
            onChange={change}
          ></textarea>

          {/* Buttons for Voice Input & Submit */}
          <div className="flex gap-3">
            <button
              className="px-3 py-2 bg-green-400 rounded text-black text-2xl font-semibold"
              onClick={startVoiceRecognition}
            >
              🎤 Voice Task
            </button>
            {updatedData.id === "" ? (
              <button
                className="px-3 py-2 bg-blue-400 rounded text-black text-2xl font-semibold"
                onClick={submitData}
              >
                Submit
              </button>
            ) : (
              <button
                className="px-3 py-2 bg-blue-400 rounded text-black text-2xl font-semibold"
                onClick={updateTask}
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InputData;
