import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../other/ErrorNotice";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(`${config.apiUrl}/login/`, loginUser);

      localStorage.setItem("auth-token", loginRes.data.token);
      const sensorResponse = await Axios({
        method: "get",
        url: `${config.apiUrl}/sensor/`,
        headers: {
          "x-auth-token": localStorage.getItem("auth-token"),
          "content-type": "application/json",
        },
        params: {
          userId: loginRes.data.user.id,
        },
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
        sensors: sensorResponse.data,
        sensorData: undefined,
        actualTopic: undefined,
      });
      history.push("/");
    } catch (err) {
      // console.log(err)
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="page">
      <h2>Log in</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        {/* <input
          id="login-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        /> */}
        <TextField
          id="standard-basic"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          id="standard-basic"
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          className="login"
        >
          Log in
        </Button>
      </form>
    </div>
  );
};

export default Login;
