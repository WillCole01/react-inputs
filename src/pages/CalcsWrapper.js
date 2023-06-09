import Calcs from './Calcs';
import InputReducer from "../reducers/InputReducer"; 
import { useRef, useReducer, useEffect, useState } from 'react';
import {appState} from "../getAppState";
import { HotKeys } from "react-hotkeys";
import {HotKeysPreventDefaults} from '../utils/HotkeysPreventDefaults';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/LocalStorage';

const CalcsWrapper = () => {

  const topInputId = useRef(1);
  const inputs = loadFromLocalStorage('inputs') ?? appState['Calcs']; 
  // const [pageLoad, setPageLoad] = useState(1);
  const [state, dispatch] = useReducer(InputReducer, inputs);

  // useEffect(() => {
  //   saveToLocalStorage('inputs', state);
  // }, [pageLoad]);
  const handlePageUnload = () => {saveToLocalStorage('inputs', state); }
    //setPageLoad(0); 
  useEffect(() => {
    window.addEventListener('unload', handlePageUnload, true)
    return () => {
      // saveToLocalStorage('inputs', state); 
      window.removeEventListener('unload', handlePageUnload, true)
    }
  }, [])

  const hotkeyhandler = HotKeysPreventDefaults({ 
    'addInput': ()  => {   topInputId.current = topInputId.current + 1;  dispatch({type: 'ADD_INPUT', payload: topInputId.current}); },
    'removeInput': () => {  dispatch({type: 'REMOVE_INPUT', payload: topInputId.current}); topInputId.current = topInputId.current - 1; },
    'saveActive': () => { dispatch({type: 'SAVE' }); },
    'clearAll':() => {dispatch({type: 'CLEAR_ALL' }); },
    'selectUp': () => { dispatch({type: 'SELECT_UP' }); }, // selectUp
    'selectDown': () => { dispatch({type: 'SELECT_DOWN', payload: topInputId.current}); },
    'runAllActive': () => { dispatch({type: 'RUN_ALL_ACTIVE' }); },
    'runAll': () => { dispatch({type: 'RUN_ALL' }); } 
   });
  
const hotkeymap = {  'addInput': 'alt+a', 
                     'removeInput': 'alt+x',
                     'saveActive': 'ctrl+s',
                     'clearAll': 'alt+c',
                     'selectUp': 'shift+ArrowUp',
                     'selectDown': 'shift+ArrowDown',
                     'runAllActive': 'shift+e',
                     'runAll': 'ctrl+enter'
                  };
 const changeInput = (input, wording) =>  { dispatch({ type: 'CHANGE_INPUTTEXT', payload: {input:{input}, wording:{wording}}}) };
 const inputActivate = (input) =>  { if(input.id === inputs.origin) 
                                        {dispatch({ type: 'DEACTIVATE_ALL', payload: {input:{input}}});}
                                      else
                                        {dispatch({ type: 'ACTIVATE_UNIQUE', payload: {input:{input}}})}};
  // <Beforeunload onBeforeunload={() => { saveToLocalStorage('inputs', inputs) } } />

  return (
    <HotKeys keyMap={hotkeymap} handlers={hotkeyhandler}>
      <Calcs inputs={state.inputs} changeInput={changeInput} inputActivate={inputActivate}/>
    </HotKeys>
  );
};

export default CalcsWrapper;