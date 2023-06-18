import Calcs from './Calcs';
import InputReducer from "../reducers/InputReducer"; 
import { useRef, useReducer, useEffect, useState } from 'react';
import { HotKeys } from "react-hotkeys";
import UnmountCalcs from '../components/UnmountCalcs'
import {HotKeysPreventDefaults} from '../utils/HotkeysPreventDefaults';
import { saveToLocalStorage, loadFromLocalStorage} from '../utils/LocalStorage';
import appState from "../getAppState" ;
import  partial from 'lodash/partial';


const CalcsWrapper = () => {

  const inputs = loadFromLocalStorage('Calcs') ?? appState['Calcs'];
  const topInputId = useRef((inputs.length + 1) ?? 0);
  const [state, dispatch] = useReducer(InputReducer, inputs);

  const hotkeyhandler = HotKeysPreventDefaults({
                                                'addInput': ()  => {   topInputId.current = topInputId.current + 1;  dispatch({type: 'ADD_INPUT', payload: topInputId.current}); },
                                                'removeInput': () => {  dispatch({type: 'REMOVE_INPUT', payload: topInputId.current}); topInputId.current = topInputId.current - 1; },
                                                'quickSave': () => { dispatch({type: 'SAVE' }); },
                                                'clearAll':() => {topInputId.current = 1; dispatch({type: 'CLEAR_ALL' }); },
                                                'selectUp': () => { dispatch({type: 'SELECT_UP' }); }, // selectUp
                                                'selectDown': () => { dispatch({type: 'SELECT_DOWN', payload: topInputId.current}); },
                                                'runAllActive': () => { dispatch({type: 'RUN_ALL_ACTIVE' }); },
                                                'runAll': () => { dispatch({type: 'RUN_ALL' }); } });
  
  const hotkeymap = {'addInput': 'alt+a', 
                    'removeInput': 'alt+x',
                    'quickSave': 'ctrl+s',
                    'saveToProfile':'ctrl+Shift+s',
                    'clearAll': 'alt+c',
                    'selectUp': 'shift+ArrowUp',
                    'selectDown': 'shift+ArrowDown',
                    'runAllActive': 'shift+e',
                    'runAll': 'ctrl+enter'};
  
 const changeInput = (input, wording) => { dispatch({ type: 'CHANGE_INPUTTEXT', payload: {input:{input}, wording:{wording}}}) };
 const inputActivate = (input) =>  { if  (input.id === state.inputs.origin && state.inputs.filter(x => x.isActive === true).length === 1)
                                          {dispatch({ type: 'DEACTIVATE_ALL', payload: {input:{input}}}); } 
                                     else 
                                          {dispatch({ type: 'ACTIVATE_UNIQUE', payload: {input:{input}}})}};
  return (
    <HotKeys keyMap={hotkeymap} handlers={hotkeyhandler}>
        <Calcs inputs={state.inputs} changeInput={changeInput} inputActivate={inputActivate} />
    </HotKeys>
  );
};

export default CalcsWrapper;