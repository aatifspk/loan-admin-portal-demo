import axios from "axios";
import { authHeader } from "./auth-headers";





const getStateList = async ( ) => {

  return await axios.get("http://localhost:8080/api/getStates");

 
};



// const logout = () => {
//   localStorage.removeItem("_stl");
//   <Navigate to="/login" />;
// };

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {getStateList };
