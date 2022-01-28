import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { communityReducer } from "./communityReducer";


const rootReducer = combineReducers({
  user: userReducer,
  community: communityReducer
});

export default rootReducer;
