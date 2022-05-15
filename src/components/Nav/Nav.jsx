import { useState } from "react";
import GoogleLogin from "react-google-login";

export default function Nav() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  const handleLogin = async (googleData) => {
    console.log(googleData);
    const response = await fetch("/api/google-login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
        name: googleData.Lu.iY,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    console.log(data);
    setLoginData(data);
    localStorage.setItem("loginData", JSON.stringify(data));
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  const handleFailure = (result) => {
    alert(result);
  };
  return (
    <nav>
      {loginData ? (
        <>
          <p>Welcome {loginData.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
        ></GoogleLogin>
      )}
    </nav>
  );
}
