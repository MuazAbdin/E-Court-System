import Wrapper from "../assets/stylingWrappers/Authentication";
import {
  StyledRegisterForm,
  StyledLoginForm,
} from "../assets/stylingWrappers/StyledAuthForm";
import { LOGIN_FIELDS, REGISTER_FIELDS } from "../utils/constants";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { action as submitAction } from "../utils/submitAction";
import { useEffect, useState } from "react";

function Authentication() {
  const navigate = useNavigate();
  const { userData } = useRouteLoaderData("root");

  useEffect(() => {
    if (userData) {
      ["Lawyer", "Judge"].includes(userData.userType)
        ? navigate("/user")
        : (userData.userType === "Visitor" ? 
          navigate("/public") 
          : navigate("/user/cases/browse"));
    }
  }, []);

  const { page } = useParams();
  const isFlipped = page !== "register";

  const [radioValue, setRadiovalue] = useState("Lawyer");

  const changeSelection = (e) => {
    setRadiovalue(e.target.value);
  };

  return (
    <Wrapper>
      <div className="flip-card auth-forms-container">
        <div
          className={`flip-card-inner form-container ${
            isFlipped ? "flipped" : ""
          }`}
        >
          <StyledRegisterForm
            key="register-form"
            className={`flip-card-front ${!isFlipped ? "active" : ""}`}
            formID="register-form"
            title="sign up"
            method="POST"
            buttonText="submit"
            fields={REGISTER_FIELDS}
          >
            <fieldset className="user-role">
              <legend> As </legend>
              <div className="d-selector">
                <input
                  type="radio"
                  id="lawyer"
                  name="register-form-userType"
                  value="Lawyer"
                  onChange={changeSelection}
                  checked={radioValue === "Lawyer"}
                />
                <label htmlFor="lawyer">lawyer</label>
              </div>
              <div className="d-selector">
                <input
                  type="radio"
                  id="judge"
                  name="register-form-userType"
                  value="Judge"
                  onChange={changeSelection}
                  checked={radioValue === "Judge"}
                />
                <label htmlFor="judge">judge</label>
              </div>
              <div className="d-selector">
                <input
                  type="radio"
                  id="court"
                  name="register-form-userType"
                  value="Court Manager"
                  onChange={changeSelection}
                  checked={radioValue === "Court Manager"}
                />
                <label htmlFor="court">Court Manager</label>
              </div>
              <div className="d-selector">
                <input
                  type="radio"
                  id="admin"
                  name="register-form-userType"
                  value="Admin"
                  onChange={changeSelection}
                  checked={radioValue === "Admin"}
                />
                <label htmlFor="admin">Admin</label>
              </div>
            </fieldset>
            <div
              className="switch-form"
              // onClick={() => setIsFlipped(!isFlipped)}
              onClick={() => navigate("/auth/login")}
            >
              Already have an account?
            </div>
            <section className="google-auth">
              <div className="separator-text"> Sign in as a vistor </div>
              <GoogleLoginButton />
            </section>
          </StyledRegisterForm>

          <StyledLoginForm
            key="login-form"
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
              <div className="separator-text"> Sign in as a vistor </div>
              <GoogleLoginButton />
            </section>
          </StyledLoginForm>
        </div>
      </div>
    </Wrapper>
  );
}

export default Authentication;

export async function action({ params, request }) {
  return submitAction({ params, request });
}
