import React from "react";
import { useUnload } from "../utils/LocalStorage";

const UnmountCalcs = ({inputs, onUnmount}) => {
  useUnload(onUnmount,inputs);
  return(<>''</>);
};

export default UnmountCalcs;