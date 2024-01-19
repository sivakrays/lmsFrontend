import { post } from "../../ApiCall/ApiCall";
import { jwtDecode } from "jwt-decode";

export const checkAndRefreshToken = async (token) => {
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    console.log("Token expired");
    const data = {};
    const refreshToken = JSON.parse(localStorage.getItem("refresh token"));
    const config = {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    };

    try {
      const res = await post("auth/refreshToken", data, config);
      console.log(res.data.token);
      const refreshedToken = res.data.token;
      localStorage.setItem("token", JSON.stringify(refreshedToken));
      return refreshedToken;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  return token;
};
