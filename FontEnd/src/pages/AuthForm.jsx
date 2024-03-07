import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Wrapper from "../assets/stylingWrappers/AuthForm";
import { useParams } from "react-router-dom";

export default function AuthForm() {
  const { page } = useParams();
  const [isFlipped, setIsFlipped] = useState(page === 'register');

  const flip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Wrapper>
      <form className={`auth-form ${isFlipped ? "flipped" : ""}`}>
        <div className="auth-form-content">
          {isFlipped ? <Register flip={flip} /> : <Login flip={flip} />}
        </div>
      </form>
    </Wrapper>
  );
}
