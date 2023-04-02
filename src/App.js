import "./styles.css";
import ScrollBox from "./components/ScrollBox";
import {Row, Col, Container} from 'react-bootstrap';
import BtsNavbar from './components/BtsNavbar';
import { useState, React } from "react";
import Button from "./components/Button";
import TextArea from "./components/TextArea";
import RunCard from "./components/RunCard";

// autocomplete and translation helpers
import  {WordParser,Lister} from './utils/CalcAutocompletion.js';
import './utils/Globals.js';


export default function App() {

  const intialInputs = [{ id: 1, inputText: "", isActive:false }];

  const [inputs, setInputs] = useState(intialInputs);
  const [id, setId] = useState(3);
  const RunInformationData = {"Manager":"GSAM", "Product": "Equity Global", "AsAtDate":"2015-01-01"};

  const w = new WordParser();
  const l = new Lister(w, componentArguments, grammars );

  const changeInput = (input, text) => {
    console.log(text);
    const newInputs = [...inputs];
    const i = newInputs.findIndex((a) => a.id === input.id);
    newInputs[i].inputText = text; // todo = here -> should use the autocomplete / translation object to determine new text (enter, dot, bracket)
    Object.freeze(newInputs);
    setInputs(newInputs);
  };

  const addInput = () => {
    console.log(inputs);

    setId(id + 1);
    const newInput = { id: id, inputText: "", isActive:false };
    const newInputs = [...inputs];
    newInputs.push(newInput);
    Object.freeze(newInputs);
    setInputs(newInputs);
  };

  const removeInput = () => {
    console.log(inputs);
    if(inputs.length > 1)
    {
      setId(id - 1);
      const newInputs = inputs.slice(0, inputs.length - 1);
      Object.freeze(newInputs);
      setInputs(newInputs);
    }
  };

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
    
    console.log(newInputs);

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
              <ScrollBox inputs={inputs} changeInput={changeInput} handleClick={handleClick} lister={l} />
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
