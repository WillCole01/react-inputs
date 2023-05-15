import "./styles.css";
import {useRef, useReducer, useCallback, useEffect, useState, React } from "react";
import {Row, Col, Container} from 'react-bootstrap';
import InputReducer from "./reducers/InputReducer"; 

// js class helpers -> autocomplete and translations
import  {WordParser, Lister} from './utils/CalcAutocompletion.js';

// autocomplete data
import './utils/Globals.js';

// components
import ScrollBox from "./components/ScrollBox";
import BtsNavbar from './components/BtsNavbar';
import Button from "./components/Button";
import TextArea from "./components/TextArea";
import RunCard from "./components/RunCard";

export default function App() {

  // init app data 
  const RunInformationData = {"Manager":"GSAM", "Product": "Equity Global", "AsAtDate":"2015-01-01"};
  const [ctrlKey, setCtrlKey] = useState(false);
  const [shiftKey, setShiftKey] = useState(false);

  const appState = {shiftKeyActive:false,
                    ctrltKeyActive:false,
                    activatedOrder:{currentIndex:0,lastIndex:0},
                    inputs:[{ id: 1, inputText: "", isActive:false }]};
  const [state, dispatch] = useReducer(InputReducer, appState);

  // hooks
  const topInputId = useRef(1);

  // helper objects
  const w = new WordParser();
  const l = new Lister(w, componentArguments, grammars );

  // tracking key presses for keyboard shortcuts
  const handleKeyPress = useCallback((event) => {
    if(event.key === 'Shift')
    { console.log("shift is true");
      setShiftKey(true); }else if(event.key === 'Control')
        { console.log("ctrl is true");
        setCtrlKey(true)
      }
    else if (event.key === 'a' && ctrlKey === true) {
      console.log("shift and a are true");
      changeInputActivateAll();
    }
  }, []);

  const handleKeyUp = useCallback((event) => {
    if(event.key === 'Shift'){ 
      console.log("shift is false");
      setShiftKey(false); }else if(event.key === 'Control') 
      { 
        console.log("ctrl is false");
        setCtrlKey(false); }
  }, []);

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    return () => { document.removeEventListener('keyup', handleKeyUp); };
  }, [handleKeyUp]);

  useEffect(() => { 
    document.addEventListener('keydown', handleKeyPress);
    return () => { document.removeEventListener('keydown', handleKeyPress); };
  }, [handleKeyPress]);


  // tba -> added login context for users (backed by auth api)
  // component functions (tba 'input' context)  
  const addInput =  () => {  topInputId.current = topInputId.current + 1; dispatch({type: 'ADD_INPUT', payload: topInputId.current}); };

  const removeInput =  () => {  dispatch({type: 'REMOVE_INPUT', payload: topInputId.current}); topInputId.current = topInputId.current - 1; };

  const changeInput = (input, wording) =>  { dispatch({ type: 'CHANGE_INPUTTEXT', payload: {input:{input}, wording:{wording}}})};
  
  const changeInputActivate = (input) =>  { if(input.isActive === true)
                                              {dispatch({ type: 'DEACTIVATE_INPUT', payload: {input:{input}}})} 
                                              else{dispatch({ type: 'ACTIVATE_INPUT', payload: {input:{input}}})} };

  const changeInputActivateMultiple = (input) =>  { if(input.isActive === true) // add ctrl + a keyboard shortcut to select all inputs
                                              {dispatch({ type: 'DEACTIVATE_MULTIPLEINPUTS', payload: {input:{input}}})} 
                                              else{dispatch({ type: 'ACTIVATE_MULTIPLEINPUTS', payload: {input:{input}}})} 
                                            };
  
  const changeInputActivateAll = () =>  { {dispatch({ type: 'ACTIVATE_ALLINPUTS'})}};

  const changeInputActivateSingle = (input) =>  { if(input.isActive === true)
                                              {dispatch({ type: 'DEACTIVATE_SINGLEINPUT', payload: {input:{input}}})}
                                              else{dispatch({ type: 'ACTIVATE_SINGLEINPUT', payload: {input:{input}}})} 
                                            };
  
  const inputActivate = (input) => {
    if(shiftKey === true)
    {
      changeInputActivateMultiple(input);
    }
    if(ctrlKey === true)
    {
      changeInputActivate(input);
    }
    else
    {
      changeInputActivateSingle(input);
    }
  }

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

  return (
    <div className="App">
    <Container>
        <Row>
          <BtsNavbar /> 
        </Row>
        <Row>
          <RunCard informationMap={RunInformationData} />
        </Row>
        <Col md={12}>
          
          <Row className="fluid full" >
      
            <Col md={9}>
              <ScrollBox inputs={state.inputs} changeInput={changeInput} handleClick={inputActivate} lister={l} />
              <div>
                <section className="Buttons">
                  <Button buttonText="Add Calc" handleCLick={addInput}/>
                  <Button buttonText="Remove Calc" handleCLick={removeInput}/>
                  <Button buttonText="Copy Calc" handleCLick={copyAllActive}/>
                  {/* <Button buttonText="Run all steps" handleCLick={null} id={id.current} /> */}
                </section>
              </div>
            </Col>
      
            <Col md={3}>
                <TextArea className="fluid full"/>
            </Col>
      
          </Row>

        </Col>
    </Container>
    </div>
  );
}
