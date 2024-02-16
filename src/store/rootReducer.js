import layout from "./layout";
import auth from "./api/auth/authSlice"
import profile from "./api/auth/peofileSlice"
import states from "./api/auth/stateSlice"

const rootReducer = {
  layout,
  auth,
  profile,
  states
};
export default rootReducer;
