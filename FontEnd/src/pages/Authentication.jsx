import { useState } from "react";
import Wrapper from "../assets/stylingWrappers/Authentication";
import {
  StyledRegisterForm,
  StyledLoginForm,
} from "../assets/stylingWrappers/StyledAuthForm";
import { LOGIN_FIELDS, REGISTER_FIELDS } from "../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton";

function Authentication() {
  const { page } = useParams();
  const navigate = useNavigate();
  // const [isFlipped, setIsFlipped] = useState(page === "register");
  const isFlipped = page !== "register";

  return (
    <Wrapper>
      <div className="flip-card auth-forms-container">
        <div
          className={`flip-card-inner form-container ${
            isFlipped ? "flipped" : ""
          }`}
        >
          <StyledRegisterForm
            className={`flip-card-front ${!isFlipped ? "active" : ""}`}
            formID="register-form"
            title="sign up"
            method="POST"
            buttonText="submit"
            fields={REGISTER_FIELDS}
          >
            <div
              className="switch-form"
              // onClick={() => setIsFlipped(!isFlipped)}
              onClick={() => navigate("/auth/login")}
            >
              Already have an account?
            </div>
            <section className="google-auth">
              <div className="separator-text"> OR </div>
              <GoogleLoginButton />
            </section>
          </StyledRegisterForm>

          <StyledLoginForm
            className={`flip-card-back ${isFlipped ? "active" : ""}`}
            formID="login-form"
            title="sign in"
            method="POST"
            buttonText="submit"
            fields={LOGIN_FIELDS}
          >
            <div
              className="switch-form"
              // onClick={() => setIsFlipped(!isFlipped)}
              onClick={() => navigate("/auth/register")}
            >
              Don't have an account?
            </div>
            <section className="google-auth">
              <div className="separator-text"> OR </div>
              <GoogleLoginButton />
            </section>
          </StyledLoginForm>
        </div>
      </div>
    </Wrapper>
  );
}

export default Authentication;
