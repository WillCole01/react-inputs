import "./styles.css";
import InputList from "./components/InputList";
import {Row, Col, Container} from 'react-bootstrap';
import BtsNavbar from './components/BtsNavbar';
import { useState, React } from "react";
import Button from "./components/Button";
import TextArea from "./components/TextArea";

// autocomplete and translation helpers
import  add, {WordParser,Lister} from '../utils/CalcAutocompletion.js';
import '../utils/Globals.js';

export default function App() {
  const [inputs, setInputs] = useState([{ key: 1, inputText: "" }]);
  const [id, setId] = useState(2);
  const [activeInput, setActiveInput] = useState(inputs[0]);

  // autocomplete and translations helper classes
  const w = new WordParser();
  const l = new Lister(w, componentArguments, grammars );
  const [avtiveInputList, setActiveInputList] = useState(l.getInitialList()); // we're only interested in the active input at any one time -> just one state var!

  // INPUTS properties => change / activate 
  const changeActive = (input) =>
  {
    const i = inputs.findIndex(x => x.key === input);
    setActiveInput(inputs[i]);
  };

  const changeInput = (input, text) => {
    const newInputs = [...inputs];
    const i = newInputs.findIndex((a) => a.key === input.key);
    newInputs[i].inputText = text; // todo = here -> should use the autocomplete / translation object to determine new text (enter, dot, bracket)
    Object.freeze(newInputs);
    setInputs(newInputs);
  };


  // Inputs => add / remove
  const addInput = () => {
    setId(id + 1);
    const newInput = { key: id, inputText: "" };
    const newInputs = [...inputs];
    newInputs.push(newInput);
    Object.freeze(newInputs);
    setInputs(newInputs);
  };

  const removeInput = () => {
    if(inputs.length > 1)
    {
      setId(id - 1);
      const newInputs = inputs.slice(0, inputs.length - 1);
      Object.freeze(newInputs);
      setInputs(newInputs);
    }
  };

  return (
    <div className="App">
    <Container>
    <Row>
      <BtsNavbar /> 
    </Row>
    <Col md={12}>
      <Row className="fluid full" >
        <Col md={9}>
          <InputList
              inputs={inputs}
              changeInput={changeInput}
              handleActive={changeActive}
            />
            <>
              <section className="Buttons">
                <Button buttonText="Add Calc" InputAction={addInput} />
                <Button buttonText="Remove Calc" InputAction={removeInput} />
              </section>
            </>
          </Col>
          <Col md={3}>
              <TextArea className="fluid full" activeInput={activeInput}/>
          </Col>
      </Row>
     </Col>
    </Container>
    </div>
  );
}
