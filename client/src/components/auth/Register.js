import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ErrorNotice from "../other/ErrorNotice";
import UserContext from "../../context/UserContext";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();
  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        email,
        password,
        passwordCheck,
        displayName,
      };
      await axios.post(`${config.apiUrl}/users/register`, newUser);
      const loginRes = await axios.post(`${config.apiUrl}/users/login`, {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      console.log(err.response.data.msg);
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div className="page">
      <h2>Register</h2>
      {error && <ErrorNotice message={error} clearError={() => setError("")} />}
      <form className="form" onSubmit={submit}>
        <TextField
          id="standard-basic"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          id="standard-basic"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Verify password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Display name"
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          className="login"
        >
          Register
        </Button>

        {/* <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Verify password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <input
          id="register-display-name"
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <input type="submit" value="Register" /> */}
      </form>
    </div>
  );
};

export default Register;
