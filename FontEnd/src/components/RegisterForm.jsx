import { IconButton, InputAdornment, TextField } from "@mui/material";
import Wrapper from "../assets/stylingWrappers/RegisterForm";
import { FaFacebookF, FaGooglePlusG } from "react-icons/fa6";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function Register({ className, ...props }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fields = [
      { name: "First Name", value: firstName },
      { name: "Last Name", value: lastName },
      { name: "Password", value: password },
      { name: "Confirm Password", value: confirmPassword },
      { name: "Card Number", value: cardNumber },
      { name: "Email", value: email },
      { name: "Phone", value: phone },
      { name: "City", value: city },
      { name: "Street Address", value: streetAddress },
    ];

    for (const field of fields) {
      if (!field.value) {
        toast.error(`${field.name} cannot be empty!`);
        return;
      }

      if (field.name === "Email" && !field.value.match(emailRegex)) {
        toast.error("Invalid email format!");
        return;
      }

      if (
        (field.name === "Phone" && isNaN(field.value)) ||
        (field.name === "Card Number" && isNaN(field.value))
      ) {
        toast.error(`${field.name} must be a number!`);
        return;
      }

      if (
        field.name === "Password" &&
        field.value &&
        (field.value.length < 8 ||
          !field.value.match(/[a-zA-Z]/) ||
          !field.value.match(/\d/))
      ) {
        toast.error(
          `Invalid input for ${field.name}, Password must be at least 8 characters AND contain both letters and numbers!`
        );
        return;
      }

      if (field.name === "Card Number" && field.value.length !== 16) {
        toast.error("Card Number must be 16 digits long!");
        return;
      }

      if (field.name === "City" && !field.value.match(/[a-zA-Z]/)) {
        toast.error("City name must contain ONLY letters!");
        return;
      }
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Registration Successful!",
      html: "<p>Congratulation! Your account has been successfully created. Welcome aboard!</p>",
      showConfirmButton: false,
      timer: 3500,
    });
  };

  const USER_TYPES = ["judge", "lawyer", "visitor"];
  const [userType, setUserType] = useState("judge");

  return (
    <Wrapper>
      <menu className="register-form-navigator">
        {USER_TYPES.map((t) => (
          <li key={t} onClick={() => setUserType(t)}>
            {t}
          </li>
        ))}
        <li></li>
      </menu>
      <form action="">
        <h3 className="title">sign up</h3>
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

        <div className="account-info">
          <p>Enter your personal details for registration</p>
          <div className="full-name">
            <TextField
              label="First Name"
              variant="outlined"
              title="first name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              title="last name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="password-container">
            <TextField
              label="Password"
              variant="outlined"
              title="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton className="eye-icon" onClick={handlePassword}>
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              title="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showConfirmPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      className="eye-icon"
                      onClick={handleConfirmPassword}
                    >
                      {showConfirmPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <TextField
            label="Card Number"
            variant="outlined"
            title="card number"
            onChange={(e) => setCardNumber(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CreditCardIcon />
                </InputAdornment>
              ),
            }}
          />
          <div className="contact-container">
            <TextField
              label="Email"
              variant="outlined"
              title="email address"
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Phone"
              variant="outlined"
              title="phone number"
              onChange={(e) => setPhone(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="address-container">
            <TextField
              label="City"
              variant="outlined"
              title="city"
              onChange={(e) => setCity(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LocationCityIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Street Address"
              variant="outlined"
              title="street address"
              onChange={(e) => setStreetAddress(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LocationOnIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <button onClick={handleSubmit}>SIGN UP</button>
        <p>
          Already have an account?
          <span className="signUpLink" onClick={props.flip}>
            {" "}
            Sign In{" "}
          </span>
        </p>
        <Toaster position="bottom-center" />
      </form>
    </Wrapper>
  );
}
