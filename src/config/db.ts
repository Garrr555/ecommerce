import axios from "axios";
import Cookies from "js-cookie";

const ApiURI = import.meta.env.VITE_API_URI;

const CustomFetch = axios.create({
  baseURL: ApiURI + "/api",
});

CustomFetch.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default CustomFetch;


// const ApiURI = import.meta.env.VITE_API_URI;
// const Email = import.meta.env.VITE_EMAIL_URI
// const Password = import.meta.env.VITE_PASSWORD_URI;

// const CustomFetch = axios.create({
//   baseURL: ApiURI + "/api",
// });

// CustomFetch.interceptors.request.use((config) => {
//   const token = Cookies.get("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export const autoLogin = async () => {
//   try {
//     const response = await CustomFetch.post("/auth/login", {
//       email: Email,
//       password: Password,
//     });

//     const token = response.data.token;

//     Cookies.set("token", token);

//     return token;
//   } catch (error) {
//     console.error("Auto login gagal:", error);
//   }
// };

// export default CustomFetch;
