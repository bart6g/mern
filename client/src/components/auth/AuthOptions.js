import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import AddSensor from "../layouts/AddSensor";
import Button from "@material-ui/core/Button";

const AuthOptions = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [opened, setOpened] = useState(false);
  const history = useHistory();

  // const handleOpen = () => {
  //   setOpened(true);
  // };

  const register = () => {
    history.push("/register");
  };

  const login = () => {
    history.push("/login");
  };

  const logOut = () => {
    setUserData({
      token: undefined,
      user: undefined,
      sensors: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  const showSensor = () => {
    history.push("/sensors");
  };

  const routeAdd = () => {
    history.push("/addsensor");
  };
  return (
    <div className="auth-options">
      {userData.user ? (
        <>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => routeAdd()}
          >
            Add Sensor
          </Button>
          <Button variant="contained" color="secondary" onClick={showSensor}>
            My Sensors
          </Button>
          <Button variant="outlined" color="secondary" onClick={logOut}>
            Log Out
          </Button>
          {opened ? <AddSensor setOpened={setOpened} /> : null}
        </>
      ) : (
        <>
          <Button variant="contained" color="secondary" onClick={register}>
            Register
          </Button>
          <Button variant="outlined" color="secondary" onClick={login}>
            Login
          </Button>
        </>
      )}
    </div>
  );
};

export default AuthOptions;
