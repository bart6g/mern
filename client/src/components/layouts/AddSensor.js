import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import axios from "axios";
import { useHistory } from "react-router-dom";
const AddSensor = ({ setOpened }) => {
  const { userData, setUserData, fetchData } = useContext(UserContext);
  const { token, user } = userData;
  const { id } = user;
  const history = useHistory();
  //new Sensor properties
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("temperature");

  const handleTopic = (e) => {
    setTopic(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSensor = {
      userId: id,
      name,
      topic,
    };

    const sensorResponse = await axios.post(
      `${config.apiUrl}/sensor/add`,
      newSensor,
      { headers: { "x-auth-token": localStorage.getItem("auth-token") } }
    );

    fetchData(user, token, id);
    history.push("/sensors");
    console.log("works");
    console.log(sensorResponse);
  };

  return (
    <>
      {/* <div className="sensor-form">
      <button onClick={handleClose}>X</button>
      <button onClick={() => console.log(id)}>user</button>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="login-email">Sensor Name</label>
        <input
          id="login-email"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select name="topic" id="topic" onChange={(e)=>handleTopic(e)}>
          <option value="temperature">Temperature</option>
          <option value="humidity">Humidity</option>
          <option value="dogfood">Dog Food</option>
        </select>

        <input type="submit" value="Submit" />
      </form>
    </div> */}

      <Card styles={{ height: "400px" }}>
        <form className="form" onSubmit={handleSubmit}>
          <TextField
            id="standard-basic"
            label="SensorName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Select
            native
            value={topic}
            onChange={handleTopic}
            inputProps={{
              name: "age",
              id: "age-native-simple",
            }}
          >
            <option aria-label="None" value="" />
            <option value={"temperature"}>Temperature</option>
            <option value={"humidity"}>Humidity</option>
            <option value={"dogFood"}>Dog Food</option>
          </Select>

          <Button
            variant="contained"
            color="secondary"
            type="submit"
            className="login"
          >
            Add sensor
          </Button>
        </form>
      </Card>
    </>
  );
};

export default AddSensor;
