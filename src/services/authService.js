import axios from "axios";
import { authHeader } from "./auth-headers";



const Login = async (data) => {

  console.log("33");

  return await axios
    .post("http://localhost:8080/api/admin/signIn", data)
    .then((response) => {
      //   if ( response.data.userInfo.token && response.data.userInfo.isActive === 1) {

      //     if ( !rememberMe ) {
      //       response.data.userInfo.expiry = new Date().getTime() + 1000 * 60 * 30;
      //     }

      //     const userObj = 
      //     { 
      //       id: response.data?.userInfo?.id,
      //       roleId: response.data?.userInfo?.roleId,
      //       firstName: response.data?.userInfo?.firstName,
      //       lastName: response.data?.userInfo?.lastName,
      //       email: response.data?.userInfo?.email,
      //       profileImage: response.data?.userInfo?.profileImage,
      //       expiry: response.data?.userInfo?.expiry,
      //       token: response.data?.userInfo?.token,
      //     }

      //     localStorage.setItem("_stl",JSON.stringify(userObj))
      //   }

      return response;
    });
};

const OtpSignIn = async (data) => {
  try {
    const response = await axios.post("http://localhost:8080/api/admin/signInByOtp", data);
    console.log("res of OTP login", response);
    return response;
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with a status code
      console.log("error response:", error.response.data);
      // Show a warning toast with the error message
      return Promise.reject(error.response.data.message);
    } else if (error.request) {
      // The request was made but no response was received
      console.log("error request:", error.request);
      // Show a warning toast indicating a network issue
      return Promise.reject("Network error. Please try again.");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("error:", error.message);
      // Show a warning toast with a generic error message
      return Promise.reject("An error occurred. Please try again later.");
    }
  }
};



const getProfile = async (id) => {

  console.log("idddd",id);
   const a =  authHeader() ;
   console.log("aaa",a);
  return await axios.get(`http://localhost:8080/api/admin/getAdminProfile/${id}`, {
    headers: authHeader(),
  });
};


const updateProfile = async (data) => {
  const headers = authHeader();

  try {
    const response = await axios.post(
      'http://localhost:8080/api/admin/adminProfile',
      data, // Pass the data as the second parameter
      {
        headers: headers,
      }
    );

    console.log(response.data); // Assuming you want to log the response data

    return response.data; // Assuming you want to return the response data
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error; // Re-throw the error to be handled by the calling code
  }
  
};



// const logout = () => {
//   localStorage.removeItem("_stl");
//   <Navigate to="/login" />;
// };

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { Login, OtpSignIn, getProfile, updateProfile };
