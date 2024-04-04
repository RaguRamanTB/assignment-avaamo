import filesReducer from "./filesSlice";
import stepReducer from "./stepSlice";
import analyticsReducer from "./analyticsSlice";

const rootReducer = {
  files: filesReducer,
  step: stepReducer,
  analytics: analyticsReducer,
};

export default rootReducer;
