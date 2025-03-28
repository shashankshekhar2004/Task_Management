import React, { useEffect } from "react";
import Home from "./pages/Home";
import AllTask from "./pages/AllTask";
import ImportantTask from "./pages/ImportantTask";
import CompletedTask from "./pages/CompletedTask";
import IncompleteTask from "./pages/IncompleteTask";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/auth";
function App() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  //console.log(isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    }
    if (isLoggedIn === false) {
      navigate("/signup");
    }
  }, []);

  return (
    <>
      <div className="bg-gray-900 text-white h-screen p-2">
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route index element={<AllTask />} />
            <Route path="importantTask" element={<ImportantTask />} />
            <Route path="completedTask" element={<CompletedTask />} />
            <Route path="incompleteTask" element={<IncompleteTask />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
