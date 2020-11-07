import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import LineChart from "../chart/LineChart";
import CanvasJSReact from "../chart/canvasjs.react";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SensorData = () => {
  const { userData, setUserData, fetchData } = useContext(UserContext);

  let sensorData = userData.sensorData || [];
  const topic = userData.actualTopic;

  const data = [];
  const dataChart = sensorData.forEach((single) => {
    if (topic === "temperature") {
      let newData = { x: new Date(single.date), y: single.temp };
      data.push(newData);
    } else if (topic === "humidity") {
      let newData = { x: new Date(single.date), y: single.humidity };
      data.push(newData);
    } else {
      let newData = { x: new Date(single.date), y: single.dogFood };
      data.push(newData);
    }
  });

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    title: {
      text: `${topic}`,
    },
    axisY: {
      title: `${topic}`,
    },
    axisX: {
      title: "Date",
    },
    data: [
      {
        type: "line",
        // toolTipContent: "Week {x}: {y}%",
        dataPoints: data,
      },
    ],
  };

  return (
    <div>
      <button onClick={() => console.log(data)}>data</button>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default SensorData;
