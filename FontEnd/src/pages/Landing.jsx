import { Link } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/Landing";
import { Logo } from "../components";

function Landing() {
  return (
    <Wrapper>
      <section className="welcome">
        <h3 className="title">
          <span>Welcome to</span>
          <Logo />
        </h3>
        <p>
          We're delighted to have you here. Feel free to explore our services
          and manage your cases conveniently. If you have any questions or need
          assistance, don't hesitate to reach out to our support team. Thank you
          for choosing us for your legal needs!
        </p>
        <p className="auth-message">Sign in to manage your accounts.</p>
        <p className="auth-message">
          Don't have an account? Register to open one!
        </p>
        <div className="btn-group">
          <Link to="auth/register">
            <button className="btn register-btn">register</button>
          </Link>
          <Link to="auth/login">
            <button className="btn login-btn">login</button>
          </Link>
        </div>
      </section>
    </Wrapper>
  );
}

export default Landing;
