import axios from "axios";
import { authHeader } from "./auth-headers";





const getUnDeletedBranchsList = async ( keyword = '', page = '', perPage = '', all = true, active = true) => {

  return await axios.get("http://localhost:8080/api/admin/getBranchsList", {
    headers: authHeader(),
    data: {},
    params: {
      keyword: keyword,
      page: page,
      perPage: perPage,
      all,
      active
    },
  });

 
};



// const logout = () => {
//   localStorage.removeItem("_stl");
//   <Navigate to="/login" />;
// };

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {getUnDeletedBranchsList };
