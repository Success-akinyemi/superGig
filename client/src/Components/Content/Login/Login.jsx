import "./Login.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../helpers/helpers";
import LoadingBtn from "../../Helpers/LoadingBtn/LoadingBtn";

function Login({ isActive }) {
  const [email, setEmail] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const myLogPassword = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Email Required");
    }

    if (!password) {
      setPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Password Required");
    }

    try {
      setIsLoading(true);
      const res = await loginUser({ email, password });
      console.log("RES>>", res);
      if (!res?.data.isVerified) {
        console.log(res.data.isVerified)
        navigate("/VerificationEmailSent", {
          state: { resMsg: res?.data.data },
        });
      } else {
        await localStorage.setItem("authToken", res?.data.token);
        navigate("/home");
        window.location.reload()
      }
    } catch (errorMsg) {
      console.log("ERROR REGISTEREING USER:", errorMsg);
      const errorM =
        errorMsg.response?.data?.data ||
        "An error occurred during the request.";
      console.log("ER", errorM);
      setError(errorM);
      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className={`box-login ${isActive ? "show" : "hide"}`}
      id="login"
      onSubmit={handleLogin}
    >
      <div className="top-header">
        <h3>Hello, Again</h3>
        <small>Continue Earning</small>
      </div>

      <div className="input-group">
        <div className="input-field">
          <input
            type="email"
            id="logEmail"
            className="input-box"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="logEmail">Email Address</label>
        </div>

        <div className="input-field">
          <input
            id="logPassword"
            className="input-box"
            required
            value={password}
            onChange={handlePasswordChange}
            type={passwordVisible ? "text" : "password"}
          />
          <label htmlFor="logPassword">Password</label>
          <div className="eye-area">
            <div className="eye-box" onClick={myLogPassword}>
              {passwordVisible ? (
                <i id="eye-slash">
                  <VisibilityOffIcon />
                </i>
              ) : (
                <i id="eye">
                  <VisibilityIcon />
                </i>
              )}
            </div>
          </div>
        </div>
        <div className="remember">
          <input type="checkbox" id="formCheck" className="check" />
          <label htmlFor="formCheck">Remember Me</label>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="input-field">
          {isLoading ? (
            <LoadingBtn btnText={"Checking..."} />
          ) : (
            <input type="submit" className="input-submit" value="Submit" />
          )}
        </div>
        <div className="forgot">
          <Link className="link" to="/forgotPassword">
            Forgot Password
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Login;
