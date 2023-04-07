import "./styles.css";
import ScrollBox from "./components/ScrollBox";
import {Row, Col, Container} from 'react-bootstrap';
import BtsNavbar from './components/BtsNavbar';
import { useState, useReducer, React } from "react";
import Button from "./components/Button";
import TextArea from "./components/TextArea";
import RunCard from "./components/RunCard";
import InputReducer from "./reducers/InputListReducer"; 

// autocomplete and translation helpers
import  {WordParser,Lister} from './utils/CalcAutocompletion.js';
import './utils/Globals.js';


export default function App() {

  const inputs_state = [{ id: 1, inputText: "", isActive:false }];
  const RunInformationData = {"Manager":"GSAM", "Product": "Equity Global", "AsAtDate":"2015-01-01"};
  const [id, setId] = useState(3);
  
  const [state, dispatch] = useReducer(InputReducer, inputs_state);

  const addInput      = input => ( dispatch({type: 'SET_NEW_INPUT_VALUE', payload: input}) );
  const removeInput   = input => ( dispatch({ type: 'REMOVE_INPUT', payload: input}) );
  const changeInput   = (input, wording) => ( dispatch({ type: 'CHANGE_INPUT', payload: {input:{input}, wording:{wording}}}) );

  const w = new WordParser();
  const l = new Lister(w, componentArguments, grammars );

  const jsonEmbed = (input) => {
    let id = input.id;
    let [calculation, calculationString] = input.inputText.split('|');
    let jsonCalc = { calculationOrder : {id},
                      calculation: {calculation},
                      calculationString: {calculationString}
    };
    return jsonCalc;
  }

  const copyAllActive = () => {
    let jsonCalcString = inputs.filter(i => (i.isActive === true))
          .map(i => {jsonEmbed(i)}).join(",");
        navigator.clipboard.writeText(jsonCalcString);
    };

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
              <ScrollBox inputs={inputs_state} changeInput={changeInput} handleClick={handleClick} lister={l} />
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
