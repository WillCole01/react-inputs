// import { useReducer } from "react";
import InputList from "./InputList";
// import { withHotKeys } from 'react-hotkeys';
// import InputReducer from "../reducers/InputReducer"; 

const ScrollBox = ({ inputs, changeInput, handleClick, lister}) => {
  
  
  return (
    <div className="overflow-auto ScrollBox">
        <InputList inputs={inputs} changeInput={changeInput} handleClick={handleClick} lister={lister}/>
    </div>
  );
};

// export default withHotKeys(ACTION_KEY_MAP)(ScrollBox);
export default ScrollBox;