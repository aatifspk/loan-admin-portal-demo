import layout from "./layout";
import auth from "./api/auth/authSlice"
import profile from "./api/auth/peofileSlice"
import states from "./api/auth/stateSlice"
import branches from "./api/branch/branchSlice"

const rootReducer = {
  layout,
  auth,
  profile,
  states,
  branches
};
export default rootReducer;
