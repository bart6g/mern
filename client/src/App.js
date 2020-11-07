import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/pages/Home";
import Header from "./components/layouts/Header";
import Sensors from "./components/pages/Sensors";
import UserContext from "./context/UserContext";
import SensorData from "./components/layouts/SensorData";
import axios from "axios";
import AddSensor from "./components/layouts/AddSensor";
import config from "config";

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    sensors: undefined,
    sensorData: undefined,
    actualTopic: undefined,
  });

  const fetchData = async (user, token, id) => {
    //funkcja do ogólnego pobierania danych sensorów (potrzeba ja wywołać, gdy usuwa,doda,edytuje się sensor w celu aktualizacji stanu aplikacji REACT)
    console.log(id);
    console.log("user from fetch");
    console.log(user);

    const sensorResponse = await axios({
      method: "get",
      url: `${config.apiUrl}/sensor/`,
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "content-type": "application/json",
      },
      params: {
        userId: id,
      },
    });
    setUserData({
      token: token,
      user: user,
      sensors: sensorResponse.data,
      sensorData: undefined,
      actualTopic: undefined,
    });
  };

  const getDataForOneSensor = async (topic, id, data) => {
    console.log("getdatafunction");
    const { user, token, sensors } = data;
    const dataResponse = await axios({
      method: "get",
      url: `${config.apiUrl}/sensor/data`,
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "content-type": "application/json",
      },
      params: {
        topic: topic,
        sensorId: id,
      },
    });

    if (dataResponse) {
      setUserData({
        token: token,
        user: user,
        sensors: sensors,
        sensorData: dataResponse.data,
        actualTopic: topic,
      });
      console.log(userData);
    }
    console.log("data response");
    console.log(dataResponse);
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");

      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post(
        `${config.apiUrl}/users/tokenIsValid`,
        null,
        { headers: { "x-auth-token": token } }
      );

      if (tokenResponse.data) {
        try {
          const userResponse = await axios.get(`${config.apiUrl}/users`, null, {
            headers: { "x-auth-token": token },
          });

          setUserData({
            token,
            user: userResponse.data,
            sensors: undefined,
            sensorData: undefined,
          });
        } catch (err) {
          console.log(err.message);
        }
      }
    };

    checkLoggedIn();
  }, []);
  return (
    <>
      <BrowserRouter>
        <UserContext.Provider
          value={{ userData, setUserData, fetchData, getDataForOneSensor }}
        >
          <Header />
          <div className="container">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/sensors" exact component={Sensors} />
              <Route path="/sensors/:id" component={SensorData} />
              <Route path="/addsensor" component={AddSensor} />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
