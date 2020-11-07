import React, { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import SensorBox from "../layouts/SensorBox";
import axios from "axios";

const Sensors = () => {
  const { userData, setUserData } = useContext(UserContext);
  const { token, user, sensors } = userData;

  return (
    <div className="sensors-container">
      {sensors !== undefined
        ? sensors.map((sensor) => (
            <SensorBox
              name={sensor.name}
              topic={sensor.topic}
              key={sensor._id}
              id={sensor._id}
            />
          ))
        : null}
    </div>
  );
};

export default Sensors;
