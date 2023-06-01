import "./styles.css";
import {useRef, useReducer, React } from "react"; //useCallback,useState,
import { HotKeys } from "react-hotkeys";
import {Row, Col } from 'react-bootstrap'; //Containers
import appState  from './appState';
import InputReducer from "./reducers/InputReducer"; 
import  {WordParser, Lister} from './utils/CalcAutocompletion.js';

// autocomplete data
import './utils/Globals.js';

// components
import ScrollBox from "./components/ScrollBox";
// import Button from "./components/Button";
import TextArea from "./components/TextArea";
import RunCard from "./components/RunCard";

export default function Calcs() {

  // init app data 
  const RunInformationData = {"Manager":"GSAM", "Product": "Equity Global", "AsAtDate":"2015-01-01"};

  const topInputId = useRef(1);
  const [state, dispatch] = useReducer(InputReducer, appState); // this must happen in the body of a function  

  // hooks
  const inputReducerCall = (actionName) => {
    
    switch (actionName)
    {
      case 'ADD_INPUT':
        const addInput =  () => {  topInputId.current = topInputId.current + 1; dispatch({type: 'ADD_INPUT', payload: topInputId.current}); };
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
  // helper objects
  const w = new WordParser();
  const l = new Lister(w, componentArguments, grammars );
  

  // FUNCTION 1 -> transform inputs to json using helpers
  const jsonEmbed = (input) => {
    let id = input.id;
    let [calculation, calculationString] = input.inputText.split('|');
    let jsonCalc = { calculationOrder : {id},
                      calculation: {calculation},
                      calculationString: {calculationString}
    };
    return jsonCalc;
  }

  // FUNCTION 2 -> Copy active to clipboard 
  const copyAllActive = (id) => {
    let jsonCalcString = inputs.filter(i => (i.isActive === true))
          .map(i => {jsonEmbed(i)}).join(",");
        navigator.clipboard.writeText(jsonCalcString);
    };

  // FUNCTION 3 -> set an input to active on click    
  const handleClick = (input) => {
    const newInputs = [...inputs];
    let active = newInputs.filter(i => (i.id === input.id))[0].isActive;
    
    if (active == true)
    {
      newInputs.filter(i => i.id === input.id)[0].isActive = false;
    }
    else
    {
      newInputs.filter(i => i.id === input.id)[0].isActive = true;
    }

    Object.freeze(newInputs);
    setInputs(newInputs);
  }
  
const ACTION_KEY_MAP = {  addInput: 'ctrl+a',
                          removeInput: 'ctrl+d',
                          saveActive: 'ctrl+s',
                          selectUp: 'ctrl+upArrow',
                          selectDown: 'ctrl+downArrow',
                          runAllActive: 'shift+e',
                          runAll: 'control+enter'};

const hotKeyHandlers = { addInput: inputReducerCall('ADD_INPUT'),//continue to make mods here
                         removeInput:inputReducerCall('REMOVE_INPUT'), 
                         saveActive:inputReducerCall('SAVE'),
                         selectUp:inputReducerCall('SELECT_UP'),
                         selectDown:inputReducerCall('SELECT_DOWN'),
                         runAllActive:inputReducerCall('RUN_ALL_ACTIVE'),
                         runAll:inputReducerCall('RUN_ALL') };
  
  const changeInput = (input, wording) =>  { dispatch({ type: 'CHANGE_INPUTTEXT', payload: {input:{input}, wording:{wording}}})};
  const inputActivate = (input) =>  {
                                      if(input.id = appState.origin)
                                        {
                                          dispatch({ type: 'DEACTIVATE_ALL', payload: {input:{input}}}); 
                                        }
                                        {
                                          dispatch({ type: 'ACTIVATE_UNIQUE', payload: {input:{input}}})
                                        }
                                    };

  return (
    <div className="App">
        <Row>
          <RunCard informationMap={RunInformationData} />
        </Row>
        <Col md={12}>
          <Row className="fluid full" >
            <Col md={9}>
              <HotKeys keyMap={ACTION_KEY_MAP} handlers={hotKeyHandlers}>
                <ScrollBox inputs={appState.inputs} changeInput={changeInput} handleClick={inputActivate} lister={l} topInputId={topInputId} />
              </HotKeys>
            </Col>
      
            <Col md={3}>
                <TextArea className="fluid full"/>
            </Col>
      
          </Row>

        </Col>
    </div>
  );
}
