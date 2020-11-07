import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  btn: {
    width: "150px",
    height: "32px",
  },
});

const SensorBox = ({ name, topic, id }) => {
  const { userData, setUserData, fetchData, getDataForOneSensor } = useContext(
    UserContext
  );
  const history = useHistory();
  const { token, user } = userData;
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const handleDelete = async (user, token, id) => {
    const deleteResponse = await axios({
      method: "post",
      url: `${config.apiUrl}/sensor/delete`,
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "content-type": "application/json",
      },
      params: {
        id: id,
      },
    });
    //pobieranie nowych danych i aktualizacja stanu
    fetchData(user, token, user.id);
  };

  const showData = (userData, topic, id) => {
    getDataForOneSensor(topic, id, userData);
    history.push(`/sensors/${id}`);
  };

  return (
    <>
      {/* <div className="sensor-box" key={id}>
        <h1>{name}</h1>
        <p>{topic}</p>

        <div className="btns">
          <button onClick={() => handleDelete(user, token, id)}>Usuń</button>
          <button onClick={() => showData(userData, topic, id)}>
            Show Data
          </button>
        </div>
      </div> */}

      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="h5" component="h2">
            {topic}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            className={classes.btn}
            onClick={() => handleDelete(user, token, id)}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            className={classes.btn}
            onClick={() => showData(userData, topic, id)}
          >
            Plot
          </Button>
          <button
            onClick={() => {
              console.log(userData);
              console.log(topic);
            }}
          >
            data
          </button>
        </CardActions>
      </Card>
    </>
  );
};

export default SensorBox;
