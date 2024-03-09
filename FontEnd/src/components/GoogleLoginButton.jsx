import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { fetcher } from "../utils/fetcher";

const responseMessage = async (credentialResponse) => {
  console.log(credentialResponse);
  const response = await fetcher("/v1/auth/google", {
    method: "POST",
    body: JSON.stringify(credentialResponse),
  });
  const data = await response.json();
  console.log(data);
};
const errorMessage = () => {
  console.log("Login Failed");
};

function GoogleLoginButton() {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={responseMessage}
        onError={errorMessage}
        shape="pill"
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleLoginButton;
