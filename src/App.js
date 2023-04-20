import "./styles.css";
import {useRef, useReducer, React } from "react";
import {Row, Col, Container} from 'react-bootstrap';
import InputReducer from "./reducers/InputListReducer"; 

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
  const appState = {inputs:[{ id: 1, inputText: "", isActive:false }]};
  const RunInformationData = {"Manager":"GSAM", "Product": "Equity Global", "AsAtDate":"2015-01-01"};

  // hooks
  const id = useRef(1);
  const [state, dispatch] = useReducer(InputReducer, appState);

  // helper objects
  const w = new WordParser();
  const l = new Lister(w, componentArguments, grammars );

  // component functions (tba 'input' context)  
  const addInput      =  () => { id.current = id.current + 1;  dispatch({type: 'ADD_INPUT', payload: id});}
  const removeInput   = function () { id.current = id.current - 1; dispatch({type: 'REMOVE_INPUT', payload: id})} 
  const changeInput   = (input, wording) => 
                      ( 
                        dispatch({ type: 'CHANGE_INPUT', payload: {input:{input}, wording:{wording}}}) 
                      );

  // tba -> added login context for users (backed by auth api)

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
  const copyAllActive = () => {
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
              <ScrollBox inputs={state.inputs} changeInput={changeInput} handleClick={handleClick} lister={l} />
              <div>
                <section className="Buttons">
                  <Button buttonText="Add Calc" handleCLick={addInput} />
                  <Button buttonText="Remove Calc" handleCLick={removeInput} />
                  <Button buttonText="Copy Calc" handleCLick={copyAllActive} />
                  <Button buttonText="Run all steps" handleCLick={null} />
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
