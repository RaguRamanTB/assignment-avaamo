import filesReducer from "./filesSlice";
import stepReducer from "./stepSlice";

const rootReducer = {
  files: filesReducer,
  step: stepReducer,
};

export default rootReducer;
