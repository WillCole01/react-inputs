import Calcs from './Calcs';
import InputReducer from "../reducers/InputReducer"; 
import {useRef, useReducer } from 'react';
import {appState} from "../getAppState";

import { GlobalHotKeys,HotKeys,configure } from "react-hotkeys";
import {HotKeysPreventDefaults} from '../utils/HotkeysPreventDefaults';

// import appState from "../appState";

const CalcsWrapper = () => {
  const topInputId = useRef(1);
  const inputs = appState['Calcs'];
  const [state, dispatch] = useReducer(InputReducer,inputs); // this must happen in the body of a function  

   const inputReducerCall = (actionName) => {
    
    switch (actionName)
    {
      case 'ADD_INPUT':
        const addInput =  () => {  topInputId.current = topInputId.current + 1;  dispatch({type: 'ADD_INPUT', payload: topInputId.current});  };
      break
      case 'REMOVE_INPUT':
        const removeInput =  () => {  dispatch({type: 'REMOVE_INPUT', payload: topInputId.current}); topInputId.current = topInputId.current - 1; };
      break 
      case 'SAVE':
        const saveActive =  () => {  dispatch({type: 'SAVE' }); };
      break
      case 'SELECT_UP':
        const selectUp =  () => {  dispatch({type: 'SELECT_UP' }); };
      break
      case 'SELECT_DOWN':
        const selectDown =  () => {  dispatch({type: 'SELECT_DOWN', payload: topInputId.current}); };
      break
      case 'RUN_ALL_ACTIVE':
        const runAllActive =  () => {  dispatch({type: 'RUN_ALL_ACTIVE' }); };
      break
      case 'RUN_ALL':
        const runAll =  () => {  dispatch({type: 'RUN_ALL' }); };
      break

    }
}
 
  const hotkeyhandler = HotKeysPreventDefaults({ 
    'addInput': ()  => {   topInputId.current = topInputId.current + 1;  dispatch({type: 'ADD_INPUT', payload: topInputId.current}); },
    'removeInput': () => {  dispatch({type: 'REMOVE_INPUT', payload: topInputId.current}); topInputId.current = topInputId.current - 1; },
    'saveActive': () => { dispatch({type: 'SAVE' }); },
    'selectUp': () => { dispatch({type: 'SELECT_UP' }); }, // selectUp
    'selectDown': () => { dispatch({type: 'SELECT_DOWN', payload: topInputId.current}); },
    'runAllActive': () => { dispatch({type: 'RUN_ALL_ACTIVE' }); },
    'runAll': () => { dispatch({type: 'RUN_ALL' }); } 
   });
  
const hotkeymap = {  'addInput': 'alt+a', 
                     'removeInput': 'alt+x',
                     'saveActive': 'ctrl+s',
                     'selectUp': 'ctrl+ArrowUp',
                     'selectDown': 'ctrl+ArrowDown',
                     'runAllActive': 'Shift+e',
                     'runAll': 'ctrl+enter'
                  };
// configure({ignoreKeymapAndHandlerChangesByDefault: false, ignoreTags: []});
 const changeInput = (input, wording) =>  { dispatch({ type: 'CHANGE_INPUTTEXT', payload: {input:{input}, wording:{wording}}}) };
 const inputActivate = (input) =>  {
                                     if(input.id === inputs.origin)
                                       {
                                         dispatch({ type: 'DEACTIVATE_ALL', payload: {input:{input}}});
                                       }
                                       {
                                         dispatch({ type: 'ACTIVATE_UNIQUE', payload: {input:{input}}})
                                       }
                                   };
  return (
    <HotKeys keyMap={hotkeymap} handlers={hotkeyhandler}>
      <Calcs inputs={state.inputs} changeInput={changeInput} inputActivate={inputActivate}/>
    </HotKeys>
  );
};

export default CalcsWrapper;