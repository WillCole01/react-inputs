// import { useReducer } from "react";
import InputList from "./InputList";
import { HotKeys } from "react-hotkeys";
// import { withHotKeys } from 'react-hotkeys';
// import InputReducer from "../reducers/InputReducer"; 

const ScrollBox = ({ inputs, changeInput, handleClick, lister}) => {
  
  // handlers={hotKeyHandlers}
  // const hotKeyHandlers = { 
  //   'addInput': handleHotKeys('ADD_INPUT'),//continue to make mods here
  //   'removeInput':handleHotKeys('REMOVE_INPUT'), 
  //   'saveActive':handleHotKeys('SAVE'),
  //   'selectUp':handleHotKeys('SELECT_UP'),
  //   'selectDown':handleHotKeys('SELECT_DOWN'),
  //   'runAllActive':handleHotKeys('RUN_ALL_ACTIVE'),
  //   'runAll':handleHotKeys('RUN_ALL') 
  //  };
  
  return (
      <div className="overflow-auto ScrollBox">
          {/* <HotKeys handlers={hotKeyHandlers} > */}
            <InputList inputs={inputs} changeInput={changeInput} handleClick={handleClick} lister={lister}/>
          {/* </HotKeys> */}
      </div>
  );
};

// export default withHotKeys(ACTION_KEY_MAP)(ScrollBox);
export default ScrollBox;