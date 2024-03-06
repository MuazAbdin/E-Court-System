import { FaFacebookF, FaGooglePlusG } from "react-icons/fa6";
import Wrapper from "../assets/stylingWrappers/Login";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Login(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  useEffect(() => {
    setRememberMe(localStorage.rememberMe === "true");
    if (localStorage.rememberMe === "true") {
      setEmail(localStorage.email);
    }
  }, []);

  const rememberLogin = () => {
    localStorage.setItem("rememberMe", rememberMe);
    if (rememberMe) {
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("email");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    rememberLogin();
  };
  return (
    <Wrapper>
      <form>
        <h2>Sign In</h2>
        <div className="social-container">
          <div className="social">
            <FaGooglePlusG />
          </div>
          <div className="social">
            <FaFacebookF />
          </div>
        </div>

        <div className="or">
          <span className="line-before"></span>
          or
          <span className="line-after"></span>
        </div>

        <p>Use your account</p>
        <div className="account">
          <TextField
            label="Email"
            variant="outlined"
            title="email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            title="password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    style={{
                      backgroundColor: "transparent",
                      marginLeft: "5vw",
                    }}
                    onClick={handlePassword}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="remember-me">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleRememberMe}
          />
          <label className="remember">Remember Me</label>
        </div>

        <button onClick={handleLogin}>SIGN IN</button>
        <p>
          Don't have an account?
          <span className="signUpLink" onClick={props.flip}>
            {" "}
            Sign Up
          </span>
        </p>
      </form>
    </Wrapper>
  );
}
