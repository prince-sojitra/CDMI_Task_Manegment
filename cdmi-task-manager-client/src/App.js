import React, { useEffect } from "react";
import Login from "./Components/Pages/LoginPage/Login";
import Register from "./Components/Pages/RegisterPage/Register";
import Alert from "./Components/AlertSnackBar";
import { BrowserRouter, Switch } from "react-router-dom";
import Boards from "./Components/Pages/BoardsPage/Boards";
import ProtectedRoute from "./Utils/ProtectedRoute";
import { loadUser } from "./Services/userService";
import Store from "./Redux/Store";
import FreeRoute from "./Utils/FreeRoute";
import Board from "./Components/Pages/BoardPage/Board";
import './spinner.css'
import { useSelector } from "react-redux";
const App = () => {
  const spinner = useSelector((state) => state.spinner.open)
  useEffect(() => {
    loadUser(Store.dispatch);
  }, []);
  return (
    <BrowserRouter>
      {
        spinner &&
        <div className="spinnerParent">
          <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      }
      <Alert />
      <Switch>
        <ProtectedRoute exact path="/boards" component={Boards} />
        <ProtectedRoute exact path="/board/:id" component={Board} />
        <ProtectedRoute exact path="/register" component={Register} />
        <FreeRoute exact path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
