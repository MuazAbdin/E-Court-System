import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { fetcher } from "../utils/fetcher";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const responseMessage = async (credentialResponse) => {
  const response = await fetcher("/auth/google", {
    method: "POST",
    body: JSON.stringify(credentialResponse),
  });
  const data = await response.json();
};
const errorMessage = () => {
  console.log("Login Failed");
};

function GoogleLoginButton() {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    responseMessage(credentialResponse);
    toast.success("Logged in successfully");
    return navigate("/public");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={errorMessage}
        shape="pill"
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleLoginButton;
