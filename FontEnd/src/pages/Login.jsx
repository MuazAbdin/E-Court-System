import { FaFacebookF, FaGooglePlusG } from "react-icons/fa6";
import Wrapper from "../assets/stylingWrappers/Login";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const flip = () => {
    setIsFlipped(!isFlipped)
  }
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Wrapper>
      <form className={`login-form ${isFlipped ? "flipped" : ""}`}>
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

        <p>use your account</p>
        <div className="account">
          <TextField
            label="Email"
            variant="outlined"
            title="email address"
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
                    onClick={handleTogglePasswordVisibility}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <button>SIGN IN</button>
        <p>
          Don't have an account?
          <Link className="signUpLink" to="/register" onClick={flip}>
            {" "}
            Sign Up
          </Link>
        </p>
      </form>
    </Wrapper>
  );
}
