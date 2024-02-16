import axios from "axios";
import { authHeader } from "./auth-headers";





const getCityList = async (code) => {

  return await axios.get(`http://localhost:8080/api/getCities/${code}`);

 
};


export default {getCityList };
